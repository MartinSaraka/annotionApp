import { TAnnotation } from '@common/types/annotation'

class AnnotoriousHandler {
  private constructor() {
    throw new Error('`AnnotoriousHandler` should not be instantiated')
  }

  static instance = (anno: TAnno | null) => ({
    showPreview: (annotation: TAnnotation) =>
      AnnotoriousHandler.showPreview(anno, annotation),
    zoomToAnnotation: (annotation: TAnnotation) =>
      AnnotoriousHandler.zoomToAnnotation(anno, annotation),
    zoomToParent: (parentId: TAnnotation['id']) =>
      AnnotoriousHandler.zoomToParent(anno, parentId),
    highlightAnnotation: (annotation: TAnnotation, state: 'on' | 'off') =>
      AnnotoriousHandler.highlightAnnotation(anno, annotation, state)
  })

  private static showPreview = (
    anno: TAnno | null,
    annotation: TAnnotation
  ) => {
    if (!anno) return

    anno.clearAnnotations()
    anno.addAnnotation(annotation)
    anno.fitBoundsWithConstraints(annotation, true)
    anno._app.current.__v.props.viewer.viewport.zoomBy(0.8, null, true)
  }

  private static zoomToAnnotation = (
    anno: TAnno | null,
    annotation: TAnnotation
  ) => {
    if (!anno) return

    anno.cancelSelected()
    anno.selectAnnotation(annotation)
    anno.fitBoundsWithConstraints(annotation)
  }

  private static zoomToParent = (
    anno: TAnno | null,
    parentId: TAnnotation['id']
  ) => {
    if (!anno) return

    anno.fitBoundsWithConstraints(parentId)
  }

  private static highlightAnnotation = (
    anno: TAnno | null,
    annotation: TAnnotation,
    state: 'on' | 'off' = 'on'
  ) => {
    if (!anno?._element) return

    const element = anno._element.querySelector(
      `.a9s-annotation[data-id="${annotation.id}"]`
    )

    if (!element) return

    if (state === 'on') element.classList.add('highlight')
    else element.classList.remove('highlight')
  }

  static highlightNode = (
    annotation: TAnnotation,
    state: 'on' | 'off' = 'on'
  ) => {
    const element = document.querySelector(
      `div[data-node-id="${annotation.id}"]`
    )

    if (!element) return

    element.setAttribute('data-highlighted', state)
  }
}

export default AnnotoriousHandler
