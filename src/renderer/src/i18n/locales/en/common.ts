import { ETool } from '@common/constants/tools'

export default {
  appName: {
    short: 'AnnotAid',
    long: 'Histopathology image annotation tool'
  },
  unit: {
    pixel: 'px',
    micro: 'μm'
  },
  position: {
    x: 'x',
    y: 'y'
  },
  tooltips: {
    fitToScreen: 'Fit to screen',
    tools: {
      annotation: 'Click to pick tool',
      [ETool.HAND]: 'Hand / Move',
      [ETool.ZOOM_IN]: 'Zoom in / out',
      [ETool.RECTANGLE]: 'Rectangle',
      [ETool.CIRCLE]: 'Circle',
      [ETool.ELLIPSE]: 'Ellipse',
      [ETool.POLYGON]: 'Polygon',
      [ETool.POINT]: 'Point',
      [ETool.FREEHAND]: 'Freehand',
      [ETool.NUCLICK_POINT]: 'Single click'
    }
  },
  aria: {
    description: {
      toolbar: 'Tools',
      annotationTools: 'Annotation tools'
    }
  }
} as const
