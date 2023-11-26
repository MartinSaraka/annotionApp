import { BBoxOrigin } from '@common/types/aiService'
import { TImageInfo } from '@common/types/image'

class OSDAdapter {
  static fromInfoToTileSources(metadata: TImageInfo): TOSDTileSourceOptions {
    const uri = import.meta.env.RENDERER_VITE_SERVICE_URI.concat(
      window.electron.process.platform === 'win32' ? '/' : ''
    )

    const path = `${uri}${metadata.directory}/${metadata.filename}`
    const tileSize = `${metadata.tile.optimal.width}-${metadata.tile.optimal.height}`

    const options: TOSDTileSourceOptions = {
      width: metadata.size.width.pixel,
      height: metadata.size.height.pixel,
      tileWidth: metadata.tile.optimal.width,
      tileHeight: metadata.tile.optimal.height,
      minLevel: 2,
      maxLevel: metadata.levels,
      getTileUrl: (l, x, y) =>
        `${path}-${l}-${x}-${y}-${tileSize}${metadata.extension}`
    }

    return options
  }

  static fromInfoToCroppedSource(
    metadata: TImageInfo,
    pointX: number,
    pointY: number,
    sizeWidth: number,
    sizeHeight: number,
    origin: BBoxOrigin = BBoxOrigin.CENTER_CENTER,
    magnification = 40
  ): string {
    console.log('IMPLEMENT magnification: ', magnification)

    const path = `${metadata.directory}/${metadata.filename}`
    const props = `${pointX}-${pointY}-${sizeWidth}-${sizeHeight}-${origin}`

    return `${path}-${props}${metadata.extension}`
  }
}

export default OSDAdapter
