import { ETool } from '@common/constants/tools'

export default {
  appName: {
    short: 'AnnotAid',
    long: 'Nástroj na anotáciu histopatologických snímkov'
  },
  unit: {
    pixel: 'px',
    micro: 'μm'
  },
  position: {
    x: 'x',
    y: 'y'
  },
  dimensions: {
    width: 'Š',
    height: 'V'
  },
  compression: {
    uncompressed: 'Nekompr.',
    compressed: 'Kompr.'
  },
  actions: {
    openNewImage: 'Otvoriť nový obrázok',
    zoomToAnnotation: 'Priblížiť na anotáciu',
    zoomIn: 'Priblížiť',
    zoomOut: 'Oddialiť',
    editability: {
      true: 'Zamknúť anotáciu',
      false: 'Odomknúť anotáciu'
    },
    visibility: {
      true: 'Skryť anotáciu',
      false: 'Zobraziť anotáciu'
    },
    class: {
      showSystem: 'Zobraziť systémové triedy (+{{count}})'
    },
    update: {
      avaiable: 'Dostupná aktualizácia'
    },
    deleteAnnotation: 'Odstrániť anotáciu',
    share: 'Zdieľať',
    export: 'Exportovať'
  },
  tooltips: {
    resetToDefault: 'Obnoviť predvolené',
    fitToScreen: 'Prispôsobiť obrazovke',
    zoomToParentAnnotation: 'Priblížiť na nadradenú anotáciu',
    dblZoomToAnnotation: 'Dvojklik pre priblíženie na anotáciu',
    dblEditAnnotationName: 'Dvojklik pre úpravu názvu anotácie',
    copyAnnotationId: 'Kopírovať ID anotácie',
    tools: {
      annotation: 'Kliknutím vybrať nástroj',
      [ETool.HAND]: 'Ruka / Pohyb',
      [ETool.ZOOM_IN]: 'Priblížiť / Oddialiť',
      [ETool.RECTANGLE]: 'Obdĺžnik',
      [ETool.CIRCLE]: 'Kruh',
      [ETool.ELLIPSE]: 'Elipsa',
      [ETool.POLYGON]: 'Polygon',
      [ETool.POINT]: 'Bod',
      [ETool.FREEHAND]: 'Voľná ruka',
      [ETool.NUCLICK_POINT]: 'Segmentovať bunky',
      [ETool.SAM_FOREGROUND]: 'Zahrnúť oblasť',
      [ETool.SAM_BACKGROUND]: 'Vylúčiť oblasť',
      [ETool.SAM_BBOX]: 'Segmentovať oblasť'
    },
    window: {
      minimize: 'Minimalizovať okno',
      maximize: 'Maximalizovať okno',
      close: 'Zatvoriť okno'
    },
    class: {
      remove: 'Odstrániť triedu',
      select: 'Vybrať triedu',
      edit: 'Upraviť triedu',
      delete: 'Vymazať triedu',
      createNew: 'Vytvoriť novú triedu',
      createFirst: 'Vytvoriť prvú triedu'
    },
    page: {
      colorPicker: 'Kliknutím vybrať farbu'
    },
    tag: {
      remove: 'Odstrániť tag'
    },
    process: {
      select: 'Vybrať proces'
    },
    tabs: {
      add: 'Nová karta'
    }
  },
  aria: {
    label: {
      trafficLights: 'Ovládacie prvky okna',
      notifications: 'Oznámenia',
      settings: 'Nastavenia',
      report: 'Správa',
      opener: 'Otvárač súborov'
    },
    description: {
      toolbar: 'Nástroje',
      annotationTools: 'Nástroje na anotáciu',
      segmentationTools: 'Nástroje na segmentáciu',
      annotationSearch: 'Hľadanie anotácií',
      annotationList: 'Zoznam anotácií',
      imageInfo: 'Informácie o obrázke',
      imageActions: 'Akcie s obrázkom'
    }
  }
} as const
