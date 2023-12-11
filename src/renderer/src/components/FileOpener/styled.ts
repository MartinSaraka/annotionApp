import { styled } from '@renderer/styles'

export const Wrapper = styled('div', {
  borderWidth: '$1',
  borderStyle: '$dashed',
  borderRadius: '$3',
  height: 280,

  '&:hover, &:focus, &:focus-within, .hover': {
    borderColor: '$blue2',

    '& > label': {
      _bgAlpha: ['$blue2', '80']
    }
  },

  variants: {
    variant: {
      idle: {
        borderColor: '$dark5'
      },

      loading: {
        borderColor: '$dark3',

        '& > label': {
          _bgAlpha: ['$dark2', '80']
        }
      },

      error: {
        borderColor: '$crimson4',
        color: '$crimson4',

        '& > label': {
          _bgAlpha: ['$crimson4', '80']
        }
      }
    }
  }
})

export const Dropzone = styled('label', {
  display: 'flex',
  flexDirection: 'column',

  cursor: 'pointer',
  gap: '$3',

  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  height: '100%',

  padding: '$8'
})
