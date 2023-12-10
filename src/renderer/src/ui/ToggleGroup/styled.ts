import { styled } from '@renderer/styles'

import * as ToggleGroup from '@radix-ui/react-toggle-group'

export const Root = styled(ToggleGroup.Root, {
  display: 'flex',
  marginRight: '-5px',

  alignItems: 'center',
  justifyContent: 'center',

  '&[data-orientation="vertical"]': {
    flexDirection: 'column'
  },

  '&[data-orientation="horizontal"]': {
    flexDirection: 'row'
  }
})

export const Item = styled(ToggleGroup.Item, {
  position: 'relative',
  display: 'inline-flex',
  flexShrink: 0,

  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: '$5',
  padding: 'calc($1 + 1px)',

  color: '$dark4',

  '&[data-state="on"]': {
    color: '$light'
  },

  '&:disabled': {
    color: '$dark4',
    cursor: 'not-allowed'
  }
})
