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

  border: '2px dashed $colors$gray7',
  borderRadius: '$4',

  backgroundColor: '$gray2'
})
