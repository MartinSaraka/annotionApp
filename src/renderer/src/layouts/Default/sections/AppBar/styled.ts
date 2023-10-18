import { styled } from '@renderer/styles'

export const Root = styled('nav', {
  position: 'relative',

  display: 'flex',
  flexDirection: 'row',

  alignItems: 'center',
  gap: '$4',

  width: '100vw',
  height: 42,

  backgroundColor: '$dark2',
  paddingInline: '$4',

  overflow: 'hidden',
  marginBottom: -1
})

export const Content = styled('div', {
  position: 'relative',

  display: 'flex',
  flexDirection: 'row',
  flex: 1,

  height: '100%',
  alignItems: 'flex-end'
})

export const Aside = styled('aside', {
  position: 'relative',

  display: 'flex',
  flexDirection: 'row',

  alignItems: 'center',
  gap: '$3'
})
