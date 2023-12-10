import React, { forwardRef, memo } from 'react'
import { type ComponentProps } from '@stitches/react'

import * as S from './styled'

type TRootBaseProps = {
  children: React.ReactNode
}

type TRootProps = ComponentProps<typeof S.Root> & TRootBaseProps

const Root = forwardRef(function Root(
  { children, ...rest }: TRootProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Root ref={forwardedRef} {...rest}>
      {children}
    </S.Root>
  )
})

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

const ToggleGroup = () => <React.Fragment />
ToggleGroup.Root = memo(Root) as typeof Root
ToggleGroup.Item = memo(Item) as typeof Item

export default ToggleGroup
