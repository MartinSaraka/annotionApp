export type TFileInfo = {
  path: string
  hash: string
  directory: string
  filename: string
  extension: string
  format: string
}

export type TImageInfo = TFileInfo & {
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
