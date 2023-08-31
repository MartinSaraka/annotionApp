import { TImageInfo } from '@common/types/image'

class OSDAdapter {
  static fromInfoToTileSources(metadata: TImageInfo): TOSDTileSourceOptions {
    const uri = import.meta.env.RENDERER_VITE_SERVICE_URI

    const path = `${uri}${metadata.directory}/${metadata.filename}`
    const tileSize = `${metadata.tileWidth}-${metadata.tileHeight}`

    const options: TOSDTileSourceOptions = {
      width: metadata.width,
      height: metadata.height,
      tileWidth: metadata.tileWidth,
      tileHeight: metadata.tileHeight,
      minLevel: 1,
      maxLevel: metadata.levels,
      getTileUrl: (l, x, y) =>
        `${path}-${l}-${x}-${y}-${tileSize}${metadata.extension}`
    }

    return options
  }
}

export default OSDAdapter
