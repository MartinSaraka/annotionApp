import client from '@renderer/apollo'

import {
  GET_IMAGE_METADATA,
  type TImageMetadataVariables,
  type TImageMetadata,
  GET_IMAGE_CROPPED,
  type TImageCropped,
  type TImageCroppedVariables
} from '@renderer/apollo/service'

class ImageService {
  static getMetadata = async (
    filePath: TPath
  ): Promise<TImageMetadata | null> => {
    const normalized = filePath.replace(/^\//, '')
    const path = `//${normalized}`

    try {
      const { data } = await client.query<
        { metadata: TImageMetadata },
        TImageMetadataVariables
      >({
        query: GET_IMAGE_METADATA,
        variables: { path }
      })

      return data?.metadata
    } catch {
      console.error(this.toString(), new Error('Unable to get metadata'))
      return null
    }
  }

  static getCroppedImage = async (
    filePath: TPath
  ): Promise<TImageCropped | null> => {
    try {
      const normalized = filePath.replace(/^\//, '')
      const path = `//${normalized}`

      const { data } = await client.query<
        { cropped: TImageCropped },
        TImageCroppedVariables
      >({
        query: GET_IMAGE_CROPPED,
        variables: { path }
      })

      return data?.cropped
    } catch {
      console.error(this.toString(), new Error('Unable to get cropped image'))
      return null
    }
  }
}

export default ImageService
