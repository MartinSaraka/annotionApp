import type { RouteObject } from 'react-router'

import { Default } from '@renderer/layouts'

import { Home } from '@renderer/pages'

const routes: RouteObject[] = [
  {
    path: '',
    element: <Default />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
]

export default routes
