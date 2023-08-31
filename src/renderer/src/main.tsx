import { ApolloProvider } from '@apollo/client'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from './App'
import client from './apollo'

import { Toasts } from '@renderer/components'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container!)

root.render(
  <ApolloProvider client={client}>
    <HashRouter>
      <App />

      <Toasts />
    </HashRouter>
  </ApolloProvider>
)
