import React, { forwardRef, memo } from 'react'
import { type ComponentProps } from '@stitches/react'
import { AnimatePresence, motion } from 'framer-motion'

import Box from '../Box'

import * as S from './styled'

type TRootBaseProps = {
  children: React.ReactNode
}

type TRootProps = ComponentProps<typeof S.Root> & TRootBaseProps

const Root = ({ children, ...rest }: TRootProps) => (
  <AnimatePresence initial={false} mode="wait" key="tabs">
    <S.Root {...rest}>{children}</S.Root>
  </AnimatePresence>
)

type TListBaseProps = {
  children: React.ReactNode
}

type TListProps = ComponentProps<typeof S.List> & TListBaseProps

const List = forwardRef(function List(
  { children, ...rest }: TListProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.List ref={forwardedRef} {...rest}>
      {children}
    </S.List>
  )
})

type TTriggerBaseProps = {
  group?: string
  isActive?: boolean
  children: React.ReactNode
}

type TTriggerProps = ComponentProps<typeof S.Trigger> & TTriggerBaseProps

const Trigger = forwardRef(function Trigger(
  { children, isActive, group, css, ...rest }: TTriggerProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <S.Trigger
      ref={forwardedRef}
      css={{ color: isActive ? '$light' : '$dark4', ...css }}
      {...rest}
    >
      {children}

      {isActive && (
        <S.TabsTriggerActive
          layoutId={`tabs-trigger-active-${group || 'default'}`}
          transition={{ layout: { duration: 0.2, ease: 'easeOut' } }}
        />
      )}
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
    <S.Content ref={forwardedRef} {...rest} asChild>
      <Box
        as={motion.section}
        key={`tabs-content-${rest.value}`}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </Box>
    </S.Content>
  )
})

const Tabs = () => <React.Fragment />
Tabs.Root = memo(Root) as typeof Root
Tabs.List = memo(List) as typeof List
Tabs.Trigger = memo(Trigger) as typeof Trigger
Tabs.Content = memo(Content) as typeof Content

export default Tabs
