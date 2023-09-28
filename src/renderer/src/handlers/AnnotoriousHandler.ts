import { TAnnotation } from '@common/types/annotation'

class AnnotoriousHandler {
  private constructor() {
    throw new Error('AnnotationHandler should not be instantiated')
  }

  static instance = (anno: TAnno | null) => ({
    showPreview: (annotation: TAnnotation) =>
      AnnotoriousHandler.showPreview(anno, annotation)
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
}

export default AnnotoriousHandler
