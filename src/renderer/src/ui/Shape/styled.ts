import { styled } from '@renderer/styles'

export const Root = styled('svg', {
  position: 'relative',
  overflow: 'visible'
})

export const Element = styled('path', {
  position: 'relative',
  fill: 'transparent',

  stroke: '$light',
  strokeWidth: '1px'
})
