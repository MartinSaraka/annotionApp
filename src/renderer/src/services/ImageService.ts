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
    const path = filePath.replace(/^\//, '')

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
      throw new Error('METADATA_ERROR')
    }
  }

  static getCroppedImage = async (
    filePath: TPath
  ): Promise<TImageCropped | null> => {
    try {
      const path = filePath.replace(/^\//, '')

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
