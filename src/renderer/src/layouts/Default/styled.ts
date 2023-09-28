import { styled } from '@renderer/styles'

export const Root = styled('main', {
  position: 'relative',

  display: 'flex',
  flexDirection: 'column',

  width: '100vw',
  height: '100vh',

  isolation: 'isolate'
})
