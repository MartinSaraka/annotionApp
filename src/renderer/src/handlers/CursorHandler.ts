import { ETool } from '@common/constants/tools'
import { setViewerCursor } from '@common/utils/viewer'

class CursorHandler {
  private constructor() {
    throw new Error('`CursorHandler` should not be instantiated')
  }

  static setToolCursor = (tool: ETool) => {
    switch (tool) {
      case ETool.ZOOM_IN:
        return CursorHandler.setZoomCursor()
      case ETool.HAND:
        return CursorHandler.setPanCursor()
      case ETool.RECTANGLE:
      case ETool.FREEHAND:
      case ETool.POLYGON:
      case ETool.ELLIPSE:
      case ETool.CIRCLE:
      case ETool.POINT:
        return CursorHandler.setAnnotationCursor(tool)
    }

    return CursorHandler.setPanCursor()
  }

  static setZoomCursor = () => {
    setViewerCursor('zoom-in')
  }

  static setPanCursor = () => {
    setViewerCursor('grab')
  }

  static setAnnotationCursor = <TTool extends ETool>(tool: TTool) => {
    console.log(tool)
    setViewerCursor('crosshair')
  }
}

export default CursorHandler
