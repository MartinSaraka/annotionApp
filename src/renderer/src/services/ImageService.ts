import client from '@renderer/apollo'

import {
  GET_IMAGE_METADATA,
  type TImageMetadataVariables,
  type TImageMetadata
} from '@renderer/apollo/service'

class ImageService {
  static getMetadata = async (path: TPath): Promise<TImageMetadata | null> => {
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
}

export default ImageService
