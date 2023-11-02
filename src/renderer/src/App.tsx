import Smartlook from 'smartlook-client'

import { Editor } from './layouts'
import { Dashboard, Empty, Image } from './pages'
import { useImageStore } from './store'
import { useDidMount } from './hooks'

import { globalStyles } from '@renderer/styles'
import '@recogito/annotorious-openseadragon/dist/annotorious.min.css'

globalStyles()

const App = () => {
  const activePage = useImageStore((state) => state.selected)

  useDidMount(() => {
    if (!import.meta.env.PROD) return

    console.info('Smartlook initialized')

    Smartlook.init(import.meta.env.RENDERER_VITE_SMARTLOOK_KEY, {
      region: 'eu'
    })
  })

  if (activePage === 'dashboard') {
    return <Dashboard />
  }

  if (activePage === 'empty') {
    return <Empty />
  }

  return (
    <Editor>
      <Image />
    </Editor>
  )
}

export default App
