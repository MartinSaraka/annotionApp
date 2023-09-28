import { ETool } from '@common/constants/tools'

export default {
  common: {},
  annotation: {
    type: {
      [ETool.POINT]: 'point',
      [ETool.RECTANGLE]: 'rectangle',
      [ETool.CIRCLE]: 'circle',
      [ETool.ELLIPSE]: 'ellipse',
      [ETool.POLYGON]: 'polygon',
      [ETool.FREEHAND]: 'freehand'
    }
  }
} as const
