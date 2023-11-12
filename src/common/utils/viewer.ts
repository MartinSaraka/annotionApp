import { Property } from '@stitches/react/types/css'

import { setGlobalCssVariable } from './global'

export const setHighlightedNode = (id: TID) =>
  setGlobalCssVariable('--highlighted-node', id)

export const setViewerCursor = (cursor: Property.Cursor) =>
  setGlobalCssVariable('--cursor-viewer', cursor)

export const setAnnotationCursor = (cursor: Property.Cursor) =>
  setGlobalCssVariable('--cursor-annotation', cursor)
