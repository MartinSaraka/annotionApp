import { create } from 'zustand'

import { TAnnotation } from '@common/types/annotation'
import { CursorHandler } from '@renderer/handlers'

import { DEFAULT_ANNOTATION_TOOL, ETool } from '@common/constants/tools'

export type TAnnotoriousState = {
  anno: TAnno | null
  preview: TAnno | null

  setAnnotorious: (anno: TAnno | null) => void
  setAnnotoriousPreview: (preview: TAnno | null) => void

  getAnnotorious: () => TAnno | null
  getAnnotoriousPreview: () => TAnno | null

  saveAndUpdateAnnotation: (
    annotation: TAnnotation
  ) => Promise<TAnnotation | null>
  removeAnnotation: (annotation: TAnnotation) => void

  selectAnnotation: (target: TAnnotation | TID) => void
  cancelIfSelected: (target: TAnnotation) => void
  cancelAllSelected: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSelectedImage: () => any | null

  // Tools
  setTool: (tool: ETool) => void
  resetTool: () => void
}

/*const setGrabCursor = setHotkeyViewerCursor('grab')
const setCrosshairCursor = setHotkeyViewerCursor('crosshair')

const setAnnotationCursor = () => setViewerCursor('crosshair')
const setDefaultCursor = () => setViewerCursor('grab')*/

const useAnotoriousStore = create<TAnnotoriousState>()((set, get) => ({
  anno: null,
  preview: null,

  setAnnotorious: (anno) => set({ anno }),
  setAnnotoriousPreview: (preview) => set({ preview }),

  getAnnotorious: () => get().anno,
  getAnnotoriousPreview: () => get().preview,

  saveAndUpdateAnnotation: async (annotation) => {
    const annotorious = get().anno
    if (!annotorious) return null

    await annotorious.updateSelected(annotation)
    await annotorious.saveSelected()
    await annotorious.selectAnnotation(annotation)

    return annotation
  },

  removeAnnotation: (annotation) => {
    const annotorious = get().anno
    if (!annotorious) return

    annotorious.removeAnnotation(annotation.id)
  },

  selectAnnotation: (target) => {
    const annotorious = get().anno
    if (!annotorious) return
    annotorious.selectAnnotation(target)
  },

  cancelIfSelected: (target) => {
    const annotorious = get().anno
    if (!annotorious) return
    const selected = annotorious.getSelected()
    if (!selected || selected.id !== target.id) return
    annotorious.cancelSelected()
  },

  cancelAllSelected: () => {
    const annotorious = get().anno
    if (!annotorious) return
    annotorious.cancelSelected()
  },

  getSelectedImage: () => {
    const annotorious = get().anno
    if (!annotorious) return null
    return annotorious.getSelectedImageSnippet()
  },

  setTool: (tool) => {
    const annotorious = get().anno
    if (!annotorious) return

    const viewer = annotorious._app.current.__v.props.viewer
    CursorHandler.setAnnotationCursor(tool, viewer)

    /*window.addEventListener('keydown', setGrabCursor)
    window.addEventListener('keyup', setCrosshairCursor)*/

    annotorious.setDrawingTool(tool)
    annotorious.cancelSelected()
    annotorious.setDrawingEnabled(true)
    annotorious.disableSelect = true
    // setAnnotationCursor()
  },

  resetTool: () => {
    const annotorious = get().anno
    if (!annotorious) return

    const viewer = annotorious._app.current.__v.props.viewer
    CursorHandler.resetAll(viewer)

    /*window.removeEventListener('keydown', setGrabCursor)
    window.removeEventListener('keyup', setCrosshairCursor)*/

    annotorious.setDrawingTool(DEFAULT_ANNOTATION_TOOL.value)
    annotorious.setDrawingEnabled(false)
    annotorious.disableSelect = false
    // setDefaultCursor()
  }
}))

export default useAnotoriousStore
