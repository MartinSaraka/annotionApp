import { TImageInfo } from '@common/types/image'

class OSDAdapter {
  static fromInfoToTileSources(metadata: TImageInfo): TOSDTileSourceOptions {
    const uri = import.meta.env.RENDERER_VITE_SERVICE_URI

    const path = `${uri}${metadata.directory}/${metadata.filename}`
    const tileSize = `${metadata.tile.optimal.width}-${metadata.tile.optimal.height}`

    const options: TOSDTileSourceOptions = {
      width: metadata.size.width.pixel,
      height: metadata.size.height.pixel,
      tileWidth: metadata.tile.optimal.width,
      tileHeight: metadata.tile.optimal.height,
      minLevel: 1,
      maxLevel: metadata.levels,
      getTileUrl: (l, x, y) =>
        `${path}-${l}-${x}-${y}-${tileSize}${metadata.extension}`
    }

    return options
  }
}

export default OSDAdapter
