import { styled } from '@renderer/styles'

export const Dropzone = styled('label', {
  display: 'flex',
  flexDirection: 'column',

  cursor: 'pointer',
  gap: '$1',

  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  height: '100%',

  padding: '$15'
})
