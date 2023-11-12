import { motion } from 'framer-motion'

import { styled } from '@renderer/styles'

export const Root = styled('aside', {
  position: 'absolute',
  inset: '$1',
  bottom: '$5',
  top: 'auto',

  zIndex: '$up',

  display: 'flex',
  flexDirection: 'row',

  justifyContent: 'center',
  alignItems: 'stretch',

  pointerEvents: 'none',
  userSelect: 'none'
})

export const Content = styled(motion.div, {
  display: 'flex',
  flexDirection: 'row',

  pointerEvents: 'auto',
  cursor: 'help',

  backgroundColor: '$dark1',
  paddingBlock: '$1',
  paddingInline: '$3',

  borderRadius: '$6',
  borderWidth: '$1',
  borderStyle: '$solid',
  borderColor: '$dark3'
})
