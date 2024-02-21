import { gql } from '@apollo/client'

import type { User } from '@common/types/datamodel'

export type TGetMeData = {
  me: User
}

export default gql`
  query getMe {
    me: getMe {
      id
      email
      firstName
      lastName
      institution
      position
    }
  }
`
