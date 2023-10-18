import { useCallback, useEffect } from 'react'

// OpenSeadragon
import OpenSeadragon from 'openseadragon'
import OpenSeadragonImagingHelper from '@openseadragon-imaging/openseadragon-imaginghelper'
import '@renderer/lib/openseadragon-scalebar.js'
import '@renderer/lib/openseadragon-smart-scroll-zoom.js'

// Annotorious
import * as Annotorious from '@recogito/annotorious-openseadragon'
import * as SelectorPack from '@recogito/annotorious-selector-pack'

import { OSDAdapter } from '@renderer/adapters'
import {
  useAnnotoriousStore,
  useImageStore,
  useOpenSeadragonStore
} from '@renderer/store'

import { TImageInfo } from '@common/types/image'
import { TAnnotation, TAnnotationBody } from '@common/types/annotation'

import {
  OPEN_SEADRAGON_PREVIEW_OPTIONS,
  OPEN_SEADRAGON_DEFAULT_OPTIONS
} from '@common/constants/viewer'
import {
  ANNOTORIOUS_DEFAULT_CONFIG,
  ANNOTORIOUS_PREVIEW_CONFIG
} from '@common/constants/annotations'
import { AnnotoriousHandler } from '@renderer/handlers'

export type TUseViewer = {
  closeOpenSeadragon: () => void
  closeAnnotorious: () => void
}

/**
 * Register annotorious shape labels plugin and custom formatter
 * @description Add support for shape labels and colors
 */
const formatter = (data: { bodies: TAnnotationBody[] }) => {
  const label = data.bodies.find((b) => b.purpose === 'tagging')

  const foreignObject = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'foreignObject'
  )

  foreignObject.innerHTML = `
    <div xmlns="http://www.w3.org/1999/xhtml" class="a9s-shape-label-wrapper">
      <div class="a9s-shape-label"></div>
    </div>
  `

  return {
    element: foreignObject,
    'data-class-id': label?.value || ''
  }
}

const useViewer = (source: TImageInfo): TUseViewer => {
  const openseadragon = useOpenSeadragonStore((state) => state.osd)
  const osdPreview = useOpenSeadragonStore((state) => state.preview)

  const annotorious = useAnnotoriousStore((state) => state.anno)
  const annoPreview = useAnnotoriousStore((state) => state.preview)

  const annotations = useImageStore((state) => state.getAnnotations() || {})
  const saveAnnotation = useImageStore((state) => state.saveAnnotation)
  const removeAnnotation = useImageStore((state) => state.removeAnnotation)
  const selectAnnotation = useImageStore((state) => state.selectAnnotation)
  const deselectAnnotations = useImageStore(
    (state) => state.deselectAnnotations
  )

  const setOpenSeadragon = useOpenSeadragonStore(
    (state) => state.setOpenSeadragon
  )
  const setOpenSeadragonPreview = useOpenSeadragonStore(
    (state) => state.setOpenSeadragonPreview
  )
  const setOpenSeadragonHelper = useOpenSeadragonStore(
    (state) => state.setOpenSeadragonHelper
  )

  const setAnnotorious = useAnnotoriousStore((state) => state.setAnnotorious)
  const setAnnotoriousPreview = useAnnotoriousStore(
    (state) => state.setAnnotoriousPreview
  )

  const initOpenSeadragon = useCallback((info: TImageInfo) => {
    const tileSources = OSDAdapter.fromInfoToTileSources(info)

    const mainOpenSeadragon = OpenSeadragon({
      ...OPEN_SEADRAGON_DEFAULT_OPTIONS,
      tileSources
    })

    const previewOpenSeadragon = OpenSeadragon({
      ...OPEN_SEADRAGON_PREVIEW_OPTIONS,
      tileSources
    })

    /**
     * Register OpenSeadragon Scalebar plugin
     * @see /renderer/lib/openseadragon-scalebar.js
     */
    mainOpenSeadragon.scalebar({
      pixelsPerMeter: info.pixelsPerMeter.avg,
      stayInsideImage: false
    })

    /**
     * Register OpenSeadragon Smart Scroll Zoom plugin
     * @see /renderer/lib/openseadragon-smart-scroll-zoom.js
     */
    mainOpenSeadragon.smartScrollZoom({
      enabled: true
    })

    const helperOpenSeadragon = new OpenSeadragonImagingHelper({
      viewer: mainOpenSeadragon
    })

    return {
      main: mainOpenSeadragon,
      preview: previewOpenSeadragon,
      helper: helperOpenSeadragon
    }
  }, [])

  const initAnnotorious = useCallback(
    (main: TOSDViewer, preview: TOSDViewer) => {
      const mainAnnotorious = Annotorious(main, {
        ...ANNOTORIOUS_DEFAULT_CONFIG,
        formatter
      })

      const previewAnnotorious = Annotorious(preview, {
        ...ANNOTORIOUS_PREVIEW_CONFIG,
        formatter
      })

      /**
       * Register annotorious selector pack plugin
       * @description Add support for frehand, circle, ellipse and point shapes
       */
      SelectorPack(mainAnnotorious)

      return {
        main: mainAnnotorious,
        preview: previewAnnotorious
      }
    },
    []
  )

  const initAnnotoriousHandlers = useCallback(
    (anno: TAnno, preview: TAnno) => {
      anno.setDrawingEnabled(false)
      anno.setAnnotations(Object.values(annotations))

      anno.on('createSelection', (selection: TAnnotation) => {
        console.log('createSelection')
        anno.updateSelected(selection, true)
      })

      anno.on('changeSelectionTarget', () => {
        console.log('changeSelectionTarget')
      })

      anno.on('clickAnnotation', (annotation: TAnnotation) => {
        console.log('clickAnnotation', annotation)
      })

      anno.on('startSelection', (point) => {
        console.log('startSelection')
        console.log(point)
      })

      anno.on('createAnnotation', (annotation: TAnnotation) => {
        console.log('createAnnotation')
        saveAnnotation(annotation)
        AnnotoriousHandler.instance(preview).showPreview(annotation)
      })

      anno.on('updateAnnotation', (annotation: TAnnotation) => {
        console.log('updateAnnotation')
        saveAnnotation(annotation)
        AnnotoriousHandler.instance(preview).showPreview(annotation)
      })

      anno.on('deleteAnnotation', (annotation: TAnnotation) => {
        console.log('deleteAnnotation')
        removeAnnotation(annotation.id)
      })

      anno.on('selectAnnotation', (annotation: TAnnotation) => {
        console.log('selectAnnotation')
        selectAnnotation(annotation.id)
        AnnotoriousHandler.instance(preview).showPreview(annotation)
      })

      anno.on('cancelSelected', () => {
        console.log('cancelSelected')
        deselectAnnotations()
      })
    },
    [annotations]
  )

  useEffect(() => {
    closeOpenSeadragon()
    closeAnnotorious()

    const osd = initOpenSeadragon(source)
    const anno = initAnnotorious(osd.main, osd.preview)

    initAnnotoriousHandlers(anno.main, anno.preview)

    setOpenSeadragon(osd.main)
    setOpenSeadragonPreview(osd.preview)
    setOpenSeadragonHelper(osd.helper)

    setAnnotorious(anno.main)
    setAnnotoriousPreview(anno.preview)

    return () => {
      closeOpenSeadragon()
      closeAnnotorious()
    }
  }, [source])

  const closeOpenSeadragon = useCallback(() => {
    if (openseadragon) {
      openseadragon.destroy()
      setOpenSeadragon(null)
    }
    if (osdPreview) {
      osdPreview.destroy()
      setOpenSeadragonPreview(null)
    }
  }, [openseadragon, osdPreview])

  const closeAnnotorious = useCallback(() => {
    if (annotorious) {
      annotorious.destroy()
      setAnnotorious(null)
    }
    if (annoPreview) {
      annoPreview.destroy()
      setAnnotoriousPreview(null)
    }
  }, [annotorious, annoPreview])

  return { closeOpenSeadragon, closeAnnotorious }
}

export default useViewer
