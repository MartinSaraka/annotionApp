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

type TItemBaseProps = {
  children: React.ReactNode
}

type TItemProps = ComponentProps<typeof S.Item> & TItemBaseProps

const Item = forwardRef(function Item(
  { children, ...rest }: TItemProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <S.Item ref={forwardedRef} {...rest}>
      {children}
    </S.Item>
  )
})

type TIndicatorBaseProps = {
  children?: React.ReactNode
}

type TIndicatorProps = ComponentProps<typeof S.Indicator> & TIndicatorBaseProps

const Indicator = forwardRef(function Indicator(
  { children, ...rest }: TIndicatorProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Indicator ref={forwardedRef} {...rest}>
      {children}
    </S.Indicator>
  )
})

const RadioGroup = () => <React.Fragment />
RadioGroup.Root = memo(Root) as typeof Root
RadioGroup.Item = memo(Item) as typeof Item
RadioGroup.Indicator = memo(Indicator) as typeof Indicator

export default RadioGroup
