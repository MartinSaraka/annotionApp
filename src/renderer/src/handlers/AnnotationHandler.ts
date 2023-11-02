import { AnnotationUtils } from '@common/utils'

import {
  TAnnotation,
  TAnnotationBody,
  TAnnotationPurpose
} from '@common/types/annotation'

class AnnotationHandler {
  private constructor() {
    throw new Error('`AnnotationHandler` should not be instantiated')
  }

  static getBody = <TKeys extends TAnnotationPurpose>(
    annotation: TAnnotation | null,
    purposes: TKeys[]
  ) => {
    const result = {} as Record<TKeys, string>
    const purposesSet = new Set<TAnnotationPurpose>(purposes)

    for (const item of annotation?.body || []) {
      if (!item.purpose || !purposesSet.has(item.purpose)) continue
      result[item.purpose] = item.value
    }

    return result
  }

  static upsertBody = <TValue>(
    annotation: TAnnotation,
    type: TAnnotationBody['type'] | undefined,
    purpose: NonNullable<TAnnotationBody['purpose']>,
    value: TValue
  ) => {
    const toUpdate = annotation.body.findIndex(
      (item) => item.purpose === purpose
    )

    const newItem = AnnotationUtils.createBody(type, purpose, value)

    // update
    if (toUpdate !== -1) {
      annotation.body[toUpdate] = newItem
    }

    // insert
    if (toUpdate === -1) {
      annotation.body.push(newItem)
    }

    return annotation
  }

  static setEditability = (annotation: TAnnotation, value: boolean) =>
    AnnotationHandler.upsertBody(
      annotation,
      'TextualBody',
      'editability',
      value ? 'editable' : 'locked'
    )

  static setVisibility = (annotation: TAnnotation, value: boolean) =>
    AnnotationHandler.upsertBody(
      annotation,
      'TextualBody',
      'visibility',
      value ? 'visible' : 'hidden'
    )

  static formatDefault = (annotation: TAnnotation, index = 0) => {
    annotation.body.push({
      type: 'TextualBody',
      purpose: 'naming',
      value: `Annotation ${index}`
    })

    return annotation
  }
}

export default AnnotationHandler
