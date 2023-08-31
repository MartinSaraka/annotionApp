import { Property } from '@stitches/react/types/css'

import { setGlobalCssVariable } from './global'

export const setViewerCursor = (cursor: Property.Cursor) =>
  setGlobalCssVariable('--cursor-viewer', cursor)
