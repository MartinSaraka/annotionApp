import OpenSeadragon from 'openseadragon'

export const OPEN_SEA_DRAGON_ID = 'open-sea-dragon'
export const OPEN_SEA_DRAGON_MINIMAP_ID = 'osd-minimap'
export const OPEN_SEA_DRAGON_HOME_ID = 'osd-home'
export const OPEN_SEA_DRAGON_FULL_PAGE_ID = 'osd-full-page'
export const OPEN_SEA_DRAGON_ZOOM_IN_ID = 'osd-zoom-in'
export const OPEN_SEA_DRAGON_ZOOM_OUT_ID = 'osd-zoom-out'

export const OPEN_SEA_DRAGON_PREFIX_URL =
  'https://cdn.jsdelivr.net/npm/openseadragon@3.1.0/build/openseadragon/images/'

export const OPEN_SEA_DRAGON_DEFAULT_OPTIONS: Partial<OpenSeadragon.Options> = {
  id: OPEN_SEA_DRAGON_ID,
  prefixUrl: OPEN_SEA_DRAGON_PREFIX_URL,

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
  // navigatorId: OPEN_SEA_DRAGON_MINIMAP_ID,
  // navigatorMaintainSizeRatio: true,

  // Toolbar - Home
  homeButton: OPEN_SEA_DRAGON_HOME_ID,
  fullPageButton: OPEN_SEA_DRAGON_FULL_PAGE_ID,

  // Toolbar - Zoom
  zoomInButton: OPEN_SEA_DRAGON_ZOOM_IN_ID,
  zoomOutButton: OPEN_SEA_DRAGON_ZOOM_OUT_ID
}
