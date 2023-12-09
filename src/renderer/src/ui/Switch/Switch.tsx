import React, { forwardRef, memo } from 'react'
import { type ComponentProps } from '@stitches/react'

import * as S from './styled'

type TRootBaseProps = {
  children: React.ReactNode
}

type TRootProps = ComponentProps<typeof S.Root> & TRootBaseProps

const Root = ({ children, ...rest }: TRootProps) => {
  return <S.Root {...rest}>{children}</S.Root>
}

type TThumbProps = ComponentProps<typeof S.Thumb>

const Thumb = forwardRef(function Thumb(
  props: TThumbProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  return <S.Thumb ref={forwardedRef} {...props} />
})

const Switch = () => <React.Fragment />
Switch.Root = memo(Root) as typeof Root
Switch.Thumb = memo(Thumb) as typeof Thumb

export default Switch
