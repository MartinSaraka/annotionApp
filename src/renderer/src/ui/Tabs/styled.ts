import { styled } from '@renderer/styles'
import { motion } from 'framer-motion'

import * as Tabs from '@radix-ui/react-tabs'

export const Root = styled(Tabs.Root, {})

export const List = styled(Tabs.List, {
  position: 'relative',

  display: 'flex',
  padding: '$1',

  backgroundColor: '$dark2',
  borderRadius: '$3',

  borderWidth: '$1',
  borderStyle: '$solid',
  borderColor: '$dark3'
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
  paddingBlock: '$2'
})

export const Content = styled(Tabs.Content, {})

export const TabsTriggerActive = styled(motion.div, {
  position: 'absolute',
  inset: 0,
  zIndex: '$down',

  backgroundColor: '$dark1',
  borderRadius: '$2',

  borderWidth: '$1',
  borderStyle: '$solid',
  borderColor: '$dark3'
})
