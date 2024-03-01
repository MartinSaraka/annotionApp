import { gql } from '@apollo/client'

import type { Image } from '@common/types/datamodel'

export type TGetImageData = {
  image: Image
}

export default gql`
  query getImage($id: ID!) {
    image: getImage(id: $id) {
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
      createdAt
      updatedAt
    }
  }
`
