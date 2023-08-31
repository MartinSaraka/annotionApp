import { memo, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'

import { Toast } from '@renderer/ui'
import { TToast } from '@common/types/toast'
import { useToastStore } from '@renderer/store'

import * as S from './styled'

const Toasts = () => {
  const toasts = useToastStore((state) => state.toasts)

  const renderItems = useCallback(
    (toast: TToast) => <Toast key={`toast-${toast.id}`} layout data={toast} />,
    []
  )

  return (
    <S.ToastProvider swipeDirection="right">
      <S.ToastViewport>
        <AnimatePresence>
          {Object.values(toasts).map(renderItems)}
        </AnimatePresence>
      </S.ToastViewport>
    </S.ToastProvider>
  )
}

export default memo(Toasts)
