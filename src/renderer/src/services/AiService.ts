import { toInteger } from 'lodash'

import { useImageStore } from '@renderer/store'
import { AnnotationUtils } from '@common/utils'
import { OSDAdapter } from '@renderer/adapters'

import { BBoxOrigin } from '@common/types/aiService'
import { TAnnotation } from '@common/types/annotation'

import ImageService from './ImageService'
import {
  InstantType,
  ProcessType,
  TInstantTypeMap,
  TProcess,
  TProcessResponse,
  TProcessStatus,
  TProcessTypeMap
} from '@common/types/process'
import { INSTANT_SETTINGS, PROCESS_SETTINGS } from '@common/constants/processes'

class AiService {
  private constructor() {
    throw new Error('`AiService` should not be instantiated')
  }

  /**
   * Generic predict instant
   *
   * @param instantType Type of instant to run
   * @param annotation Annotation to process
   * @returns Response of the instant
   */
  static instant = async (
    instantType: InstantType,
    annotation: TAnnotation
  ) => {
    const settings = INSTANT_SETTINGS[instantType]

    const imageData = useImageStore.getState().getData()
    if (!imageData) throw new Error('Image data is not available')

    const { props } = AnnotationUtils.from(annotation).shape

    const annotationX = toInteger(props['cx'])
    const annotationY = toInteger(props['cy'])

    const minCropSize = settings.minSize
    const cropImagePath = OSDAdapter.fromInfoToCroppedSource(
      imageData,
      annotationX,
      annotationY,
      minCropSize.width,
      minCropSize.height
    )

    const croppedImage = await ImageService.getCroppedImage(cropImagePath)
    if (!croppedImage) throw new Error('Failed to crop image')

    const variables = {
      [InstantType.NUCLICK]: {
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
      } as TInstantTypeMap[InstantType.NUCLICK]['body']
    }[instantType]

    const response = await fetch(settings.predictURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify(variables)
    })

    if (!response || !response.ok) throw new Error('Failed to reach AI server')

    const data: TInstantTypeMap[keyof TInstantTypeMap]['response'] =
      await response.json()
    if (!data) throw new Error('AI failed to process image')

    return data
  }

  static #getData = (annotationId: TID) => {
    const imageData = useImageStore.getState().getSelected()
    if (!imageData) throw new Error('Failed to get image data')

    const annotation = imageData.annotations?.[annotationId]
    if (!annotation) throw new Error('Could not find annotation')

    const bbox = AnnotationUtils.from(annotation).bbox
    if (!bbox) throw new Error('Could not create bbox')

    return { imageData, bbox }
  }

  /**
   * Generic predict process
   *
   * @param processType Type of process to run
   * @param annotationId ID of the annotation to process
   * @param setStatus Function to set the status of the process
   * @returns Task ID of the process
   */
  static predict = async (
    processType: ProcessType,
    annotationId: TID,
    setStatus: (status: TProcessStatus) => void
  ): Promise<TID> => {
    const settings = PROCESS_SETTINGS[processType]

    setStatus({
      type: 'PENDING',
      message: 'Collecting data'
    })

    const { imageData, bbox } = AiService.#getData(annotationId)

    setStatus({
      type: 'PENDING',
      message: 'Cropping image'
    })

    const minCropSize = settings.minSize
    const cropImagePath = OSDAdapter.fromInfoToCroppedSource(
      imageData.image,
      settings.origin === BBoxOrigin.CENTER_CENTER
        ? toInteger(bbox.x + bbox.width / 2)
        : bbox.x,
      settings.origin === BBoxOrigin.CENTER_CENTER
        ? toInteger(bbox.y + bbox.height / 2)
        : bbox.y,
      Math.max(bbox.width, minCropSize.width),
      Math.max(bbox.height, minCropSize.height),
      settings.origin,
      settings.magnification
    )

    const croppedImage = await ImageService.getCroppedImage(cropImagePath)
    if (!croppedImage) throw new Error('Failed to crop image')

    setStatus({
      type: 'PENDING',
      message: 'Processing image'
    })

    const variables = {
      [ProcessType.MITOSIS_DETECTION]: {
        image: croppedImage.base64Image,
        offset: {
          x: croppedImage.x,
          y: croppedImage.y
        }
      } as TProcessTypeMap[ProcessType.MITOSIS_DETECTION]['body'],

      [ProcessType.NUCLEAR_PLEOMORPHISM]: {
        image: croppedImage.base64Image
      } as TProcessTypeMap[ProcessType.NUCLEAR_PLEOMORPHISM]['body'],

      [ProcessType.NUCLICK_BBOX_DENSE]: {
        image: croppedImage.base64Image,
        offset: {
          x: croppedImage.x,
          y: croppedImage.y
        },
        bboxes: [
          {
            x: 0,
            y: 0,
            width: croppedImage.width,
            height: croppedImage.height
          }
        ]
      } as TProcessTypeMap[ProcessType.NUCLICK_BBOX_DENSE]['body']
    }[processType]

    setStatus({
      type: 'PENDING',
      message: 'Sending to AI'
    })

    const response = await fetch(settings.predictURL, {
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

  /**
   * Generic result process
   *
   * @param process Process to get the result of
   * @param setStatus Function to set the status of the process
   * @returns Result of the process or null if the process is still running
   */
  static result = async (
    process: TProcess,
    setStatus: (status: TProcessStatus) => void
  ): Promise<TProcessTypeMap[TProcess['type']]['response'] | null> => {
    if (!process.taskId) throw new Error('Task ID not available')

    const settings = PROCESS_SETTINGS[process.type]

    setStatus({
      type: 'PENDING',
      message: 'Checking status of AI'
    })

    const resultURL = settings.resultURL(process.taskId)

    setStatus({
      type: 'PENDING',
      message: 'Asking AI for result'
    })

    console.log(resultURL)
    const response = await fetch(resultURL, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })

    if (!response || !response.ok) throw new Error('Failed to reach AI server')

    if (response.status === 202) {
      const data: TProcessResponse = await response.json()

      setStatus({
        type: data.status,
        message: 'Waiting for AI'
      })

      if (data.status === 'FAILURE')
        throw new Error('AI failed to process image')

      return null
    } else if (response.status === 200) {
      const data = await response.json()
      if (!data) throw new Error('AI failed to process image')

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
