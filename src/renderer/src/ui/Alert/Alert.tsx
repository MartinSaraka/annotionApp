import React, { forwardRef, memo } from 'react'
import { type ComponentProps } from '@stitches/react'

import * as Primitive from '@radix-ui/react-alert-dialog'

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
      <S.Overlay />

      <S.Content ref={forwardedRef} {...rest}>
        {children}
      </S.Content>
    </Primitive.Portal>
  )
})

type THeaderBaseProps = {
  children?: React.ReactNode
}

type THeaderProps = ComponentProps<typeof S.Header> & THeaderBaseProps

const Header = forwardRef(function Header(
  { children, ...rest }: THeaderProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Header ref={forwardedRef} {...rest}>
      {children}
    </S.Header>
  )
})

type TTitleBaseProps = {
  children: React.ReactNode
}

type TTitleProps = ComponentProps<typeof S.Title> & TTitleBaseProps

const Title = forwardRef(function Title(
  { children, ...rest }: TTitleProps,
  forwardedRef: React.ForwardedRef<HTMLHeadingElement>
) {
  return (
    <S.Title ref={forwardedRef} {...rest}>
      {children}
    </S.Title>
  )
})

type TDescriptionBaseProps = {
  children: React.ReactNode
}

type TDescriptionProps = ComponentProps<typeof S.Description> &
  TDescriptionBaseProps

const Description = forwardRef(function Description(
  { children, ...rest }: TDescriptionProps,
  forwardedRef: React.ForwardedRef<HTMLParagraphElement>
) {
  return (
    <S.Description ref={forwardedRef} {...rest}>
      {children}
    </S.Description>
  )
})

type TCancelBaseProps = {
  children: React.ReactNode
}

type TCancelProps = ComponentProps<typeof S.Cancel> & TCancelBaseProps

const Cancel = forwardRef(function Cancel(
  { children, ...rest }: TCancelProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <S.Cancel ref={forwardedRef} {...rest}>
      {children}
    </S.Cancel>
  )
})

type TActionBaseProps = {
  children: React.ReactNode
}

type TActionProps = ComponentProps<typeof S.Action> & TActionBaseProps

const Action = forwardRef(function Action(
  { children, ...rest }: TActionProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <S.Action ref={forwardedRef} {...rest}>
      {children}
    </S.Action>
  )
})

const Alert = () => <React.Fragment />
Alert.Root = memo(Root) as typeof Root
Alert.Trigger = memo(Trigger) as typeof Trigger
Alert.Content = memo(Content) as typeof Content
Alert.Header = memo(Header) as typeof Header
Alert.Title = memo(Title) as typeof Title
Alert.Description = memo(Description) as typeof Description
Alert.Cancel = memo(Cancel) as typeof Cancel
Alert.Action = memo(Action) as typeof Action

export default Alert
