import OpenSeadragon from 'openseadragon'
import OpenSeadragonImagingHelper from '@openseadragon-imaging/openseadragon-imaginghelper'

import Annotorious from '@recogito/annotorious-openseadragon'

import { flattenTree } from 'react-accessible-treeview'
import { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils'

declare module 'openseadragon' {
  interface Viewer {
    /**
     * OpenSeadragon Scalebar plugin
     * @see /renderer/lib/openseadragon-scalebar.js
     */
    scalebar: (...args: unknown[]) => void
    /**
     * OpenSeadragon Smart Scroll Zoom plugin
     * @see /renderer/lib/openseadragon-smart-scroll-zoom.js
     */
    smartScrollZoom: (...args: unknown[]) => void

    gestureSettingsMouse: {
      clickToZoom: boolean
    }
  }
}

declare global {
  type TID = string
  type TPath = string

  // OpenSeadragon
  type TOSDViewer = OpenSeadragon.Viewer
  type TOSDOptions = OpenSeadragon.Options
  type TOSDTileSourceOptions = OpenSeadragon.TileSourceOptions

  // OpenSeadragon Helper
  type TOSDHelper = typeof OpenSeadragonImagingHelper

  // Annotorious
  type TAnno = typeof Annotorious

  // React Accessible TreeView
  type TRATNodes<TMetadata extends IFlatMetadata> = Parameters<
    typeof flattenTree<TMetadata>
  >[0]

  // Common

  type TEntries<T> = {
    [K in keyof T]: [K, T[K]]
  }[keyof T][]

  type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

  type ExpandRecursively<T> = T extends object
    ? T extends infer O
      ? { [K in keyof O]: ExpandRecursively<O[K]> }
      : never
    : T
}

export {}
