import * as Toolbar from '@radix-ui/react-toolbar'

import { styled } from '@renderer/styles'
import { motion } from 'framer-motion'

export const ToolbarRoot = styled(Toolbar.Root, {
  display: 'flex',

  alignItems: 'center',
  justifyContent: 'center',

  gap: '$2',

  '&[data-orientation="vertical"]': {
    flexDirection: 'column'
  },

  '&[data-orientation="horizontal"]': {
    flexDirection: 'row'
  }
})

export const ToolbarGroup = styled(Toolbar.ToggleGroup, {
  display: 'flex',

  alignItems: 'center',
  justifyContent: 'center',

  gap: '$2',

  '&[data-orientation="vertical"]': {
    flexDirection: 'column'
  },

  '&[data-orientation="horizontal"]': {
    flexDirection: 'row'
  }
})

export const ToolbarToggle = styled(Toolbar.ToggleItem, {
  position: 'relative',
  display: 'inline-flex',
  flexShrink: 0,

  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: '$5',
  padding: '$2',

  svg: {
    zIndex: '$up'
  },

  color: '$light',

  '&:disabled': {
    color: '$dark4',
    cursor: 'not-allowed'
  }
})

export const ToolbarButton = styled(Toolbar.Button, {
  position: 'relative',
  display: 'inline-flex',
  flexShrink: 0,

  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: 'calc($2 + 2px)',
  padding: '$2',

  color: '$light',

  '&:hover': {
    color: '$blue2'
  }
})

export const ToolbarSeparator = styled(Toolbar.Separator, {
  backgroundColor: '$dark3',
  borderRadius: '$pill',

  '&[data-orientation="vertical"]': {
    width: 1,
    height: 18,
    marginInline: '$1'
  },

  '&[data-orientation="horizontal"]': {
    height: 1,
    width: 18,
    marginBlock: '$1'
  }
})

export const ActiveItem = styled(motion.div, {
  position: 'absolute',
  inset: 0,

  backgroundColor: '$blue3',
  borderRadius: '$5',

  zIndex: '$base'
})
