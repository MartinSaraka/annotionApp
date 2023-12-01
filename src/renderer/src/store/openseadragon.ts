import { create } from 'zustand'

import { CursorHandler } from '@renderer/handlers'
import { ETool } from '@common/constants/tools'

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
      CursorHandler.setZoomCursor(openseadragon)
      openseadragon.gestureSettingsMouse.clickToZoom = true
    }

    if (tool === ETool.HAND) {
      CursorHandler.setPanCursor(openseadragon)
    }
  },

  resetTool: () => {
    const openseadragon = get().osd
    if (!openseadragon) return

    CursorHandler.resetAll(openseadragon)
    openseadragon.gestureSettingsMouse.clickToZoom = false
  }
}))

export default useOpenSeadragonStore
