import { globalStyles } from '@renderer/styles'

import { Editor } from './layouts'
import { Dashboard, Empty, Image } from './pages'
import { useImageStore } from './store'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import '@recogito/annotorious-openseadragon/dist/annotorious.min.css'

globalStyles()

const App = () => {
  const activePage = useImageStore((state) => state.selected)

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
