import { gql } from '@apollo/client'

export type TApiHealth = boolean

export default gql`
  query getApiHealth {
    getApiHealth
  }
`
