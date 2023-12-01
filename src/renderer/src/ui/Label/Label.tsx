import { forwardRef, memo } from 'react'
import { type ComponentProps } from '@stitches/react'

import * as S from './styled'

type TBaseProps = {
  children: React.ReactNode
}

type TLabelProps = ComponentProps<typeof S.Root> & TBaseProps

const Label = forwardRef(function Label(
  { children, ...rest }: TLabelProps,
  forwardedRef: React.ForwardedRef<HTMLLabelElement>
) {
  return (
    <S.Root ref={forwardedRef} {...rest}>
      {children}
    </S.Root>
  )
})

export default memo(Label) as typeof Label
