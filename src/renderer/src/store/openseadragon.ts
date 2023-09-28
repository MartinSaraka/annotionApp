import { ETool } from '@common/constants/tools'
import { setHotkeyViewerCursor } from '@common/utils/tools'
import { setViewerCursor } from '@common/utils/viewer'
import { create } from 'zustand'

export type TOpenSeadragonState = {
  osd: TOSDViewer | null
  preview: TOSDViewer | null
  helper: TOSDHelper | null

  setOpenSeadragon: (osd: TOSDViewer | null) => void
  setOpenSeadragonPreview: (preview: TOSDViewer | null) => void
  setOpenSeadragonHelper: (helper: TOSDHelper | null) => void

  getOpenSeadragon: () => TOSDViewer | null
  getOpenSeadragonPreview: () => TOSDViewer | null
  getOpenSeadragonHelper: () => TOSDHelper | null

  // Handlers
  addHandler: TOSDViewer['addHandler']
  removeHandler: TOSDViewer['removeHandler']

  // Tools
  setTool: (tool: ETool) => void
  resetTool: () => void
}

const setZoomOutCursor = setHotkeyViewerCursor('zoom-out', 'Shift')
const setZoomInCursor = setHotkeyViewerCursor('zoom-in', 'Shift')

const setZoomCursor = () => setViewerCursor('zoom-in')
const setGrabCursor = () => setViewerCursor('grab')
const setGrabbingCursor = () => setViewerCursor('grabbing')

const useOpenSeadragonStore = create<TOpenSeadragonState>()((set, get) => ({
  osd: null,
  preview: null,
  helper: null,

  setOpenSeadragon: (osd) => set({ osd }),
  setOpenSeadragonPreview: (preview) => set({ preview }),
  setOpenSeadragonHelper: (helper) => set({ helper }),

  getOpenSeadragon: () => get().osd,
  getOpenSeadragonPreview: () => get().preview,
  getOpenSeadragonHelper: () => get().helper,

  addHandler: (event, handler) => {
    const openseadragon = get().osd
    if (!openseadragon) return

    openseadragon.addHandler(event, handler)
  },

  removeHandler: (event, handler) => {
    const openseadragon = get().osd
    if (!openseadragon) return

    openseadragon.removeHandler(event, handler)
  },

  setTool: (tool) => {
    const openseadragon = get().osd
    if (!openseadragon) return

    if (tool === ETool.ZOOM_IN) {
      window.addEventListener('keydown', setZoomOutCursor)
      window.addEventListener('keyup', setZoomInCursor)

      openseadragon.addHandler('canvas-drag', setGrabbingCursor)
      openseadragon.addHandler('canvas-drag-end', setZoomCursor)

      openseadragon.gestureSettingsMouse.clickToZoom = true
      setZoomCursor()
    }

    if (tool === ETool.HAND) {
      openseadragon.addHandler('canvas-press', setGrabbingCursor)
      openseadragon.addHandler('canvas-release', setGrabCursor)

      setGrabCursor()
    }
  },

  resetTool: () => {
    const openseadragon = get().osd
    if (!openseadragon) return

    window.removeEventListener('keydown', setZoomOutCursor)
    window.removeEventListener('keyup', setZoomInCursor)

    openseadragon.removeHandler('canvas-drag', setGrabbingCursor)
    openseadragon.removeHandler('canvas-drag-end', setZoomCursor)

    openseadragon.removeHandler('canvas-press', setGrabbingCursor)
    openseadragon.removeHandler('canvas-release', setGrabCursor)

    openseadragon.gestureSettingsMouse.clickToZoom = false

    setGrabCursor()
  }
}))

export default useOpenSeadragonStore
