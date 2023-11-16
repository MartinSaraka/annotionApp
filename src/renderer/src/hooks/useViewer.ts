import { useCallback, useEffect } from 'react'

// OpenSeadragon
import OpenSeadragon from 'openseadragon'
import OpenSeadragonImagingHelper from '@openseadragon-imaging/openseadragon-imaginghelper'
import '@renderer/lib/openseadragon-scalebar.js'
import '@renderer/lib/openseadragon-smart-scroll-zoom.js'

// Annotorious
import Annotorious from '@recogito/annotorious-openseadragon'
import SelectorPack from '@recogito/annotorious-selector-pack'
import NuClickTool from '@renderer/tools/NuClick/NuClickTool'

import { AnnotationHandler, AnnotoriousHandler } from '@renderer/handlers'
import { OSDAdapter } from '@renderer/adapters'
import {
  useAnnotoriousStore,
  useImageStore,
  useOpenSeadragonStore
} from '@renderer/store'

import { TImageInfo } from '@common/types/image'
import { TAnnotation, TAnnotationBody } from '@common/types/annotation'

import { ETool } from '@common/constants/tools'
import {
  OPEN_SEADRAGON_PREVIEW_OPTIONS,
  OPEN_SEADRAGON_DEFAULT_OPTIONS
} from '@common/constants/viewer'
import {
  ANNOTORIOUS_DEFAULT_CONFIG,
  ANNOTORIOUS_PREVIEW_CONFIG
} from '@common/constants/annotations'
import { AiService } from '@renderer/services'

export type TUseViewer = {
  closeOpenSeadragon: () => void
  closeAnnotorious: () => void
}

/**
 * Register annotorious shape labels plugin and custom formatter
 * @description Add support for shape labels and colors
 */
const formatter = (data: {
  bodies: TAnnotationBody[]
  underlying: TAnnotation
}) => {
  const props = {}

  for (const body of data.bodies) {
    switch (body.purpose) {
      case 'tagging':
        props['data-class-id'] = body.value
        break
      case 'status':
        props['data-status'] = body.value
        break
      case 'editability':
        props['data-editability'] = body.value
        break
      case 'visibility':
        props['data-visibility'] = body.value
        break
    }
  }

  const foreignObject = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'foreignObject'
  )

  foreignObject.innerHTML = `
    <div xmlns="http://www.w3.org/1999/xhtml" class="a9s-shape-label-wrapper">
      <div class="a9s-shape-label"></div>
    </div>
  `

  const pointObject = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'foreignObject'
  )

  pointObject.innerHTML = `
    <div xmlns="http://www.w3.org/1999/xhtml" class="a9s-generating-wrapper">
      <div class="a9s-generating"></div>
    </div>
  `

  return {
    element: props['data-status']
      ? pointObject
      : props['data-class-id']
      ? foreignObject
      : undefined,
    ...props
  }
}

const useViewer = (source: TImageInfo): TUseViewer => {
  const openseadragon = useOpenSeadragonStore((state) => state.osd)
  const osdPreview = useOpenSeadragonStore((state) => state.preview)

  const annotorious = useAnnotoriousStore((state) => state.anno)
  const annoPreview = useAnnotoriousStore((state) => state.preview)

  const annotations = useImageStore((state) => state.getAnnotations() || {})
  const getActiveTool = useImageStore((state) => state.activeTool)
  const getActiveClass = useImageStore((state) => state.getActiveClass)
  const saveAnnotation = useImageStore((state) => state.saveAnnotation)
  const getSelectedAnnotation = useImageStore(
    (state) => state.getSelectedAnnotation
  )
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

      /**
       * Register annotorious NuClick custom tool
       */
      mainAnnotorious.addDrawingTool(NuClickTool)

      /**
       * Cancel selected locked or not visible annotation
       */
      main.addHandler('canvas-click', () => {
        const isSelected = !!mainAnnotorious.getSelected()
        if (!isSelected && !!getSelectedAnnotation()) {
          deselectAnnotations()
        }
      })

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

        let annotation = selection

        // Active Class
        const activeClass = getActiveClass()
        if (activeClass?.id) {
          annotation = AnnotationHandler.upsertBody(
            annotation,
            'TextualBody',
            'tagging',
            activeClass.id
          )
        }

        anno.updateSelected(annotation, true)
      })

      anno.on('changeSelectionTarget', () => {
        console.log('changeSelectionTarget')
      })

      anno.on(
        'clickAnnotation',
        (annotation: TAnnotation, element: HTMLElement) => {
          console.log('clickAnnotation', annotation)

          const status = element.getAttribute('data-status')
          const editability = element.getAttribute('data-editability')

          if (status === 'generating' || editability === 'locked') {
            selectAnnotation(annotation.id)
            AnnotoriousHandler.instance(preview).showPreview(annotation)
          }
        }
      )

      anno.on('startSelection', (point) => {
        console.log('startSelection')
        console.log(point)
      })

      anno.on('createAnnotation', (annotationData: TAnnotation) => {
        console.log('createAnnotation')

        let annotation = annotationData

        // Active Tool
        const activeTool = getActiveTool()

        const intersections =
          (anno.getAnnotationsIntersecting(annotation) as [
            { underlying: TAnnotation }
          ]) || []

        if (intersections.length > 0) {
          const parent = intersections[intersections.length - 1]
          annotation = AnnotationHandler.upsertBody(
            annotation,
            'TextualBody',
            'parent',
            parent.underlying.id
          )
        }

        saveAnnotation(annotation)
        AnnotoriousHandler.instance(preview).showPreview(annotation)

        //TODO: MITOTIC temporary solution
        /*if (activeTool.value === ETool.RECTANGLE) {
          AiService.MitoticCount(annotation).then((data) => {
            if (data) {
              data.forEach((item) => {
                anno.addAnnotation(item)
                saveAnnotation(item)
              })
              AnnotoriousHandler.instance(preview).showPreview(annotation)
            }
          })
        }*/

        if (activeTool.value === ETool.NUCLICK_POINT) {
          AiService.NuClick(annotation).then((data) => {
            anno.removeAnnotation(annotation.id)
            removeAnnotation(annotation.id)

            if (data) {
              let newAnnotation = data

              const intersections =
                (anno.getAnnotationsIntersecting(newAnnotation) as [
                  { underlying: TAnnotation }
                ]) || []

              if (intersections.length > 0) {
                const parent = intersections[intersections.length - 1]
                newAnnotation = AnnotationHandler.upsertBody(
                  newAnnotation,
                  'TextualBody',
                  'parent',
                  parent.underlying.id
                )
              }

              anno.addAnnotation(newAnnotation)
              saveAnnotation(newAnnotation)
              AnnotoriousHandler.instance(preview).showPreview(newAnnotation)
            }
          })

          /*NuClickHandler.handle(annotation).then((data) => {
            anno.removeAnnotation(annotation.id)
            removeAnnotation(annotation.id)

            if (data) {
              anno.addAnnotation(data)
              saveAnnotation(data)
              AnnotoriousHandler.instance(preview).showPreview(data)
            }
          })*/
        }
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

      anno.on('cancelSelected', (annotation: TAnnotation) => {
        console.log('cancelSelected')
        AnnotoriousHandler.highlightNode(annotation, 'off')
        deselectAnnotations()
      })

      anno.on(
        'mouseEnterAnnotation',
        (annotation: TAnnotation, element: HTMLElement) => {
          console.log('mouseEnterAnnotation')

          AnnotoriousHandler.highlightNode(annotation, 'on')

          const status = element.getAttribute('data-status')
          const editability = element.getAttribute('data-editability')
          const visibility = element.getAttribute('data-visibility')

          if (
            status === 'generating' ||
            editability === 'locked' ||
            visibility === 'hidden'
          ) {
            anno.disableSelect = true
          }
        }
      )

      anno.on('mouseLeaveAnnotation', (annotation: TAnnotation) => {
        console.log('mouseLeaveAnnotation')

        AnnotoriousHandler.highlightNode(annotation, 'off')

        anno.disableSelect = false
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
