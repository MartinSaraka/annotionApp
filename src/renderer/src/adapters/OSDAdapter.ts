import { BBoxOrigin } from '@common/types/aiService'
import { TImageInfo } from '@common/types/image'

class OSDAdapter {
  static fromInfoToTileSources(metadata: TImageInfo): TOSDTileSourceOptions {
    const uri = import.meta.env.RENDERER_VITE_SERVICE_URI.concat(
      window.electron.process.platform === 'win32' ? '/' : ''
    )

    const path = `${uri}${metadata.directory}/${metadata.filename}`
    const tileSize = `&w=${metadata.tile.optimal.width}&h=${metadata.tile.optimal.height}`

    const options: TOSDTileSourceOptions = {
      width: metadata.size.width.pixel,
      height: metadata.size.height.pixel,
      tileWidth: metadata.tile.optimal.width,
      tileHeight: metadata.tile.optimal.height,
      minLevel: 2,
      maxLevel: metadata.levels,
      getTileUrl: (l, x, y) =>
        `${path}${metadata.extension}?z=${l}&x=${x}&y=${y}${tileSize}`
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
    // TODO: implement magnification
    console.log('IMPLEMENT magnification: ', magnification)

    const path = `${metadata.directory}/${metadata.filename}`
    const props = `?x=${pointX}&y=${pointY}&w=${sizeWidth}&h=${sizeHeight}&t=${origin}`

    return `${path}${metadata.extension}${props}`
  }
}

export default OSDAdapter
