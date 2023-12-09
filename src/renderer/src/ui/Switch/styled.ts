import { styled } from '@renderer/styles'

import * as Switch from '@radix-ui/react-switch'

export const Thumb = styled(Switch.Thumb, {
  display: 'block',
  backgroundColor: '$light',
  borderRadius: '$pill',

  transition: 'transform 100ms',
  willChange: 'transform'
})

export const Root = styled(Switch.Root, {
  $$size: '14px',

  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,

  position: 'relative',
  borderRadius: '$pill',

  padding: 2,
  width: 'calc($$size * 2 + 6px)',

  backgroundColor: '$dark3',
  borderColor: '$dark2',

  borderWidth: '$1',
  borderStyle: '$solid',

  '&[data-state="checked"]': {
    backgroundColor: '$blue1',
    borderColor: '$blue1'
  },

  '&:hover': {
    borderColor: '$dark5',

    '&[data-state="checked"]': {
      borderColor: '$blue2'
    }
  },

  '&:focus': {
    boxShadow: '0 0 0 2px black'
  },

  [`${Thumb}`]: {
    width: '$$size',
    height: '$$size',

    '&[data-state="checked"]': {
      transform: 'translateX($$size)'
    }
  }
})
