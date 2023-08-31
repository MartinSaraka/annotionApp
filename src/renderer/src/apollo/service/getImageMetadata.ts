import { gql } from '@apollo/client'

export type TImageMetadataVariables = {
  path: TPath
}

export type TImageMetadata = {
  path: TPath
  width: number
  height: number
  levels: number
  format: string
  tileWidth: number
  tileHeight: number
  pixelsPerMeterX: number
  pixelsPerMeterY: number
  pixelsPerMeter: number
}

export default gql`
  query getImageMetadata($path: String!) {
    metadata: getImageMetadata(path: $path)
      @rest(type: "TImageMetadata", path: "/metadata{args.path}") {
      path
      width
      height
      levels
      format
      tileWidth
      tileHeight
      pixelsPerMeterX
      pixelsPerMeterY
      pixelsPerMeter
    }
  }
`
