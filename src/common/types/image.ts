export type TFileInfo = {
  path: string
  directory: string
  filename: string
  extension: string
  format: string
}

export type TImageInfo = TFileInfo & {
  width: number
  height: number
  levels?: number
  tileWidth: number
  tileHeight: number
  pixelsPerMeter: number
}
