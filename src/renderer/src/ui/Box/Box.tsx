import { styled } from '@renderer/styles/theme'

const Box = styled('div', {
  display: 'flex',
  flexDirection: 'column', // Default to column
  position: 'relative',
  variants: {
    direction: {
      row: { flexDirection: 'row' },
      column: { flexDirection: 'column' }
    }
  }
})

export default Box
