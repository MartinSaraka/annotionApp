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

  borderRadius: '$8',
  border: '1px solid $colors$violet9',

  backgroundColor: '$violet9',
  color: '$violet1',

  paddingBlock: '$3',
  paddingInline: '$6',

  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 500,

  '&[aria-disabled="true"]': {
    opacity: 0.3,
    cursor: 'not-allowed'
  },

  '&[data-loading="true"][data-cancelable="false"]': {
    opacity: 0.8,
    cursor: 'progress'
  }
})

export const Content = styled(motion.div, {
  display: 'flex',
  flexDirection: 'row',

  flexShrink: 0,
  gap: '$3'
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
