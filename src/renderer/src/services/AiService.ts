import { join } from 'path'
import { toInteger } from 'lodash'

import { useImageStore } from '@renderer/store'
import { AnnotationUtils } from '@common/utils'
import { OSDAdapter } from '@renderer/adapters'

import {
  TMitoticCountBody,
  TMitoticCountResponse,
  TNuClickBody,
  TNuClickResponse
} from '@common/types/aiService'
import { TAnnotation } from '@common/types/annotation'

import ImageService from './ImageService'
import {
  TProcess,
  TProcessResponse,
  TProcessStatus
} from '@common/types/process'

class AiService {
  static readonly #AI_URI = import.meta.env.RENDERER_VITE_AI_URI

  static readonly #DEFAULT_NUCLICK_SETTINGS = {
    uri: join(AiService.#AI_URI, 'models/nuclick/predict'),
    cropSize: {
      width: 128,
      height: 128
    }
  }

  static readonly #DEFAULT_MITOTIC_COUNT_SETTINGS = {
    uri: join(AiService.#AI_URI, 'models/mc/predict'),
    result: (id: string) =>
      join(AiService.#AI_URI, `models/mc/result?task_id=${id}`),
    cropSize: {
      width: 512,
      height: 512
    }
  }

  private constructor() {
    throw new Error('`AiService` should not be instantiated')
  }

  static NuClick = async (annotation: TAnnotation) => {
    const imageData = useImageStore.getState().getData()
    if (!imageData) throw new Error('Image data is not available')

    const { props } = AnnotationUtils.from(annotation).shape

    const annotationX = toInteger(props['cx'])
    const annotationY = toInteger(props['cy'])

    const areaWidth = AiService.#DEFAULT_NUCLICK_SETTINGS.cropSize.width
    const areaHeight = AiService.#DEFAULT_NUCLICK_SETTINGS.cropSize.height

    const cropImagePath = OSDAdapter.fromInfoToCroppedSource(
      imageData,
      annotationX,
      annotationY,
      areaWidth,
      areaHeight
    )

    const croppedImage = await ImageService.getCroppedImage(cropImagePath)
    if (!croppedImage) throw new Error('Cropped image is not available')

    const serverPath = AiService.#DEFAULT_NUCLICK_SETTINGS.uri
    const variables: TNuClickBody = {
      image: croppedImage.base64Image,
      keypoints: [
        {
          x: annotationX - croppedImage.x,
          y: annotationY - croppedImage.y
        }
      ],
      offset: {
        x: croppedImage.x,
        y: croppedImage.y
      }
    }

    const response = await fetch(serverPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(variables)
    })
    if (!response.ok) throw new Error('NuClick failed')

    const data: TNuClickResponse = await response.json()

    const points = data.segmented_nuclei[0]

    const newAnnotation = AnnotationUtils.createAnnotation(points)

    return newAnnotation
  }

  static #getData = (annotationId: TID) => {
    const imageData = useImageStore.getState().getSelected()
    if (!imageData) throw new Error('Failed to get image data')

    const annotation = imageData.annotations?.[annotationId]
    if (!annotation) throw new Error('Could not find annotation')

    const { props } = AnnotationUtils.from(annotation).shape

    return { imageData, props }
  }

  static MitoticCount = async (
    annotationId: TID,
    setStatus: (status: TProcessStatus) => void
  ) => {
    setStatus({
      type: 'PENDING',
      message: 'Collecting data'
    })

    const { imageData, props } = AiService.#getData(annotationId)

    const annotationX = toInteger(props['x'])
    const annotationY = toInteger(props['y'])
    const annotationWidth = toInteger(props['width'])
    const annotationHeight = toInteger(props['height'])

    setStatus({
      type: 'PENDING',
      message: 'Cropping image'
    })

    const cropImagePath = OSDAdapter.fromInfoToCroppedSource(
      imageData.image,
      annotationX,
      annotationY,
      annotationWidth,
      annotationHeight,
      'top-left'
    )

    const croppedImage = await ImageService.getCroppedImage(cropImagePath)
    if (!croppedImage) throw new Error('Failed to crop image')

    setStatus({
      type: 'PENDING',
      message: 'Processing image'
    })

    const serverPath = AiService.#DEFAULT_MITOTIC_COUNT_SETTINGS.uri
    const variables: TMitoticCountBody = {
      image: croppedImage.base64Image,
      offset: {
        x: croppedImage.x,
        y: croppedImage.y
      }
    }

    setStatus({
      type: 'PENDING',
      message: 'Sending to AI'
    })

    const response = await fetch(serverPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify(variables)
    })
    if (!response || !response.ok) throw new Error('Failed to reach AI server')

    setStatus({
      type: 'PENDING',
      message: 'Analyzing response from AI'
    })

    const data: TProcessResponse = await response.json()
    if (data.status === 'FAILURE') throw new Error('AI failed to process image')

    return data.task_id
  }

  static ResultStatus = async (
    process: TProcess,
    setStatus: (status: TProcessStatus) => void
  ) => {
    if (!process.taskId) throw new Error('Task ID not available')

    setStatus({
      type: 'PENDING',
      message: 'Waiting for AI'
    })

    const serverPath = AiService.#DEFAULT_MITOTIC_COUNT_SETTINGS.result(
      process.taskId
    )

    setStatus({
      type: 'PENDING',
      message: 'Asking AI for result'
    })

    const response = await fetch(serverPath, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })

    if (!response || !response.ok) throw new Error('Failed to reach AI server')

    if (response.status === 202) {
      const data: TProcessResponse = await response.json()
      if (data.status === 'FAILURE')
        throw new Error('AI failed to process image')

      setStatus({
        type: data.status,
        message: 'Waiting for AI'
      })

      return null
    } else if (response.status === 200) {
      const data: TMitoticCountResponse = await response.json()
      if (!data.mitosis) throw new Error('AI failed to process image')

      setStatus({
        type: 'SUCCESS',
        message: 'AI finished processing image'
      })

      return data
    }

    throw new Error('AI failed to process image')
  }
}

export default AiService
