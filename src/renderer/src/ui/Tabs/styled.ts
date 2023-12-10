import { styled } from '@renderer/styles'
import { motion } from 'framer-motion'

import * as Tabs from '@radix-ui/react-tabs'

export const Root = styled(Tabs.Root, {
  overflow: 'hidden'
})

export const List = styled(Tabs.List, {
  position: 'relative',

  display: 'flex'
})

export const Trigger = styled(Tabs.Trigger, {
  position: 'relative',
  zIndex: '$up',

  outline: 'none !important',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,

  paddingInline: '$3',
  paddingBlock: '$3',

  transition: 'color 0.1s',

  '&:hover': {
    color: '$light'
  }
})

export const Content = styled(Tabs.Content, {})

export const TabsTriggerActive = styled(motion.div, {
  position: 'absolute',
  inset: 0,
  zIndex: '$down',

  backgroundColor: '$dark2'
})
