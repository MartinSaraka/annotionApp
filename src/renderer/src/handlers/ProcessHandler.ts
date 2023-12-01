import { AnnotoriousHandler, AnnotationHandler } from '@renderer/handlers'
import {
  useAnnotoriousStore,
  useImageStore,
  useSegmentStore
} from '@renderer/store'

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
      case ProcessType.SAM_EMBEDDINGS:
        return ProcessHandler.#handleSAM(
          data as TProcessTypeMap[ProcessType.SAM_EMBEDDINGS]['response'],
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
      case InstantType.SAM:
        return ProcessHandler.#handleSegment(
          data as TInstantTypeMap[InstantType.SAM]['response'],
          annotation
        )
      default:
        throw new Error('Instant type not found')
    }
  }

  static #handleSegment = async (
    data: TInstantTypeMap[InstantType.SAM]['response'],
    annotation: TAnnotation
  ) => {
    const anno = useAnnotoriousStore.getState().anno
    const preview = useAnnotoriousStore.getState().preview
    if (!anno || !preview) throw new Error('Annotorious not available')

    const embedding = useSegmentStore.getState().getEmbedding(annotation.id)
    if (!embedding) throw new Error('Embedding not found')

    for (const preview of embedding.previews) {
      anno.removeAnnotation(preview.id)
    }

    embedding.previews = []

    const objects = data.segmented_objects

    for (const points of objects) {
      const newAnnotation = AnnotationUtils.createAnnotation(points, [
        AnnotationUtils.createBody('TextualBody', 'status', 'generated'),
        AnnotationUtils.createBody('TextualBody', 'parent', annotation.id),
        AnnotationUtils.createBody('TextualBody', 'tagging', 'preview')
      ])

      anno.addAnnotation(newAnnotation)
      embedding.previews.push(newAnnotation)
      anno.addAnnotation(newAnnotation)
    }

    embedding.prevTaskId = data.previous_predict_task_id

    useSegmentStore.getState().updateEmbedding(annotation.id, embedding)
  }

  static #handleSAM = async (
    data: TProcessTypeMap[ProcessType.SAM_EMBEDDINGS]['response'],
    process: TProcess
  ) => {
    const anno = useAnnotoriousStore.getState().anno
    const preview = useAnnotoriousStore.getState().preview
    if (!anno || !preview) throw new Error('Annotorious not available')

    const annotationId = process.annotationId
    const annotation = useImageStore.getState().getAnnotation(annotationId)
    if (!annotation) throw new Error('Annotation not found')

    useSegmentStore.getState().addEmbedding(annotation.id, data.task_id)
  }

  static #handleNC = async (
    data: TInstantTypeMap[InstantType.NUCLICK]['response'],
    annotation: TAnnotation
  ) => {
    const anno = useAnnotoriousStore.getState().anno
    const preview = useAnnotoriousStore.getState().preview
    if (!anno || !preview) throw new Error('Annotorious not available')

    const points = data.segmented_nuclei[0]

    const activeClass = useImageStore.getState().getActiveClass()

    let newAnnotation = AnnotationUtils.createAnnotation(points, [
      AnnotationUtils.createBody('TextualBody', 'status', 'generated'),
      ...(activeClass
        ? [AnnotationUtils.createBody('TextualBody', 'tagging', activeClass.id)]
        : [])
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
