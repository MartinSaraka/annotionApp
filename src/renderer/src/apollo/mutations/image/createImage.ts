import { gql } from '@apollo/client'

import type { Image } from '@common/types/datamodel'

export type TCreateImageData = {
  image: Image
}

export default gql`
  mutation createImage($data: CreateImageInput!) {
    image: createImage(data: $data) {
      id
      name
      description
      Metadata {
        id
        path
        hash
        directory
        filename
        extension
        format
      }
      User {
        id
      }
      Project {
        id
        name
        description
      }
    }
  }
`
