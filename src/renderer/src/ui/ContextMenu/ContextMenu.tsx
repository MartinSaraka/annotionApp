import React, { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'
import * as Primitive from '@radix-ui/react-context-menu'

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
        {children}
      </S.Content>
    </Primitive.Portal>
  )
})

type TItemBaseProps = {
  children?: React.ReactNode
}

type TItemProps = ComponentProps<typeof S.Item> & TItemBaseProps

const Item = forwardRef(function Item(
  { children, ...rest }: TItemProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Item ref={forwardedRef} {...rest}>
      {children}
    </S.Item>
  )
})

type TSeparatorBaseProps = {
  children?: React.ReactNode
}

type TSeparatorProps = ComponentProps<typeof S.Separator> & TSeparatorBaseProps

const Separator = forwardRef(function Separator(
  { children, ...rest }: TSeparatorProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Separator ref={forwardedRef} {...rest}>
      {children}
    </S.Separator>
  )
})

type TSubBaseProps = {
  children: React.ReactNode
}

type TSubProps = ComponentProps<typeof S.Sub> & TSubBaseProps

const Sub = ({ children, ...rest }: TSubProps) => {
  return <S.Sub {...rest}>{children}</S.Sub>
}

type TSubTriggerBaseProps = {
  children: React.ReactNode
}

type TSubTriggerProps = ComponentProps<typeof S.SubTrigger> &
  TSubTriggerBaseProps

const SubTrigger = forwardRef(function SubTrigger(
  { children, ...rest }: TSubTriggerProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.SubTrigger ref={forwardedRef} {...rest}>
      {children}
    </S.SubTrigger>
  )
})

type TSubContentBaseProps = {
  children: React.ReactNode
}

type TSubContentProps = ComponentProps<typeof S.SubContent> &
  TSubContentBaseProps

const SubContent = forwardRef(function SubContent(
  { children, ...rest }: TSubContentProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <Primitive.Portal>
      <S.SubContent ref={forwardedRef} {...rest}>
        {children}
      </S.SubContent>
    </Primitive.Portal>
  )
})

const ContextMenu = () => <React.Fragment />
ContextMenu.Root = memo(Root) as typeof Root
ContextMenu.Trigger = memo(Trigger) as typeof Trigger
ContextMenu.Content = memo(Content) as typeof Content
ContextMenu.Item = memo(Item) as typeof Item
ContextMenu.Separator = memo(Separator) as typeof Separator

ContextMenu.Sub = memo(Sub) as typeof Sub
ContextMenu.SubTrigger = memo(SubTrigger) as typeof SubTrigger
ContextMenu.SubContent = memo(SubContent) as typeof SubContent

export default ContextMenu
