import { useCallback, useEffect, useState } from 'react'
import { Property } from '@stitches/react/types/css'

import * as Annotorious from '@recogito/annotorious-openseadragon'
import * as SelectorPack from '@recogito/annotorious-selector-pack'
import * as ShapeLabelsFormatter from '@recogito/annotorious-shape-labels'

import { setViewerCursor } from '@common/utils/viewer'
import { TAnnotation } from '@common/types/annotation'
import { useImageStore } from '@renderer/store'

import { ETool, EToolsType, TOOLS } from '@common/constants/tools'
import {
  ANNOTORIOUS_DEFAULT_CONFIG,
  ANNOTORIOUS_HOTKEY
} from '@common/constants/annotations'

export type TUseAnnotations = {
  anno: typeof Annotorious | null
  close: () => void

  setTool: (tool: keyof (typeof TOOLS)[EToolsType.ANNOTATION]) => void
  resetTool: () => void
}

const setCursor = (cursor: Property.Cursor) => (e: KeyboardEvent) => {
  if (e.key === ANNOTORIOUS_HOTKEY) setViewerCursor(cursor)
}

const setGrabCursor = setCursor('grab')
const resetGrabCursor = setCursor('crosshair')

const useAnnotations = (viewer: TOSDViewer | null): TUseAnnotations => {
  const [anno, setAnno] = useState<TUseAnnotations['anno']>(null)

  const annotations = useImageStore((state) => state.getAnnotations() || {})
  const saveAnnotation = useImageStore((state) => state.saveAnnotation)
  const removeAnnotation = useImageStore((state) => state.removeAnnotation)

  useEffect(() => {
    close()

    if (!viewer) return

    const annotorious = Annotorious(viewer, {
      ...ANNOTORIOUS_DEFAULT_CONFIG,
      /**
       * Register annotorious shape labels plugin
       * @description Add support for shape labels
       */
      formatter: ShapeLabelsFormatter()
    })

    /**
     * Register annotorious selector pack plugin
     * @description Add support for frehand, circle, ellipse and point shapes
     */
    SelectorPack(annotorious)

    annotorious.setDrawingEnabled(false)
    annotorious.setAnnotations(Object.values(annotations))

    annotorious.on('createAnnotation', (annotation: TAnnotation) => {
      saveAnnotation(annotation)
    })

    annotorious.on('updateAnnotation', (annotation: TAnnotation) => {
      saveAnnotation(annotation)
    })

    annotorious.on('deleteAnnotation', (annotation: TAnnotation) => {
      removeAnnotation(annotation.id)
    })

    setAnno(annotorious)

    return close
  }, [viewer])

  const close = useCallback(() => {
    if (!anno) return

    anno.destroy()
    setAnno(null)
  }, [anno])

  const setTool = useCallback(
    (tool: keyof (typeof TOOLS)[EToolsType.ANNOTATION]) => {
      if (!anno) return

      window.addEventListener('keydown', setGrabCursor)
      window.addEventListener('keyup', resetGrabCursor)

      anno.setDrawingTool(tool)
      anno.setDrawingEnabled(true)
      setViewerCursor('crosshair')
    },
    [anno]
  )

  const resetTool = useCallback(() => {
    if (!anno) return

    window.removeEventListener('keydown', setGrabCursor)
    window.removeEventListener('keyup', resetGrabCursor)

    anno.setDrawingTool(ETool.RECTANGLE)
    anno.setDrawingEnabled(false)
    setViewerCursor('grab')
  }, [anno])

  return { anno, close, setTool, resetTool }
}

export default useAnnotations
