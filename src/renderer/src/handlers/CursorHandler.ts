import { Viewer } from 'openseadragon'
import { Property } from '@stitches/react/types/css'

import { ETool } from '@common/constants/tools'
import { setViewerCursor } from '@common/utils/viewer'
import { ANNOTORIOUS_HOTKEY } from '@common/constants/annotations'

import rect from '../../../../resources/icons/cursors/rect-crosshair.svg'
import circle from '../../../../resources/icons/cursors/circle-crosshair.svg'
import ellipse from '../../../../resources/icons/cursors/ellipse-crosshair.svg'
import polygon from '../../../../resources/icons/cursors/polygon-crosshair.svg'
import point from '../../../../resources/icons/cursors/point-crosshair.svg'
import freehand from '../../../../resources/icons/cursors/freehand-crosshair.svg'
import nuclick from '../../../../resources/icons/cursors/nuclick-crosshair.svg'

const cursors: Record<
  Exclude<ETool, 'hand' | 'zoom-in' | 'zoom-out'>,
  string
> = {
  [ETool.RECTANGLE]: rect,
  [ETool.CIRCLE]: circle,
  [ETool.ELLIPSE]: ellipse,
  [ETool.POLYGON]: polygon,
  [ETool.POINT]: point,
  [ETool.FREEHAND]: freehand,
  [ETool.NUCLICK_POINT]: nuclick
}

class CursorHandler {
  static #setKeyGrabCursor: ((e: KeyboardEvent) => void) | null = null
  static #setKeyToolCursor: ((e: KeyboardEvent) => void) | null = null

  static #setKeyZoomOutCursor: ((e: KeyboardEvent) => void) | null = null
  static #setKeyZoomInCursor: ((e: KeyboardEvent) => void) | null = null

  static #setCrosshairCursor: (() => void) | null = null

  static #setGrabCursor = () => setViewerCursor('grab')
  static #setGrabbingCursor = () => setViewerCursor('grabbing')
  static #setZoomCursor = () => setViewerCursor('zoom-in')

  private constructor() {
    throw new Error('`CursorHandler` should not be instantiated')
  }

  static #setKeydownCursor = (
    cursor: Property.Cursor,
    hotkey: KeyboardEvent['key'] = ANNOTORIOUS_HOTKEY
  ) => {
    return (e: KeyboardEvent) => {
      if (e.key === hotkey) setViewerCursor(cursor)
    }
  }

  static getCrosshairCursor = (tool: ETool) => {
    return `url(${cursors[tool]}) 8 8, crosshair`
  }

  static setZoomCursor = (osd: Viewer) => {
    CursorHandler.#setKeyZoomOutCursor =
      CursorHandler.#setKeydownCursor('zoom-out')
    CursorHandler.#setKeyZoomInCursor =
      CursorHandler.#setKeydownCursor('zoom-in')

    window.addEventListener('keydown', CursorHandler.#setKeyZoomOutCursor)
    window.addEventListener('keyup', CursorHandler.#setKeyZoomInCursor)

    osd.addHandler('canvas-drag', CursorHandler.#setGrabbingCursor)
    osd.addHandler('canvas-drag-end', CursorHandler.#setZoomCursor)

    CursorHandler.#setZoomCursor()
  }

  static setPanCursor = (osd?: Viewer) => {
    if (osd) {
      osd.addHandler('canvas-press', CursorHandler.#setGrabbingCursor)
      osd.addHandler('canvas-release', CursorHandler.#setGrabCursor)
    }

    CursorHandler.#setGrabCursor()
  }

  static setAnnotationCursor = <TTool extends ETool>(
    tool: TTool,
    osd?: Viewer
  ) => {
    const cursor = CursorHandler.getCrosshairCursor(tool)
    CursorHandler.#setCrosshairCursor = () => setViewerCursor(cursor)

    CursorHandler.#setKeyGrabCursor = CursorHandler.#setKeydownCursor('grab')
    CursorHandler.#setKeyToolCursor = CursorHandler.#setKeydownCursor(cursor)

    window.addEventListener('keydown', CursorHandler.#setKeyGrabCursor)
    window.addEventListener('keyup', CursorHandler.#setKeyToolCursor)

    if (osd) {
      osd.addHandler('canvas-drag', CursorHandler.#setGrabbingCursor)
      osd.addHandler('canvas-drag-end', CursorHandler.#setCrosshairCursor)
    }

    CursorHandler.#setCrosshairCursor()
  }

  static resetAll = (osd?: Viewer) => {
    if (CursorHandler.#setKeyGrabCursor)
      window.removeEventListener('keydown', CursorHandler.#setKeyGrabCursor)
    if (CursorHandler.#setKeyToolCursor)
      window.removeEventListener('keyup', CursorHandler.#setKeyToolCursor)

    if (CursorHandler.#setKeyZoomOutCursor)
      window.removeEventListener('keydown', CursorHandler.#setKeyZoomOutCursor)
    if (CursorHandler.#setKeyZoomInCursor)
      window.removeEventListener('keyup', CursorHandler.#setKeyZoomInCursor)

    if (!osd) return

    if (CursorHandler.#setCrosshairCursor)
      osd.removeHandler('canvas-drag-end', CursorHandler.#setCrosshairCursor)

    osd.removeHandler('canvas-drag', CursorHandler.#setGrabbingCursor)
    osd.removeHandler('canvas-drag-end', CursorHandler.#setZoomCursor)

    osd.removeHandler('canvas-press', CursorHandler.#setGrabbingCursor)
    osd.removeHandler('canvas-release', CursorHandler.#setGrabCursor)
  }
}

export default CursorHandler
