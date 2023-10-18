import { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'

import * as S from './styled'

type TBaseProps = {
  children?: React.ReactNode
}

type TChipProps = ComponentProps<typeof S.Root> & TBaseProps

const Chip = forwardRef(function Chip(
  { children, ...rest }: TChipProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Root role="term" ref={forwardedRef} {...rest}>
      {children}
    </S.Root>
  )
})

export default memo(Chip) as typeof Chip
