import { Layout, ResponsiveProps } from 'react-grid-layout'

export const GRID_LAYOUT_DRAGGABLE_HANDLE_CLASS = 'rgl-draggable-handle'

export const GRID_LAYOUT_DEFAULT_OPTIONS: Partial<ResponsiveProps> = {
  isBounded: true,
  isResizable: true,
  preventCollision: true,
  autoSize: false,
  compactType: null,

  draggableHandle: `.${GRID_LAYOUT_DRAGGABLE_HANDLE_CLASS}`,

  width: 1212,
  margin: [12, 12],

  rowHeight: 48,
  cols: { default: 20 },

  breakpoint: 'default',
  breakpoints: { default: 1920 }
}

export enum ERGLItem {
  MAIN_TOOLBAR = 'rgl-main-toolbar',
  MINIMAP = 'rgl-minimap'
}

export const GRID_LAYOUT_DEFAULT_ITEMS_LAYOUT: Record<ERGLItem, Layout> = {
  [ERGLItem.MAIN_TOOLBAR]: {
    x: 0,
    y: 0,
    w: 1,
    h: 8,
    i: ERGLItem.MAIN_TOOLBAR
  },
  [ERGLItem.MINIMAP]: {
    x: 14,
    y: 0,
    w: 2,
    h: 2,
    i: ERGLItem.MINIMAP
  }
}

export const GRID_LAYOUT_DEFAULT_LAYOUT: Layout[] = [
  GRID_LAYOUT_DEFAULT_ITEMS_LAYOUT[ERGLItem.MAIN_TOOLBAR],
  GRID_LAYOUT_DEFAULT_ITEMS_LAYOUT[ERGLItem.MINIMAP]
]
