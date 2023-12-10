import { ETool } from '@common/constants/tools'

export default {
  sections: {
    parameters: 'parameters',
    measurements: 'measurements',
    class: 'class',
    processes: 'processes'
  },
  popovers: {
    selectClass: 'class list',
    selectProcess: 'process list'
  },
  properties: {
    type: {
      [ETool.POINT]: 'point',
      [ETool.NUCLICK_POINT]: 'point',
      [ETool.RECTANGLE]: 'rectangle',
      [ETool.CIRCLE]: 'circle',
      [ETool.ELLIPSE]: 'ellipse',
      [ETool.POLYGON]: 'polygon',
      [ETool.FREEHAND]: 'freehand',
      unknown: 'unknown'
    },
    id: {
      label: 'id'
    },
    parent: {
      label: 'parent'
    },
    name: {
      label: 'name'
    },
    description: {
      label: 'description'
    },
    class: {
      label: 'class',
      placeholder: 'default class',
      empty: 'no class'
    },
    color: {
      label: 'color'
    },
    position: {
      label: 'position'
    },
    centroid: {
      label: 'centroid'
    },
    area: {
      label: 'area'
    },
    perimeter: {
      label: 'perimeter'
    },
    tag: {
      confidence: 'with confidence'
    }
  }
} as const
