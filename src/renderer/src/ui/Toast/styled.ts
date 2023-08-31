import { motion } from 'framer-motion'
import * as Toast from '@radix-ui/react-toast'

import { styled } from '@renderer/styles'

export const ToastRoot = styled(motion.div, {
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  flexDirection: 'row',
  flexShrink: 0,

  alignItems: 'center',
  gap: '$3',

  borderRadius: '$6',
  padding: '$4',

  backgroundColor: '$light'
})

export const ToastTitle = styled(Toast.Title, {})

export const ToastDescription = styled(Toast.Description, {})

export const ToastAction = styled(Toast.Action, {})

export const ToastClose = styled(Toast.Close, {})

export const ToastProgress = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',

  position: 'absolute',
  overflow: 'hidden',

  bottom: 0,
  left: 0,

  div: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    height: 2,

    borderRadius: '$pill',
    backgroundColor: '$violet9'
  }
})
