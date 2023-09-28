import { ETool } from '@common/constants/tools'

export default {
  type: {
    [ETool.POINT]: 'bod',
    [ETool.RECTANGLE]: 'obdĺžnik',
    [ETool.CIRCLE]: 'kruh',
    [ETool.ELLIPSE]: 'elipsa',
    [ETool.POLYGON]: 'mnohouholník',
    [ETool.FREEHAND]: 'voľná ruka',
    unknown: 'neznámy'
  }
} as const
