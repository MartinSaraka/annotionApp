import { styled } from '@renderer/styles'

export const HandleRoot = styled('div', {
  display: 'flex',
  flexShrink: 0,

  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    color: '$gray8',
    transition: 'color 0.1s ease-in-out'
  },

  '&:hover svg': {
    color: '$gray11'
  },

  // Reset default settings
  backgroundImage: 'none !important',
  padding: '$1 !important',
  width: 'auto !important',
  height: 'auto !important',

  '&:after': {
    display: 'none'
  }
})
