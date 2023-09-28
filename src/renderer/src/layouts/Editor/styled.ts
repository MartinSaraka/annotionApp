import { styled } from '@renderer/styles'

export const Root = styled('section', {
  position: 'relative',

  display: 'flex',
  flexDirection: 'column',

  flex: 1,
  overflow: 'hidden'
})

export const Wrapper = styled('div', {
  position: 'relative',

  display: 'flex',
  flexDirection: 'row',

  flex: 1,
  overflow: 'hidden'
})

export const Content = styled('article', {
  position: 'relative',

  display: 'flex',
  flexDirection: 'column',

  flex: 1,
  overflow: 'hidden',

  isolation: 'isolate'
})
