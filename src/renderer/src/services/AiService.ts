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

  static MitoticCount = async (annotation: TAnnotation) => {
    const imageData = useImageStore.getState().getData()
    if (!imageData) throw new Error('Image data is not available')

    const { props } = AnnotationUtils.from(annotation).shape

    const annotationX = toInteger(props['x'])
    const annotationY = toInteger(props['y'])
    const annotationWidth = toInteger(props['width'])
    const annotationHeight = toInteger(props['height'])

    console.log(annotationX, annotationY, annotationWidth, annotationHeight)

    // TODO: check
    const areaWidth = AiService.#DEFAULT_MITOTIC_COUNT_SETTINGS.cropSize.width
    const areaHeight = AiService.#DEFAULT_MITOTIC_COUNT_SETTINGS.cropSize.height

    const cropImagePath = OSDAdapter.fromInfoToCroppedSource(
      imageData,
      toInteger(annotationX + annotationWidth / 2),
      toInteger(annotationY + annotationHeight / 2),
      annotationWidth,
      annotationHeight
    )

    const croppedImage = await ImageService.getCroppedImage(cropImagePath)
    if (!croppedImage) throw new Error('Cropped image is not available')

    console.log(croppedImage.x, croppedImage.y)

    const serverPath = AiService.#DEFAULT_MITOTIC_COUNT_SETTINGS.uri
    const variables: TMitoticCountBody = {
      image: croppedImage.base64Image,
      offset: {
        x: croppedImage.x,
        y: croppedImage.y
      }
    }

    const response = await fetch(serverPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify(variables)
    })
    if (!response.ok) throw new Error('MitoticCount failed')

    const data: TMitoticCountResponse = await response.json()

    console.log(data)

    const newAnnotations = data.mitosis.map((item) =>
      AnnotationUtils.createRectAnnotation(item.bbox, [
        AnnotationUtils.createBody('TextualBody', 'tagging', item.label),
        AnnotationUtils.createBody('TextualBody', 'describing', item.confidence)
      ])
    )

    newAnnotations.push(
      AnnotationUtils.createRectAnnotation({
        x: annotationX,
        y: annotationY,
        width: annotationWidth,
        height: annotationHeight
      })
    )

    return newAnnotations
  }
}

export default AiService
