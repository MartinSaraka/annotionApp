import { gql } from '@apollo/client'

import type { User } from '@common/types/datamodel'

export type TLoginData = {
  User: User
  csrfToken: string
}

export default gql`
  mutation login($email: String!) {
    login(email: $email) {
      User {
        email
        firstName
        lastName
      }
      csrfToken
    }
  }
`
