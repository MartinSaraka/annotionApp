import { styled } from '@renderer/styles'

export const Root = styled('section', {
  display: 'flex',
  flexDirection: 'column',

  gap: '$2',

  paddingTop: '$2',
  paddingInline: '$4',
  paddingBottom: '$2',

  borderBottomWidth: '$1',
  borderBottomStyle: '$solid',
  borderBottomColor: '$dark3'
})

export const Image = styled('img', {
  display: 'flex',
  width: '100%',

  overflow: 'hidden',
  borderRadius: '$7',

  canvas: {
    width: '100%'
  }
})
