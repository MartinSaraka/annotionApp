import React, { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'
import * as Primitive from '@radix-ui/react-popover'

import * as S from './styled'

type TRootBaseProps = {
  children: React.ReactNode
}

type TRootProps = ComponentProps<typeof S.Root> & TRootBaseProps

const Root = ({ children, ...rest }: TRootProps) => {
  return (
    <S.Root modal {...rest}>
      {children}
    </S.Root>
  )
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

type TAnchorBaseProps = {
  children?: React.ReactNode
}

type TAnchorProps = ComponentProps<typeof S.Anchor> & TAnchorBaseProps

const Anchor = forwardRef(function Anchor(
  { children, ...rest }: TAnchorProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Anchor ref={forwardedRef} {...rest}>
      {children}
    </S.Anchor>
  )
})

type TCloseBaseProps = {
  children?: React.ReactNode
}

type TCloseProps = ComponentProps<typeof S.Close> & TCloseBaseProps

const Close = forwardRef(function Close(
  { children, ...rest }: TCloseProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <S.Close ref={forwardedRef} {...rest}>
      {children}
    </S.Close>
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
      <S.Content ref={forwardedRef} side="left" align="start" {...rest}>
        {children}
      </S.Content>
    </Primitive.Portal>
  )
})

const Popover = () => <React.Fragment />
Popover.Root = memo(Root) as typeof Root
Popover.Trigger = memo(Trigger) as typeof Trigger
Popover.Anchor = memo(Anchor) as typeof Anchor
Popover.Close = memo(Close) as typeof Close
Popover.Content = memo(Content) as typeof Content

export default Popover
