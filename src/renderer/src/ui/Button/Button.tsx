import { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'
import { AnimatePresence } from 'framer-motion'

import * as S from './styled'
import { theme } from '@renderer/styles'

type TBaseProps = {
  children: React.ReactNode
  loading?: boolean
  onCancel?: () => void
}

type TButtonProps = ComponentProps<typeof S.ButtonRoot> & TBaseProps

const Button = forwardRef(function Button(
  { children, loading, disabled, onCancel, onClick, ...rest }: TButtonProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <S.ButtonRoot
      type="button"
      ref={forwardedRef}
      aria-disabled={disabled}
      data-loading={loading}
      data-cancelable={!!onCancel}
      disabled={disabled || (!onCancel && loading)}
      onClick={!disabled && !loading ? onClick : onCancel}
      whileHover={!disabled && !loading ? { scale: 1.03 } : { scale: 1 }}
      whileTap={!disabled && !loading ? { scale: 0.97 } : { scale: 1 }}
      {...rest}
    >
      <S.Content>{children}</S.Content>

      <AnimatePresence mode="wait">
        {loading && (
          <S.SpinnerWrapper
            initial={{ width: 0 }}
            animate={{ width: `calc(1em + ${theme.space[3].computedValue})` }}
            exit={{ width: 0, transition: { delay: 0.4 } }}
          >
            <S.Spinner
              initial={{ right: '100%', opacity: 0 }}
              animate={{ right: 0, opacity: 1, transition: { delay: 0.4 } }}
              exit={{ right: '100%', opacity: 0 }}
            />
          </S.SpinnerWrapper>
        )}
      </AnimatePresence>
    </S.ButtonRoot>
  )
})

export default memo(Button) as typeof Button
