import { Responsive, WidthProvider } from 'react-grid-layout'
import { motion } from 'framer-motion'

import { styled } from '@renderer/styles'

const ResponsiveGridLayout = WidthProvider(Responsive)

export const GridLayoutRoot = styled(ResponsiveGridLayout, {
  position: 'absolute !important',
  zIndex: '$up',
  inset: 0,

  pointerEvents: 'none'
})

export const GridLayoutItem = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',

  pointerEvents: 'auto',
  isolation: 'isolate',

  backgroundColor: '$light',
  $$shadowColor: '$colors$blackA7',
  boxShadow: '0 2px 10px $$shadowColor',

  borderRadius: '$6',

  '& *[data-visibility="hover"]': {
    opacity: 0,
    transition: 'opacity 0.1s ease-in-out'
  },

  '&:hover *[data-visibility="hover"]': {
    opacity: 1
  }
})
