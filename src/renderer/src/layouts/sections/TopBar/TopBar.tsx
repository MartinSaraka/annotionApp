import { memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { AnimatePresence, motion } from 'framer-motion'

import { Box } from '@renderer/ui'
import { FileTabs } from '@renderer/components'
import { useImageStore } from '@renderer/store'

type TTopBarProps = ComponentProps<typeof Box> &
  ComponentProps<typeof motion.header>

const TopBar = ({ css, ...props }: TTopBarProps) => {
  const isBarOpened = useImageStore((state) => !!state.tabs.length)

  return (
    <AnimatePresence initial={false}>
      <Box
        id="top-bar"
        as={motion.header}
        css={{ overflow: 'hidden', ...css }}
        initial={{ height: 0 }}
        animate={{ height: isBarOpened ? 'auto' : 0 }}
        {...props}
      >
        <Box css={{ paddingBottom: '$4' }}>
          <FileTabs />
        </Box>
      </Box>
    </AnimatePresence>
  )
}

export default memo(TopBar)
