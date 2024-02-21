import { gql } from '@apollo/client'

import type { User } from '@common/types/datamodel'

export type TAuthData = {
  User: User
  accessToken: string
}

export default gql`
  mutation auth($csrfToken: String!, $identityToken: String!) {
    auth(csrfToken: $csrfToken, identityToken: $identityToken) {
      User {
        id
        email
        firstName
        lastName
      }
      accessToken
    }
  }
`
