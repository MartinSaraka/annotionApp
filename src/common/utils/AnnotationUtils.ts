import { v4 as uuid } from 'uuid'
import { toInteger } from 'lodash'

import { TAnnotation, TAnnotationBody } from '@common/types/annotation'
import { arrayToObject } from '@common/utils/global'
import { ETool } from '@common/constants/tools'
import { TBoundingBox } from '@common/types/global'

import { TOOL_ICON_MAP } from '@common/constants/tools'
import { ANNOTATION_TYPE_REGEX } from '@common/constants/regex'
import { DEFAULT_ANNOTATION_BODY_ITEM } from '@common/constants/annotation'
import {
  ANNOTATION_TAG_PROPS_MAP,
  ANNOTATION_TYPE_TAG_MAP
} from '@common/constants/annotations'

// POINT: xywh=pixel:44094.2578125,54109.70703125,0,0 // CIRCLE
// NUCLICK: xywh=pixel:44094.2578125,54109.70703125,0,0 // CIRCLE
// RECTANGLE: xywh=pixel:48276.42578125,60762.24609375,0,0 // RECT x, y, width, height
// CIRCLE: <svg><circle cx="81521.2890625" cy="52408.9296875" r="2942.51953125"></circle></svg>
// ELLIPSE: <svg><ellipse cx="81521.2890625" cy="52408.9296875" rx="7386.9921875" ry="2942.51953125"></ellipse></svg>
// POLYGON: <svg><polygon points="39444.14453125,63968.64453125 36932.32421875,80792.265625 40961.3046875,77569.078125 49690.765625,89118.8203125 40961.3046875,73808.6953125"></polygon></svg>
// FREEHAND: <svg><path d="M19512.228515625 61865.49609375 L19512.228515625 61851.33203125 L19505.408203125 61907.46484375 L19420.421875 62205.96484375 L19215.826171875 62724.80078125 L18932.5390625 63266.1953125 L18679.677734375 63683.2578125 L18517.048828125 64071.46484375 L18386.42187"></path></svg>

class AnnotationUtils {
  private constructor() {
    throw new Error('`AnnotationUtils` class cannot be instantiated')
  }

  static from = (annotation: TAnnotation) => ({
    get type() {
      return AnnotationUtils.getType(annotation)
    },
    get icon() {
      return AnnotationUtils.getIcon(annotation)
    },
    get shape() {
      return AnnotationUtils.getShape(annotation)
    },
    get bbox() {
      return AnnotationUtils.getBbox(annotation)
    }
  })

  static getType = (annotation: TAnnotation) => {
    const value = annotation.target.selector.value
    const renderedVia = annotation.target.renderedVia?.name

    if (value.includes('xywh') && renderedVia === 'point') return ETool.POINT
    if (value.includes('xywh') && renderedVia === 'point')
      return ETool.NUCLICK_POINT
    if (value.includes('xywh')) return ETool.RECTANGLE
    if (value.includes('circle')) return ETool.CIRCLE
    if (value.includes('ellipse')) return ETool.ELLIPSE
    if (value.includes('polygon')) return ETool.POLYGON
    if (value.includes('path')) return ETool.FREEHAND

    return 'unknown'
  }

  static getIcon = (annotation: TAnnotation) => {
    const type = AnnotationUtils.getType(annotation)

    const icons: Record<typeof type, string> = {
      ...TOOL_ICON_MAP,
      unknown: 'QuestionMarkIcon'
    }

    return icons[type]
  }

  static getShape = (annotation: TAnnotation) => {
    const type = AnnotationUtils.getType(annotation)
    const value = annotation.target.selector.value

    const tag = ANNOTATION_TYPE_TAG_MAP[type]
    const regex = ANNOTATION_TYPE_REGEX[type]

    const matches = value.match(regex)
    if (!matches) return { tag: 'unknown', props: {} }

    const keys = ANNOTATION_TAG_PROPS_MAP[tag]
    const props = arrayToObject(matches, keys)

    if (type === ETool.POINT) props.r = 1

    return { tag, props }
  }

  static getBbox = (annotation: TAnnotation): TBoundingBox | null => {
    const type = AnnotationUtils.getType(annotation)
    if (type === 'unknown') return null

    const shape = AnnotationUtils.getShape(annotation)
    if (!shape.props || shape.tag === 'unknown') return null

    switch (type) {
      case ETool.RECTANGLE:
        return {
          x: toInteger(shape.props['x']),
          y: toInteger(shape.props['y']),
          width: toInteger(shape.props['width']),
          height: toInteger(shape.props['height'])
        }
      case ETool.POINT:
        return {
          x: toInteger(shape.props['cx']),
          y: toInteger(shape.props['cy']),
          width: 0,
          height: 0
        }
      case ETool.CIRCLE: {
        const cx = toInteger(shape.props['cx'])
        const cy = toInteger(shape.props['cy'])
        const r = toInteger(shape.props['r'])

        return {
          x: cx - r,
          y: cy - r,
          width: 2 * r,
          height: 2 * r
        }
      }
      case ETool.ELLIPSE: {
        const cx = toInteger(shape.props['cx'])
        const cy = toInteger(shape.props['cy'])
        const rx = toInteger(shape.props['rx'])
        const ry = toInteger(shape.props['rx'])

        return {
          x: cx - rx,
          y: cy - ry,
          width: 2 * rx,
          height: 2 * ry
        }
      }
      case ETool.POLYGON: {
        const points = shape.props['points'].split(' ') as string[]

        let minX = Infinity
        let minY = Infinity
        let maxX = -Infinity
        let maxY = -Infinity

        for (let i = 0; i < points.length; i++) {
          const [currentX, currentY] = points[i].split(',').map(toInteger)

          minX = Math.min(minX, currentX)
          minY = Math.min(minY, currentY)
          maxX = Math.max(maxX, currentX)
          maxY = Math.max(maxY, currentY)
        }

        if (minX === Infinity || minY === Infinity) return null
        if (maxX === -Infinity || maxY === -Infinity) return null

        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        }
      }
    }

    return null
  }

  static createBody = <TValue>(
    type: TAnnotationBody['type'] = DEFAULT_ANNOTATION_BODY_ITEM['type'],
    purpose: NonNullable<TAnnotationBody['purpose']>,
    value: TValue
  ): TAnnotationBody => ({
    ...DEFAULT_ANNOTATION_BODY_ITEM,
    type,
    purpose,
    value: `${value}`
  })

  static createAnnotation = (
    points: { x: number; y: number }[],
    body: TAnnotationBody[] = []
  ): TAnnotation => {
    const pointsString = points
      .map((point) => `${point.x},${point.y}`)
      .join(' ')

    return {
      '@context': 'http://www.w3.org/ns/anno.jsonld',
      id: `#${uuid()}`,
      type: 'Annotation',
      motivation: 'generated',
      body: [
        {
          purpose: 'naming',
          type: 'TextualBody',
          value: 'Annotation 4'
        },
        ...body
      ],
      target: {
        selector: {
          type: 'SvgSelector',
          value: `<svg><polygon points="${pointsString}"></polygon></svg>`
        }
      }
    }
  }

  static createRectAnnotation = (
    values: TBoundingBox,
    body: TAnnotationBody[] = []
  ): TAnnotation => {
    return {
      '@context': 'http://www.w3.org/ns/anno.jsonld',
      id: `#${uuid()}`,
      type: 'Annotation',
      motivation: 'generated',
      body: [
        {
          purpose: 'naming',
          type: 'TextualBody',
          value: 'Annotation 4'
        },
        ...body
      ],
      target: {
        selector: {
          conformsTo: 'http://www.w3.org/TR/media-frags/',
          type: 'FragmentSelector',
          value: `xywh=pixel:${values.x},${values.y},${values.width},${values.height}`
        }
      }
    }
  }
}

export default AnnotationUtils
