import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { RestLink } from 'apollo-link-rest'

import { useAuthStore } from '@renderer/store'
import { getAuthorization } from '@common/utils/auth'

const serviceRestLink = new RestLink({
  uri: import.meta.env.RENDERER_VITE_SERVICE_URI
})

const apiGraphqlLink = new HttpLink({
  uri: import.meta.env.RENDERER_VITE_API_URI
})

const errorLink = onError(({ networkError }) => {
  const error = networkError as TNetworkError

  if (error?.statusCode === 401) {
    // remove access token from store
    window.api.deleteAccessToken()

    // clear apollo cache
    client.clearStore()

    // deauthenticate user from app
    useAuthStore.getState().deauthenticate()
  }
})

const authLink = setContext(async (_, { headers }) => {
  // get access token from store
  const { accessToken } = await window.api.getAccessToken()

  // set access token in headers
  return {
    headers: {
      ...headers,
      authorization: getAuthorization(accessToken)
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([serviceRestLink, errorLink, authLink, apiGraphqlLink])
})

export default client
