import { styled } from '@renderer/styles'

export const Root = styled('article', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  cursor: 'pointer',

  paddingInline: '$3',
  paddingBlock: '$2',

  backgroundColor: '$dark2',
  borderRadius: '$5',

  borderWidth: '$1',
  borderStyle: '$solid',
  borderColor: '$dark2',

  '&:hover': {
    borderColor: '$dark3'
  },

  variants: {
    active: {
      true: {
        cursor: 'progress'
      }
    }
  }
})

export const Content = styled('header', {
  display: 'flex',
  flexDirection: 'column'
})
