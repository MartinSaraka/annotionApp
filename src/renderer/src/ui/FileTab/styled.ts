import { styled } from '@renderer/styles'
import { motion } from 'framer-motion'

import Button from '../Button'

export const Close = styled(Button, {
  opacity: 0,

  '&:hover': {
    opacity: 1,
    color: '$light',
    _bgAlpha: ['$light', '80']
  }
})

export const Root = styled('div', {
  position: 'relative',
  flexShrink: 0,
  cursor: 'pointer',

  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  paddingBlock: '$2',
  paddingInline: '$3',

  gap: '$2',
  color: '$light',

  [`&:hover ${Close}`]: {
    opacity: 1
  }
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'row',

  alignItems: 'center',
  justifyContent: 'center',

  gap: '$2',
  zIndex: '$upper'
})

export const Active = styled(motion.div, {
  position: 'absolute',
  inset: 0,
  bottom: 0,

  backgroundColor: '$dark1',
  zIndex: '$up',

  borderTopLeftRadius: '$6',
  borderTopRightRadius: '$6',

  borderColor: '$dark3',
  borderStyle: 'solid',
  borderWidth: '$1',
  borderBottomWidth: 0,

  '&:before, &:after': {
    content: '',
    position: 'absolute',

    bottom: 0,
    _size: 10,

    backgroundImage:
      'radial-gradient(circle at 0 0, transparent 9px, $dark3 9px, $dark3 10px, $dark1 10px)'
  },

  '&:before': {
    right: '100%'
  },

  '&:after': {
    left: '100%',
    transform: 'scaleX(-1)'
  }
})
