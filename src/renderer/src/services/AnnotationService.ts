import { TAnnotation, TAnnotationBody } from '@common/types/annotation'

/**
 * @deprecated
 */
class AnnotationService {
  static annotation = (annotation: TAnnotation) => {
    return {
      get: () => annotation,
      upsertBody: (body: TAnnotationBody) =>
        AnnotationService.upsertBody(annotation, body)
    }
  }

  static getBody = <Keys extends readonly string[]>(
    annotation: TAnnotation | null,
    purposes: Keys
  ): Record<Keys[number], unknown> => {
    const result = {} as Record<Keys[number], unknown>

    for (const item of annotation?.body || []) {
      if (!item.purpose || !purposes.includes(item.purpose)) continue
      result[item.purpose] = item.value
    }

    return result
  }

  static formatDefault = (annotation: TAnnotation, index = 0) => {
    annotation.body.push({
      type: 'TextualBody',
      purpose: 'naming',
      value: `Annotation ${index}`
    })

    return annotation
  }

  static upsertBody = (annotation: TAnnotation, body: TAnnotationBody) => {
    const toUpdate = annotation.body.findIndex(
      (item) => item.purpose === body.purpose
    )

    // update
    if (toUpdate !== -1) {
      annotation.body[toUpdate] = body
    }

    // insert
    if (toUpdate === -1) {
      annotation.body.push(body)
    }

    return AnnotationService.annotation(annotation)
  }
}

export default AnnotationService
