import { ApolloProvider } from '@apollo/client'
import { createRoot } from 'react-dom/client'
import { TooltipProvider } from '@radix-ui/react-tooltip'

import App from './App'
import client from './apollo'

import { Default } from './layouts'
import { Toasts } from '@renderer/components'
import { Smartlook } from '@renderer/components/recording'

import '@renderer/i18n/config'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container!)

import OpenSeadragon from 'openseadragon'
window.OpenSeadragon = OpenSeadragon

root.render(
  <ApolloProvider client={client}>
    <Smartlook />

    <TooltipProvider delayDuration={400}>
      <Default>
        <App />
      </Default>
    </TooltipProvider>

    <Toasts />
  </ApolloProvider>
)
