import { styled } from '@renderer/styles'

import * as ContextMenu from '@radix-ui/react-context-menu'

export const Root = styled(ContextMenu.Root, {
  position: 'relative'
})

export const Trigger = styled(ContextMenu.Trigger, {
  '&[data-state="open"]': {
    outlineColor: '#0074FF',
    outlineOffset: 0,
    outlineStyle: 'solid',
    outlineWidth: 1
  }
})

export const Content = styled(ContextMenu.Content, {
  display: 'flex',
  flexDirection: 'column',

  minWidth: 220,

  backgroundColor: '$dark1',
  borderRadius: '6px',

  borderWidth: '$1',
  borderStyle: '$solid',
  borderColor: '$dark3',

  padding: '5px',

  boxShadow:
    '0px 10px 38px -10px rgba(33, 33, 52, 0.35), 0px 10px 20px -15px rgba(33, 33, 52, 0.2)'
})

export const Item = styled(ContextMenu.Item, {
  $$fg: '$colors$light',
  $$bg: '$colors$dark2',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  gap: '$2',
  padding: '$1',

  color: '$$fg',
  userSelect: 'none',

  borderRadius: '3px',
  fontWeight: 500,

  height: 25,
  paddingLeft: '25px',
  paddingRight: '5px',

  kbd: {
    fontSize: '$4',
    color: '$dark4'
  },

  '&[data-highlighted]': {
    backgroundColor: '$$bg',

    kbd: {
      color: '$fg'
    }
  }
})
