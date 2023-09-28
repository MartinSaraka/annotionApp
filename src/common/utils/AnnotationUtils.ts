import * as RadixIcons from '@radix-ui/react-icons'

import { TAnnotation } from '@common/types/annotation'
import { arrayToObject } from '@common/utils/global'

import { ETool } from '@common/constants/tools'
import { ANNOTATION_TYPE_REGEX } from '@common/constants/regex'
import {
  ANNOTATION_TAG_PROPS_MAP,
  ANNOTATION_TYPE_TAG_MAP
} from '@common/constants/annotations'

// POINT: xywh=pixel:44094.2578125,54109.70703125,0,0 // CIRCLE
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
    }
  })

  static getType = (annotation: TAnnotation) => {
    const value = annotation.target.selector.value

    if (value.includes('xywh') && value.includes('0,0')) return ETool.POINT
    if (value.includes('xywh')) return ETool.RECTANGLE
    if (value.includes('circle')) return ETool.CIRCLE
    if (value.includes('ellipse')) return ETool.ELLIPSE
    if (value.includes('polygon')) return ETool.POLYGON
    if (value.includes('path')) return ETool.FREEHAND

    return 'unknown'
  }

  static getIcon = (annotation: TAnnotation) => {
    const type = AnnotationUtils.getType(annotation)

    const icons: Record<typeof type, keyof typeof RadixIcons> = {
      [ETool.POINT]: 'DotFilledIcon',
      [ETool.RECTANGLE]: 'SquareIcon',
      [ETool.CIRCLE]: 'CircleIcon',
      [ETool.ELLIPSE]: 'CircleBackslashIcon',
      [ETool.POLYGON]: 'ComponentInstanceIcon',
      [ETool.FREEHAND]: 'Pencil1Icon',
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
}

export default AnnotationUtils
