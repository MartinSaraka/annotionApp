import * as ScrollArea from '@radix-ui/react-scroll-area'

import { styled } from '@renderer/styles'

export const ScrollAreaRoot = styled(ScrollArea.Root, {
  $$scrollbarSize: '10px',

  whiteSpace: 'nowrap',

  width: '100%',
  height: '100%'
})

export const ScrollAreaViewport = styled(ScrollArea.Viewport, {
  width: '100%',
  height: '100%'
})

export const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar, {
  display: 'flex',

  transition: 'background 160ms ease-out',

  userSelect: 'none',
  touchAction: 'none',

  top: 'calc(100% + 2px)',

  "&[data-orientation='vertical']": {
    width: '$$scrollbarSize',
    paddingInline: 'calc($1 - 2px)',
    cursor: 'ns-resize'
  },

  "&[data-orientation='horizontal']": {
    height: '$$scrollbarSize',
    flexDirection: 'column',
    paddingBlock: 'calc($1 - 2px)',
    cursor: 'ew-resize'
  }
})

export const ScrollAreaThumb = styled(ScrollArea.Thumb, {
  position: 'relative',

  flex: 1,
  transition: 'background 160ms ease-out',

  borderRadius: '$$scrollbarSize',
  _bgAlpha: ['$light', '80'],

  '&:before': {
    content: '',
    position: 'absolute',
    inset: '-$1'
  },

  '&:hover': {
    backgroundColor: '$light'
  }
})
