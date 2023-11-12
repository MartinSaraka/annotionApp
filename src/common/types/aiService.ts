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

export type TNuClickBody = {
  image: string
  keypoints: TKeypoint[]
  offset: TOffset
}

export type TNuClickResponse = {
  segmented_nuclei: TKeypoint[][]
}

export type TMitoticCountBody = {
  image: string
  offset: TOffset
}

export type TMitoticCountResponse = {
  mitosis: {
    bbox: TBoundingBox
    confidence: number
    label: string
  }[]
}

export type TAiError = {
  detail: {
    loc: (string | number)[]
    msg: string
    type: string
  }[]
}
