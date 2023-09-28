import React, { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'
import * as Primitive from '@radix-ui/react-select'

import * as S from './styled'

type TRootBaseProps = {
  children: React.ReactNode
}

type TRootProps = ComponentProps<typeof S.Root> & TRootBaseProps

const Root = ({ children, ...rest }: TRootProps) => {
  return <S.Root {...rest}>{children}</S.Root>
}

type TTriggerBaseProps = {
  children?: React.ReactNode
}

type TTriggerProps = ComponentProps<typeof S.Trigger> & TTriggerBaseProps

const Trigger = forwardRef(function Trigger(
  { children, ...rest }: TTriggerProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <S.Trigger ref={forwardedRef} {...rest}>
      {children}
    </S.Trigger>
  )
})

type TIconBaseProps = {
  children: React.ReactNode
}

type TIconProps = ComponentProps<typeof S.Icon> & TIconBaseProps

const Icon = forwardRef(function Icon(
  { children, ...rest }: TIconProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Icon ref={forwardedRef} {...rest}>
      {children}
    </S.Icon>
  )
})

type TValueBaseProps = {
  children: React.ReactNode
}

type TValueProps = ComponentProps<typeof S.Value> & TValueBaseProps

const Value = forwardRef(function Value(
  { children, ...rest }: TValueProps,
  forwardedRef: React.ForwardedRef<HTMLSpanElement>
) {
  return (
    <S.Value ref={forwardedRef} {...rest}>
      {children}
    </S.Value>
  )
})

type TItemBaseProps = {
  children: React.ReactNode
}

type TItemProps = ComponentProps<typeof S.Item> & TItemBaseProps

const Item = forwardRef(function Item(
  { children, ...rest }: TItemProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Item ref={forwardedRef} {...rest}>
      <Primitive.ItemText>{children}</Primitive.ItemText>
    </S.Item>
  )
})

type TContentBaseProps = {
  children: React.ReactNode
}

type TContentProps = ComponentProps<typeof S.Content> & TContentBaseProps

const Content = forwardRef(function Content(
  { children, ...rest }: TContentProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <Primitive.Portal>
      <S.Content ref={forwardedRef} {...rest}>
        <S.Viewport>{children}</S.Viewport>
      </S.Content>
    </Primitive.Portal>
  )
})

const Select = () => <React.Fragment />
Select.Root = memo(Root) as typeof Root
Select.Trigger = memo(Trigger) as typeof Trigger
Select.Icon = memo(Icon) as typeof Icon
Select.Value = memo(Value) as typeof Value
Select.Content = memo(Content) as typeof Content
Select.Item = memo(Item) as typeof Item

export default Select
