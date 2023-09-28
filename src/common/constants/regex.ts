import { ETool } from '@common/constants/tools'

export const POINT_REGEX = /(?=xywh=pixel:(.*),(.*),(.*),(.*))/

export const RECTANGLE_REGEX = /(?=xywh=pixel:(.*),(.*),(.*),(.*))/

export const CIRCLE_REGEX = /(?=cx="(.*)" cy="(.*)" r="(.*)")/

export const ELLIPSE_REGEX = /(?=cx="(.*)" cy="(.*)" rx="(.*)" ry="(.*)")/

export const POLYGON_REGEX = /(?=points="(.*)")/

export const FREEHAND_REGEX = /(?=d="(.*)")/

export const ANNOTATION_TYPE_REGEX = {
  [ETool.POINT]: POINT_REGEX,
  [ETool.RECTANGLE]: RECTANGLE_REGEX,
  [ETool.CIRCLE]: CIRCLE_REGEX,
  [ETool.ELLIPSE]: ELLIPSE_REGEX,
  [ETool.POLYGON]: POLYGON_REGEX,
  [ETool.FREEHAND]: FREEHAND_REGEX,
  unknown: /.*/
} as const
