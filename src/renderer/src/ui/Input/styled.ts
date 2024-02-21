import { motion } from 'framer-motion'

import { styled } from '@renderer/styles'

export const InputRoot = styled(motion.div, {
  position: 'relative',

  display: 'inline-flex',
  flexDirection: 'row',

  flexShrink: 0,

  paddingBlock: 'calc($1 + 2px)',

  backgroundColor: '$dark2',
  borderWidth: '$1',
  borderStyle: '$solid',
  borderColor: 'transparent',

  '&:focus-within': {
    borderColor: '$blue1'
  },

  '&:hover:not(:focus-within)': {
    borderColor: '$dark3'
  },

  variants: {
    size: {
      small: {
        borderRadius: '$5',
        fontSize: '$4',
        paddingInline: 'calc($2 + 2px)',
        gap: 'calc($1 - 2px)'
      },
      big: {
        borderRadius: '$7',
        fontSize: '$5',
        paddingInline: '$2'
      },
      giant: {
        borderRadius: '$6',
        fontSize: '$6',
        paddingInline: '$4',
        paddingBlock: '$4'
      }
    },
    square: {
      true: {
        maxWidth: 30,
        aspectRatio: 1,
        padding: 0,
        overflow: 'hidden',

        input: {
          padding: 0
        },

        'input[type="color"]': {
          cursor: 'pointer',
          transform: 'scale(2)'
        }
      }
    }
  },

  defaultVariants: {
    size: 'small'
  }
})

export const TextAreaRoot = styled(motion.textarea, {
  position: 'relative',
  width: '100%',
  height: 'auto',

  display: 'inline-flex',
  flexDirection: 'row',

  flex: 1,
  flexShrink: 0,

  overflow: 'hidden',
  textOverflow: 'ellipsis',

  minHeight: 16,
  paddingInline: 'calc($1 - 2px)',

  color: '$light',
  fontWeight: 400,

  resize: 'vertical',
  maxHeight: 200,

  '&:focus': {
    outline: 'none'
  },

  '&::placeholder': {
    color: '$dark5'
  },

  '&:disabled': {
    color: '$dark4'
  }
})

export const FieldRoot = styled(motion.input, {
  position: 'relative',
  width: '100%',
  height: 'auto',

  display: 'inline-flex',
  flexDirection: 'row',

  flex: 1,
  flexShrink: 0,

  overflow: 'hidden',
  textOverflow: 'ellipsis',

  minHeight: 16,
  paddingInline: 'calc($1 - 2px)',

  color: '$light',
  fontWeight: 400,

  '&:focus': {
    outline: 'none'
  },

  '&::placeholder': {
    color: '$dark4'
  },

  '&:disabled': {
    color: '$dark4'
  },

  '&[type="number"]::-webkit-outer-spin-button, &[type="number"]::-webkit-inner-spin-button':
    {
      appearance: 'none',
      margin: 0
    }
})

export const ElementRoot = styled('div', {
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'row',

  flexShrink: 0,
  alignSelf: 'center',

  variants: {
    text: {
      true: {
        padding: 'calc($1 - 2px)'
      }
    }
  }
})
