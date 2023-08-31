import { styled } from '@renderer/styles'

export const AddTabButton = styled('button', {
  display: 'inline-flex',
  flexDirection: 'column',

  flexShrink: 0,

  alignItems: 'center',
  justifyContent: 'center',

  padding: '$1',
  borderRadius: '$2',

  transition: 'all 0.1s ease',
  alignSelf: 'center',

  marginTop: '-$1',
  marginLeft: '$2',

  '&:hover': {
    color: '$light',
    _bgAlpha: ['$light', '80']
  }
})
