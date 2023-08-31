import { KeyboardEvent } from 'react'

export const ANNOTORIOUS_HOTKEY: KeyboardEvent['code'] = 'Shift'

export const ANNOTORIOUS_DEFAULT_CONFIG = {
  allowEmpty: true,
  drawOnSingleClick: true,
  disableEditor: true,

  hotkey: {
    key: ANNOTORIOUS_HOTKEY,
    inverted: true
  },

  widgets: ['COMMENT', 'TAG']
} as const
