import { TKeypoint, TOffset } from './global'

export enum BBoxOrigin {
  TOP_LEFT = 0,
  CENTER_CENTER = 1
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
