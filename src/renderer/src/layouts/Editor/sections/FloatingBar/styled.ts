import { styled } from '@renderer/styles'

export const Root = styled('section', {
  position: 'absolute',
  inset: '$1',
  bottom: 'auto',

  zIndex: '$up',

  display: 'flex',
  flexDirection: 'row',

  justifyContent: 'center',
  alignItems: 'stretch'
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'row',

  backgroundColor: '$dark1',
  padding: '$2',

  borderWidth: '$1',
  borderStyle: '$solid',
  borderColor: '$dark3',
  borderRadius: '$9'
})
