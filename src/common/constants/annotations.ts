import { KeyboardEvent } from 'react'

import { ETool } from '@common/constants/tools'

export const ANNOTORIOUS_HOTKEY: KeyboardEvent['code'] = 'Shift'

export const ANNOTORIOUS_DEFAULT_CONFIG = {
  disableEditor: true,
  drawOnSingleClick: true,

  hotkey: {
    key: ANNOTORIOUS_HOTKEY,
    inverted: true
  }
} as const

export const ANNOTORIOUS_PREVIEW_CONFIG = {
  disableEditor: true,
  disableSelect: true,
  readOnly: true
} as const

export const ANNOTATION_TYPE_TAG_MAP = {
  [ETool.POINT]: 'circle',
  [ETool.RECTANGLE]: 'rect',
  [ETool.CIRCLE]: 'circle',
  [ETool.ELLIPSE]: 'ellipse',
  [ETool.POLYGON]: 'polygon',
  [ETool.FREEHAND]: 'path',
  unknown: 'unknown'
} as const

export const ANNOTATION_TAG_PROPS_MAP = {
  rect: ['x', 'y', 'width', 'height'],
  circle: ['cx', 'cy', 'r'],
  ellipse: ['cx', 'cy', 'rx', 'ry'],
  polygon: ['points'],
  path: ['d'],
  unknown: []
} as const
