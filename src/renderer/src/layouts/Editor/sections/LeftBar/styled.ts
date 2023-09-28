import { styled } from '@renderer/styles'

export const Root = styled('aside', {
  position: 'relative',

  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  height: '100%',

  backgroundColor: '$dark1',

  borderRightWidth: '$1',
  borderRightColor: '$dark3',
  borderRightStyle: 'solid'
})
