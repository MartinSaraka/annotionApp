import { ETool } from './tools'

// Meta key is mapped to Command on Mac and to Ctrl on Windows

export const HOTKEYS = {
  fitToScreen: ['0'],
  tools: {
    [ETool.HAND]: ['H'],
    [ETool.ZOOM_IN]: ['Z'],
    [ETool.RECTANGLE]: ['1'],
    [ETool.CIRCLE]: ['2'],
    [ETool.ELLIPSE]: ['3'],
    [ETool.POLYGON]: ['4'],
    [ETool.POINT]: ['5'],
    [ETool.FREEHAND]: ['6'],
    [ETool.NUCLICK_POINT]: ['7']
  },
  search: ['Meta', 'F'],
  editability: ['Ctrl', 'L'],
  visibility: ['Ctrl', 'H'],
  delete: ['Backspace'],
  viewer: ['Shift']
} as const
