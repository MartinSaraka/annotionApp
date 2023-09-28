import { styled } from '@renderer/styles/theme'

const Text = styled('p', {
  '> *': {
    display: 'inline'
  },

  variants: {
    variant: {
      xxs: {
        fontWeight: 400,
        fontSize: '$1',
        lineHeight: '$1'
      },

      xs: {
        fontWeight: 400,
        fontSize: '$2',
        lineHeight: '$2'
      },

      sm: {
        fontWeight: 400,
        fontSize: '$3',
        lineHeight: '$3'
      },

      base: {
        fontWeight: 400,
        fontSize: '$4',
        lineHeight: '$4'
      },

      md: {
        fontWeight: 400,
        fontSize: '$5',
        lineHeight: '$5'
      },

      lg: {
        fontWeight: 400,
        fontSize: '$6',
        lineHeight: '$6'
      },

      xl: {
        fontWeight: 400,
        fontSize: '$7',
        lineHeight: '$7'
      },

      '2xl': {
        fontWeight: 400,
        fontSize: '$8',
        lineHeight: '$8'
      },

      '3xl': {
        fontWeight: 400,
        fontSize: '$9',
        lineHeight: '$9'
      },

      '4xl': {
        fontWeight: 400,
        fontSize: '$10',
        lineHeight: '$10'
      },

      '5xl': {
        fontWeight: 400,
        fontSize: '$11',
        lineHeight: '$11'
      },

      '6xl': {
        fontWeight: 400,
        fontSize: '$12',
        lineHeight: '$12'
      }
    },
    capital: {
      true: {
        '&::first-letter': {
          textTransform: 'capitalize'
        }
      }
    }
  },

  defaultVariants: {
    variant: 'base'
  }
})

export default Text
