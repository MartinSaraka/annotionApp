import { motion } from 'framer-motion'

import { keyframes, styled } from '@renderer/styles'

export const ButtonRoot = styled(motion.button, {
  position: 'relative',
  cursor: 'pointer',

  display: 'inline-flex',
  flexDirection: 'row',

  flexShrink: 0,

  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: '$6',

  paddingBlock: '$2',
  paddingInline: '$4',

  '&[data-loading="true"][data-cancelable="false"]': {
    opacity: 0.8,
    cursor: 'progress'
  },

  borderWidth: '$1',
  borderStyle: 'solid',
  backgroundColor: '#006CEB',
  borderColor: '#0074FF',

  fontSize: '$5',
  lineHeight: 'none',
  fontWeight: 600,

  variants: {
    outlined: {
      true: {
        backgroundColor: 'transparent',
        color: '#0074FF',

        '&:disabled': {
          cursor: 'not-allowed'
        }
      }
    },
    ghost: {
      true: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '$light',
        padding: '$2',

        '&:disabled': {
          cursor: 'not-allowed'
        }
      }
    },
    input: {
      true: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'currentColor',
        padding: 'calc($1 - 2px)',
        fontSize: '$4',
        fontWeight: 400,

        '&:disabled': {
          color: '$dark4',
          cursor: 'default'
        }
      }
    },
    condensed: {
      true: {
        padding: '$1'
      }
    }
  }
})

export const Content = styled(motion.div, {
  display: 'flex',
  flexDirection: 'row',

  flexShrink: 0,
  gap: '$1'
})

const animationKeyframes = keyframes({
  '0%': {
    transform: 'rotate(0deg)'
  },

  '100%': {
    transform: 'rotate(360deg)'
  }
})

export const SpinnerWrapper = styled(motion.div, {
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  flexDirection: 'row',

  flexShrink: 0,
  justifyContent: 'flex-end',

  height: '1em',
  pointerEvents: 'none'
})

export const Spinner = styled(motion.div, {
  display: 'flex',
  position: 'absolute',

  flexShrink: 0,

  height: '1em',
  width: '1em',

  borderRadius: '50%',
  borderTop: '0.15em solid $colors$violet1',
  borderRight: '0.15em solid transparent',

  animation: `${animationKeyframes} 1s linear infinite`
})