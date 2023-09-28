import { styled } from '@renderer/styles'
import { motion } from 'framer-motion'

export const Root = styled(motion.div, {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column'
})

export const Handle = styled(motion.div, {
  position: 'absolute',
  inset: '0 auto',

  width: 2,
  zIndex: '$up',

  cursor: 'col-resize',
  userSelect: 'none'
})
