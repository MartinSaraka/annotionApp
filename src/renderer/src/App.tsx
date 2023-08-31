import { Navigate, useRoutes } from 'react-router-dom'

import { globalStyles } from '@renderer/styles'

import routes from '@renderer/config/routes'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import '@recogito/annotorious-openseadragon/dist/annotorious.min.css'

globalStyles()

const App = (): JSX.Element =>
  useRoutes([
    ...routes,
    {
      path: '*', // "No Match" route
      element: <Navigate to="/" />
    }
  ]) as React.ReactElement

export default App
