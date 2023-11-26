export enum BBoxOrigin {
  TOP_LEFT = 0,
  CENTER_CENTER = 1
}

export type TKeypoint = {
  x: number
  y: number
}

export type TBoundingBox = {
  x: number
  y: number
  width: number
  height: number
}

export type TOffset = {
  x: number
  y: number
}

// NC
export type TNuClickBody = {
  image: string
  keypoints: TKeypoint[]
  offset: TOffset
}

export type TNuClickResponse = {
  segmented_nuclei: TKeypoint[][]
}

// Common
export type TAiError = {
  detail: {
    loc: (string | number)[]
    msg: string
    type: string
  }[]
}
