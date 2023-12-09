import React, { forwardRef, memo } from 'react'
import { type ComponentProps } from '@stitches/react'

import * as Primitive from '@radix-ui/react-dialog'

import Button from '../Button'
import Icon from '../Icon'

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

      <Primitive.Close asChild>
        <Button ghost condensed hover css={{ color: '$dark4' }}>
          <Icon name="Cross2Icon" width={14} height={14} />
        </Button>
      </Primitive.Close>
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

const Dialog = () => <React.Fragment />
Dialog.Root = memo(Root) as typeof Root
Dialog.Trigger = memo(Trigger) as typeof Trigger
Dialog.Content = memo(Content) as typeof Content
Dialog.Header = memo(Header) as typeof Header
Dialog.Title = memo(Title) as typeof Title
Dialog.Description = memo(Description) as typeof Description

export default Dialog
