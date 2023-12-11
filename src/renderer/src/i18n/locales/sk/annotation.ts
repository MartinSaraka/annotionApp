import { ETool } from '@common/constants/tools'

export default {
  sections: {
    parameters: 'parametre',
    measurements: 'merania',
    class: 'trieda',
    processes: 'procesy'
  },
  popovers: {
    selectClass: 'zoznam tried',
    selectProcess: 'zoznam procesov'
  },
  properties: {
    type: {
      [ETool.POINT]: 'bod',
      [ETool.NUCLICK_POINT]: 'bod',
      [ETool.RECTANGLE]: 'obdĺžnik',
      [ETool.CIRCLE]: 'kruh',
      [ETool.ELLIPSE]: 'elipsa',
      [ETool.POLYGON]: 'polygon',
      [ETool.FREEHAND]: 'voľná ruka',
      unknown: 'neznáme'
    },
    id: {
      label: 'ID'
    },
    parent: {
      label: 'rodič'
    },
    name: {
      label: 'názov'
    },
    description: {
      label: 'popis'
    },
    class: {
      label: 'trieda',
      placeholder: 'predvolená trieda',
      empty: 'žiadna trieda'
    },
    color: {
      label: 'farba'
    },
    position: {
      label: 'poloha'
    },
    centroid: {
      label: 'centroid'
    },
    area: {
      label: 'plocha'
    },
    perimeter: {
      label: 'obvod'
    },
    tag: {
      confidence: 's istotou'
    }
  }
} as const
