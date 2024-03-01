import { gql } from '@apollo/client'

import type { Image } from '@common/types/datamodel'

export type TUpdateImageData = {
  image: Image
}

export default gql`
  mutation updateImage($id: ID!, $data: UpdateImageInput!) {
    image: updateImage(id: $id, data: $data) {
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
