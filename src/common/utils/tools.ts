import { Property } from '@stitches/react/types/css'

import { ANNOTORIOUS_HOTKEY } from '@common/constants/annotations'
import { setViewerCursor } from './viewer'

export const setHotkeyViewerCursor =
  (
    cursor: Property.Cursor,
    hotkey: KeyboardEvent['key'] = ANNOTORIOUS_HOTKEY
  ) =>
  (e: KeyboardEvent) => {
    if (e.key === hotkey) setViewerCursor(cursor)
  }
