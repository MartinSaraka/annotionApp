import * as ScrollArea from '@radix-ui/react-scroll-area'

import { styled } from '@renderer/styles'

export const ScrollAreaViewport = styled(ScrollArea.Viewport, {
  width: '100%',
  height: '100%',

  position: 'relative',

  '&[data-orientation="vertical"]': {
    '& > div': {
      flexDirection: 'column',
      height: '100%'
    }
  },

  '&[data-orientation="horizontal"]': {
    paddingInline: '$2'
  },

  '& > div': {
    display: 'flex !important'
  }
})

export const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar, {
  display: 'flex',

  transition: 'background 160ms ease-out',

  userSelect: 'none',
  touchAction: 'none',

  top: 'calc(100% + 2px)',
  zIndex: '$upper',

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

export const ScrollAreaRoot = styled(ScrollArea.Root, {
  $$scrollbarSize: '10px',
  $$maxHeight: 'initial',

  position: 'relative',
  whiteSpace: 'nowrap',

  width: '100%',
  height: '100%',

  [`${ScrollAreaViewport}`]: {
    maxHeight: '$$maxHeight'
  },

  '&:before, &:after': {
    display: 'none',
    content: '',

    height: 16,
    zIndex: '$up',

    position: 'absolute',
    inset: 0,

    pointerEvents: 'none',
    background: 'linear-gradient(180deg, $dark1 0%, transparent 100%)'
  },

  '&:before': {
    bottom: 'auto'
  },

  '&:after': {
    transform: 'rotate(180deg)',
    top: 'auto'
  },

  variants: {
    fade: {
      true: {
        '&:before, &:after': {
          display: 'block'
        },

        [`${ScrollAreaScrollbar}`]: {
          marginBlock: '$4'
        }
      }
    },

    noOverflow: {
      true: {
        [`${ScrollAreaViewport}`]: {
          overflow: 'visible !important'
        }
      }
    }
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
