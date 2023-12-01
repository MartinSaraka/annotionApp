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
  dimensions: {
    width: 'W',
    height: 'H'
  },
  compression: {
    uncompressed: 'Unc.',
    compressed: 'Com.'
  },
  actions: {
    zoomToAnnotation: 'Zoom to annotation',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    editability: {
      true: 'Lock annotation',
      false: 'Unlock annotation'
    },
    visibility: {
      true: 'Hide annotation',
      false: 'Show annotation'
    },
    class: {
      showSystem: 'Show system classes (+{{count}})'
    },
    update: {
      avaiable: 'Update available'
    },
    deleteAnnotation: 'Delete annotation',
    share: 'Share',
    export: 'Export'
  },
  tooltips: {
    resetToDefault: 'Reset to default',
    fitToScreen: 'Fit to screen',
    zoomToParentAnnotation: 'Zoom to parent annotation',
    dblZoomToAnnotation: 'Double click to zoom to annotation',
    dblEditAnnotationName: 'Double click to edit annotation name',
    copyAnnotationId: 'Copy annotation id',
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
      [ETool.NUCLICK_POINT]: 'Segment nuclei',
      [ETool.SAM_FOREGROUND]: 'Include area',
      [ETool.SAM_BACKGROUND]: 'Exclude area',
      [ETool.SAM_BBOX]: 'Segment area'
    },
    window: {
      minimize: 'Minimize window',
      maximize: 'Maximize window',
      close: 'Close window'
    },
    class: {
      remove: 'Remove class',
      select: 'Select class',
      edit: 'Edit class',
      delete: 'Delete class',
      createNew: 'Create new class',
      createFirst: 'Create first class'
    },
    page: {
      colorPicker: 'Click to pick color'
    },
    tag: {
      remove: 'Remove tag'
    },
    process: {
      select: 'Select process'
    },
    tabs: {
      add: 'New tab'
    }
  },
  aria: {
    label: {
      trafficLights: 'Window controls',
      notifications: 'Notifications',
      settings: 'Settings',
      report: 'Report'
    },
    description: {
      toolbar: 'Tools',
      annotationTools: 'Annotation tools',
      segmentationTools: 'Segmentation tools',
      annotationSearch: 'Annotation search',
      annotationList: 'Annotation list',
      imageInfo: 'Image info',
      imageActions: 'Image actions'
    }
  }
} as const
