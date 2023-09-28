import { ApolloProvider } from '@apollo/client'
import { createRoot } from 'react-dom/client'

import App from './App'
import client from './apollo'

import { Default } from './layouts'
import { Toasts } from '@renderer/components'

import '@renderer/i18n/config'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container!)

import OpenSeadragon from 'openseadragon'
window.OpenSeadragon = OpenSeadragon

root.render(
  <ApolloProvider client={client}>
    <Default>
      <App />
    </Default>

    <Toasts />
  </ApolloProvider>
)
