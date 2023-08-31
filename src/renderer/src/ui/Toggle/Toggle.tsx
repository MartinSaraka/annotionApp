import { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'

import * as PrimitiveToggle from '@radix-ui/react-toggle'

import * as S from './styled'

type TBaseProps = {
  children: React.ReactNode
}

type TToggleProps = ComponentProps<typeof PrimitiveToggle.Root> &
  ComponentProps<typeof S.ToggleRoot> &
  TBaseProps

const Toggle = forwardRef(function Toggle(
  { children, ...rest }: TToggleProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <PrimitiveToggle.Root ref={forwardedRef} asChild {...rest}>
      <S.ToggleRoot whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {children}
      </S.ToggleRoot>
    </PrimitiveToggle.Root>
  )
})

export default memo(Toggle) as typeof Toggle
