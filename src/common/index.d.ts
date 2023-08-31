import OpenSeadragon from 'openseadragon'

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
  }
}

declare global {
  type TID = string
  type TPath = string

  // OpenSeadragon

  type TOSDViewer = OpenSeadragon.Viewer
  type TOSDOptions = OpenSeadragon.Options
  type TOSDTileSourceOptions = OpenSeadragon.TileSourceOptions

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
