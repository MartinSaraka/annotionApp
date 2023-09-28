import { gql } from '@apollo/client'

export type TImageMetadataVariables = {
  path: TPath
}

export type TImageMetadata = {
  path: TPath
  fillColor: number
  pixelsPerMeter: {
    x: number
    y: number
    avg: number
  }
  magnification: number
  size: {
    c: number
    t: number
    z: number
    width: {
      micro: number
      pixel: number
    }
    height: {
      micro: number
      pixel: number
    }
  }
  fileSize: {
    compressed: number
    uncompressed: number
  }
  format: string
  tile: {
    optimal: {
      width: number
      height: number
    }
  }
  domains: string[]
  resolution: number
  pixel: {
    width: {
      micro: number
      pixel: number
    }
    height: {
      micro: number
      pixel: number
    }
    type: string
  }
  levels: number
}

export default gql`
  query getImageMetadata($path: String!) {
    metadata: getImageMetadata(path: $path)
      @rest(type: "TImageMetadata", path: "/metadata{args.path}") {
      path
      fillColor
      pixelsPerMeter {
        x
        y
        avg
      }
      magnification
      size {
        c
        t
        z
        width {
          micro
          pixel
        }
        height {
          micro
          pixel
        }
      }
      fileSize {
        compressed
        uncompressed
      }
      format
      tile {
        optimal {
          width
          height
        }
      }
      domains
      resolution
      pixel {
        width {
          micro
          pixel
        }
        height {
          micro
          pixel
        }
        type
      }
      levels
    }
  }
`
