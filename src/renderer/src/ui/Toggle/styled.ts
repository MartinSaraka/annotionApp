import { motion } from 'framer-motion'

import { styled } from '@renderer/styles'

export const ToggleRoot = styled(motion.button, {
  display: 'inline-flex',
  flex: 0,

  padding: '$2',
  borderRadius: '$2',

  alignItems: 'center',
  justifyContent: 'center',

  aspectRatio: 1,

  color: '$purple11',
  backgroundColor: '$light',

  '&:hover': {
    backgroundColor: '$purple3'
  },

  '&[data-state="on"]': {
    backgroundColor: '$purple5'
  }
})
