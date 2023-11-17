/**
 * @module common/types/annotation
 * @description Annotorious supports a subset of the W3C Web Annotation model,
 * an open standard for interoperable annotations.
 *
 * @bullet Only a single target shape per annotation is supported.
 * @bullet FragmentSelectors of type Media Fragment are supported for rectangle shapes,
 *         with both pixel- and percent-encoded coordinates.
 * @bullet SVG Selectors are supported for polygon shapes.
 * @bullet Annotation TextualBody types with a purpose of commenting,
 *         replying or no purpose are displayed as comments.
 * @bullet Annotation bodies with a purpose of tagging are displayed as tags.
 * @bullet Bodies of any other type are ignored, unless you implement your own editor extension.
 */

/**
 * Web Annotation Data Model
 * @see https://www.w3.org/TR/annotation-model/
 */
export type TAnnotation = {
  '@context': string
  id: TID
  type: string
  body: TAnnotationBody[]
  target: TAnnotationTarget
  motivation?: string
}

export type TAnnotationBody = {
  type: string
  purpose?: TAnnotationPurpose
  value: string
}

export type TAnnotationTarget = {
  state?: string
  selector: TAnnotationSelector
  renderedVia?: TAnnotationRenderedVia
}

export type TAnnotationRenderedVia = {
  name: 'point'
}

/**
 * Media fragments URI 1.0
 * @see https://www.w3.org/TR/media-frags/
 */
export type TAnnotationSelector =
  | TAnnotationFragmentSelector
  | TAnnotationSVGSelector
//| TAnnotationSVGSelector[]

export type TAnnotationFragmentSelector = {
  type: 'FragmentSelector'
  conformsTo: string
  value: string
}

export type TAnnotationSVGSelector = {
  type: 'SvgSelector'
  value: string
}

export type TAnnotationClass = {
  id: TID
  name: string
  color: string
}

export type TAnnotationPurpose =
  | 'tagging'
  | 'naming'
  | 'describing'
  | 'editability'
  | 'visibility'
  | 'status'
  | 'parent'
  | 'subtagging'

export type TAnnotationIntersection = { underlying: TAnnotation }
