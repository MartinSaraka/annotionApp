import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { RestLink } from 'apollo-link-rest'

const serviceRestLink = new RestLink({
  uri: import.meta.env.RENDERER_VITE_SERVICE_URI
})

const apiGraphqlLink = new HttpLink({
  uri: import.meta.env.RENDERER_VITE_API_URI
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([serviceRestLink, apiGraphqlLink])
})

export default client
