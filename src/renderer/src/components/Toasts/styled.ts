import * as Toast from '@radix-ui/react-toast'

import { styled } from '@renderer/styles'

export const ToastProvider = styled(Toast.Provider, {})

export const ToastViewport = styled(Toast.ToastViewport, {
  position: 'fixed',

  bottom: 0,
  right: 0,

  display: 'flex',
  flexDirection: 'column',

  gap: '$3',

  zIndex: '$toast',
  outline: 'none'
})
