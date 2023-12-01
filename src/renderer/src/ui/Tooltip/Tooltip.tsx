import React, { forwardRef, memo } from 'react'
import { type ComponentProps } from '@stitches/react'

import * as Primitive from '@radix-ui/react-tooltip'

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

type TArrowBaseProps = {
  children?: React.ReactNode
}

type TArrowProps = ComponentProps<typeof S.Arrow> & TArrowBaseProps

const Arrow = forwardRef(function Arrow(
  { children, ...rest }: TArrowProps,
  forwardedRef: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <S.Arrow ref={forwardedRef} {...rest}>
      {children}
    </S.Arrow>
  )
})

const Tooltip = () => <React.Fragment />
Tooltip.Root = memo(Root) as typeof Root
Tooltip.Trigger = memo(Trigger) as typeof Trigger
Tooltip.Content = memo(Content) as typeof Content
Tooltip.Arrow = memo(Arrow) as typeof Arrow

export default Tooltip
