import * as Tabs from '@radix-ui/react-tabs'

import { styled } from '@renderer/styles'
import { motion } from 'framer-motion'

export const TabsRoot = styled(Tabs.Root, {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '$2'
})

export const TabsList = styled(Tabs.List, {
  display: 'flex',
  width: '100%',

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    gap: '$4'
  }
})

export const TabsTrigger = styled(Tabs.Trigger, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'relative',
  flex: 1,

  textAlign: 'center',
  fontSize: '$3',
  lineHeight: '$3',
  fontWeight: 500,

  '&[aria-selected="true"]': {
    color: '$light'
  },

  paddingBlock: '$2',
  paddingInline: '$2',

  svg: {
    width: '100%',
    height: '100%'
  },

  '&[data-orientation="vertical"]': {
    aspectRatio: 1
  }
})

export const TabsContent = styled(Tabs.Content, {})

export const TabsTriggerActive = styled(motion.div, {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,

  height: 2,
  zIndex: '$base',

  backgroundColor: '$purple11',
  borderRadius: '$pill'
})
