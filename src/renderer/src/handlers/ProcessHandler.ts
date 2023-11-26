import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { AnnotoriousHandler, AnnotationHandler } from '@renderer/handlers'

import { TAnnotation, TAnnotationIntersection } from '@common/types/annotation'
import {
  InstantType,
  ProcessType,
  TProcess,
  TProcessTypeMap,
  TInstantTypeMap
} from '@common/types/process'

import { AnnotationUtils } from '@common/utils'
import { toPercent } from '@common/utils/numbers'

// TODO: when annotation is not on screen, another image

class ProcessHandler {
  private constructor() {
    throw new Error('`ProcessHandler` should not be instantiated')
  }

  static handle = (
    process: TProcess,
    data: TProcessTypeMap[keyof TProcessTypeMap]['response']
  ) => {
    switch (process.type) {
      case ProcessType.MITOSIS_DETECTION:
        return ProcessHandler.#handleMC(
          data as TProcessTypeMap[ProcessType.MITOSIS_DETECTION]['response'],
          process
        )
      case ProcessType.NUCLEAR_PLEOMORPHISM:
        return ProcessHandler.#handleNP(
          data as TProcessTypeMap[ProcessType.NUCLEAR_PLEOMORPHISM]['response'],
          process
        )
      case ProcessType.NUCLICK_BBOX_DENSE:
        return ProcessHandler.#handleNCBD(
          data as TProcessTypeMap[ProcessType.NUCLICK_BBOX_DENSE]['response'],
          process
        )
      default:
        throw new Error('Process type not found')
    }
  }

  static handleInstant = (
    type: InstantType,
    annotation: TAnnotation,
    data: TInstantTypeMap[keyof TInstantTypeMap]['response']
  ) => {
    switch (type) {
      case InstantType.NUCLICK:
        return ProcessHandler.#handleNC(
          data as TInstantTypeMap[InstantType.NUCLICK]['response'],
          annotation
        )
      default:
        throw new Error('Instant type not found')
    }
  }

  static #handleNC = async (
    data: TInstantTypeMap[InstantType.NUCLICK]['response'],
    annotation: TAnnotation
  ) => {
    const anno = useAnnotoriousStore.getState().anno
    const preview = useAnnotoriousStore.getState().preview
    if (!anno || !preview) throw new Error('Annotorious not available')

    const points = data.segmented_nuclei[0]

    let newAnnotation = AnnotationUtils.createAnnotation(points, [
      AnnotationUtils.createBody('TextualBody', 'status', 'generated')
    ])

    const intersections: TAnnotationIntersection[] =
      anno.getAnnotationsIntersecting(newAnnotation)

    if (intersections.length) {
      const parent = intersections[intersections.length - 1]

      newAnnotation = AnnotationHandler.upsertBody(
        newAnnotation,
        'TextualBody',
        'parent',
        parent.underlying.id
      )
    }

    anno.addAnnotation(newAnnotation)
    useImageStore.getState().saveAnnotation(newAnnotation)
    AnnotoriousHandler.instance(preview).showPreview(newAnnotation)

    anno.removeAnnotation(annotation.id)
    useImageStore.getState().removeAnnotation(annotation.id)
  }

  static #handleMC = async (
    data: TProcessTypeMap[ProcessType.MITOSIS_DETECTION]['response'],
    process: TProcess
  ) => {
    const anno = useAnnotoriousStore.getState().anno
    const preview = useAnnotoriousStore.getState().preview
    if (!anno || !preview) throw new Error('Annotorious not available')

    const annotationId = process.annotationId
    const annotation = useImageStore.getState().getAnnotation(annotationId)
    if (!annotation) throw new Error('Annotation not found')

    for (const item of data.mitosis) {
      const subtag = toPercent(item.confidence)

      const newAnnotation = AnnotationUtils.createRectAnnotation(item.bbox, [
        AnnotationUtils.createBody('TextualBody', 'tagging', item.label),
        AnnotationUtils.createBody('TextualBody', 'status', 'generated'),
        AnnotationUtils.createBody('TextualBody', 'parent', annotation.id),
        AnnotationUtils.createBody('TextualBody', 'subtagging', subtag)
      ])

      const intersections: TAnnotationIntersection[] =
        anno.getAnnotationsIntersecting(newAnnotation)
      if (!intersections.length) continue

      const isParent = intersections.find(
        ({ underlying }) => underlying.id === annotation.id
      )
      if (!isParent) continue

      anno.addAnnotation(newAnnotation)
      useImageStore.getState().saveAnnotation(newAnnotation, false)
    }

    const editedAnnotation = AnnotationHandler.setStatus(annotation, '')
    useImageStore.getState().saveAnnotation(editedAnnotation, false)
    await useAnnotoriousStore
      .getState()
      .saveAndUpdateAnnotation(editedAnnotation)

    useImageStore.getState().selectAnnotation(annotation.id)
    AnnotoriousHandler.instance(preview).showPreview(annotation)
  }

  static #handleNP = async (
    data: TProcessTypeMap[ProcessType.NUCLEAR_PLEOMORPHISM]['response'],
    process: TProcess
  ) => {
    const anno = useAnnotoriousStore.getState().anno
    const preview = useAnnotoriousStore.getState().preview
    if (!anno || !preview) throw new Error('Annotorious not available')

    const annotationId = process.annotationId
    const annotation = useImageStore.getState().getAnnotation(annotationId)
    if (!annotation) throw new Error('Annotation not found')

    const editedAnnotation = AnnotationHandler.setTagging(
      annotation,
      data.label
    )

    useImageStore.getState().saveAnnotation(editedAnnotation)

    await useAnnotoriousStore
      .getState()
      .saveAndUpdateAnnotation(editedAnnotation)

    useImageStore.getState().selectAnnotation(annotation.id)
    AnnotoriousHandler.instance(preview).showPreview(annotation)
  }

  static #handleNCBD = async (
    data: TProcessTypeMap[ProcessType.NUCLICK_BBOX_DENSE]['response'],
    process: TProcess
  ) => {
    const anno = useAnnotoriousStore.getState().anno
    const preview = useAnnotoriousStore.getState().preview
    if (!anno || !preview) throw new Error('Annotorious not available')

    const annotationId = process.annotationId
    const annotation = useImageStore.getState().getAnnotation(annotationId)
    if (!annotation) throw new Error('Annotation not found')

    const points = data.segmented_nuclei[0]

    const newAnnotation = AnnotationUtils.createAnnotation(points, [
      AnnotationUtils.createBody('TextualBody', 'status', 'generated'),
      AnnotationUtils.createBody('TextualBody', 'parent', annotation.id)
    ])

    anno.addAnnotation(newAnnotation)
    useImageStore.getState().saveAnnotation(newAnnotation, false)
  }
}

export default ProcessHandler
