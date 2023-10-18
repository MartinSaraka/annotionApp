import OpenSeadragon from 'openseadragon'

export const OPEN_SEADRAGON_ID = 'open-seadragon'
export const OPEN_SEADRAGON_PREVIEW_ID = 'open-seadragon-preview'
export const OPEN_SEADRAGON_HOME_ID = 'open-seadragon-home'

export const OPEN_SEADRAGON_PREFIX_URL =
  'https://cdn.jsdelivr.net/npm/openseadragon@3.1.0/build/openseadragon/images/'

export const OPEN_SEADRAGON_DEFAULT_OPTIONS: Partial<OpenSeadragon.Options> = {
  // debugMode: true,

  id: OPEN_SEADRAGON_ID,
  prefixUrl: OPEN_SEADRAGON_PREFIX_URL,
  homeButton: OPEN_SEADRAGON_HOME_ID,

  visibilityRatio: 1,
  maxZoomPixelRatio: 20,
  preserveImageSizeOnResize: true,
  blendTime: 0.1,
  animationTime: 0.5,
  gestureSettingsMouse: {
    clickToZoom: false
  },

  // Minimap
  showNavigator: true,
  navigatorBorderColor: 'none',
  navigatorBackground: '#101021',
  navigatorMaintainSizeRatio: true
}

export const OPEN_SEADRAGON_PREVIEW_OPTIONS: Partial<OpenSeadragon.Options> = {
  id: OPEN_SEADRAGON_PREVIEW_ID,

  mouseNavEnabled: false,
  showNavigator: false,
  showNavigationControl: false,
  showSequenceControl: false,
  showReferenceStrip: false
}
