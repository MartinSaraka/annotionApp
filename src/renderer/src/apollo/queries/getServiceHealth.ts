import { gql } from '@apollo/client'

export type TServiceHealth = boolean

export default gql`
  query getServiceHealth {
    health: getServiceHealth @rest(type: "TServiceHealth", path: "/") {
      health
      rger
    }
  }
`
