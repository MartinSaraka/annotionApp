import { styled } from '@renderer/styles'

export const Root = styled('aside', {
  position: 'relative',

  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  height: '100%',

  backgroundColor: '$dark1',

  borderLeftWidth: '$1',
  borderLeftColor: '$dark3',
  borderLeftStyle: 'solid'
})

export const Inner = styled('div', {
  position: 'relative',

  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  height: '100%'
})
