import { useCallback, useEffect, useState } from 'react'
import OpenSeadragon from 'openseadragon'

import OpenSeadragonImagingHelper from '@openseadragon-imaging/openseadragon-imaginghelper'

import { OSDAdapter } from '@renderer/adapters'

import { TImageInfo } from '@common/types/image'
import { OPEN_SEA_DRAGON_DEFAULT_OPTIONS } from '@common/constants/viewer'

import '@renderer/lib/openseadragon-scalebar.js'
import '@renderer/lib/openseadragon-smart-scroll-zoom.js'

type TViewer = {
  osd: TOSDViewer | null
  helper: typeof OpenSeadragonImagingHelper | null
}

export type TUseViewer = {
  viewer: TViewer
  close: () => void
}

const DEFAULT_VIEWER_STATE: TViewer = {
  osd: null,
  helper: null
}

const useViewer = (source: TImageInfo, options?: TOSDOptions): TUseViewer => {
  const [viewer, setViewer] =
    useState<TUseViewer['viewer']>(DEFAULT_VIEWER_STATE)

  useEffect(() => {
    close()

    const tileSources = OSDAdapter.fromInfoToTileSources(source)

    const openseadragon = OpenSeadragon({
      ...OPEN_SEA_DRAGON_DEFAULT_OPTIONS,
      ...options,
      tileSources
    })

    /**
     * Register OpenSeadragon Scalebar plugin
     * @see /renderer/lib/openseadragon-scalebar.js
     */
    openseadragon.scalebar({
      pixelsPerMeter: source.pixelsPerMeter,
      stayInsideImage: false
    })

    /**
     * Register OpenSeadragon Smart Scroll Zoom plugin
     * @see /renderer/lib/openseadragon-smart-scroll-zoom.js
     */
    openseadragon.smartScrollZoom({
      enabled: true
    })

    const imaginghelper = new OpenSeadragonImagingHelper({
      viewer: openseadragon
    })

    setViewer({
      osd: openseadragon,
      helper: imaginghelper
    })

    return close
  }, [source])

  const close = useCallback(() => {
    if (viewer.osd) {
      viewer.osd.destroy()
      setViewer(DEFAULT_VIEWER_STATE)
    }
  }, [viewer])

  return { viewer, close }
}

export default useViewer
