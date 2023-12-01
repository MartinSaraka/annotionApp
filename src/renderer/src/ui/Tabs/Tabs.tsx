import { forwardRef, memo } from 'react'
import { type ComponentProps } from '@stitches/react'
import { AnimatePresence, motion } from 'framer-motion'

import Box from '../Box'

import * as S from './styled'

type TRootBaseProps = {
  children: React.ReactNode
}

type TTabsProps = ComponentProps<typeof S.TabsRoot> & TRootBaseProps

const Tabs = ({ children, ...rest }: TTabsProps) => (
  <AnimatePresence initial={false} mode="wait" key="tabs">
    <S.TabsRoot {...rest}>{children}</S.TabsRoot>
  </AnimatePresence>
)

type TListBaseProps = {
  children: React.ReactNode
}

type TListProps = ComponentProps<typeof S.TabsList> & TListBaseProps

const List = forwardRef(function List(
  { children, ...rest }: TListProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.TabsList ref={forwardedRef} {...rest}>
      {children}
    </S.TabsList>
  )
})

type TTriggerBaseProps = {
  group?: string
  isActive?: boolean
  children: React.ReactNode
}

type TTriggerProps = ComponentProps<typeof S.TabsTrigger> & TTriggerBaseProps

const Trigger = forwardRef(function Trigger(
  { children, isActive, group, ...rest }: TTriggerProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <S.TabsTrigger ref={forwardedRef} {...rest}>
      {children}

      {isActive && (
        <S.TabsTriggerActive
          layoutId={`tabs-trigger-active-${group || 'default'}`}
          transition={{ layout: { duration: 0.2, ease: 'easeOut' } }}
        />
      )}
    </S.TabsTrigger>
  )
})

type TContentBaseProps = {
  children: React.ReactNode
}

type TContentProps = ComponentProps<typeof S.TabsContent> & TContentBaseProps

const Content = forwardRef(function Content(
  { children, ...rest }: TContentProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.TabsContent ref={forwardedRef} {...rest} asChild>
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
    </S.TabsContent>
  )
})

Tabs.List = memo(List) as typeof List
Tabs.Trigger = memo(Trigger) as typeof Trigger
Tabs.Content = memo(Content) as typeof Content

export default Tabs
