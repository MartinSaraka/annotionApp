import { gql } from '@apollo/client'

export type TImageCroppedVariables = {
  path: TPath
}

export type TImageCropped = {
  base64Image: string
  width: number
  height: number
  x: number
  y: number
}

export default gql`
  query getImageCropped($path: String!) {
    cropped: getImageCropped(path: $path)
      @rest(type: "TImageCropped", path: "/crop/{args.path}") {
      base64Image
      width
      height
      x
      y
    }
  }
`
