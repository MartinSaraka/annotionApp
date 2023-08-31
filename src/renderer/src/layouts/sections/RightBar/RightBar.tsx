import { memo, useCallback } from 'react'
import { ComponentProps } from '@stitches/react'
import { AnimatePresence, motion } from 'framer-motion'

import { Box, Tabs, Toggle } from '@renderer/ui'

import { useRightbarStore } from '@renderer/store'
import { ERightbarTabs } from '@common/types/rightbar'
import { ImageIcon, LayersIcon, TableIcon } from '@radix-ui/react-icons'
import { RIGHTBAR_DEFAULT_MAX_WIDTH } from '@common/constants/rightbar'

type TRightBarProps = ComponentProps<typeof Box> &
  ComponentProps<typeof motion.aside>

const RightBar = ({ css, ...rest }: TRightBarProps) => {
  const { opened, activeTab, setActiveTab, toggleBarOpened } =
    useRightbarStore()

  const handleTabChange = useCallback(
    (value: string) => setActiveTab(value as typeof activeTab),
    [setActiveTab]
  )

  return (
    <AnimatePresence initial={false} key="right-bar">
      <Box
        id="right-bar"
        as={motion.aside}
        initial={{ width: 31 }}
        animate={{ width: opened ? RIGHTBAR_DEFAULT_MAX_WIDTH : 31 }}
        css={{
          flexShrink: 0,
          maxWidth: RIGHTBAR_DEFAULT_MAX_WIDTH,

          transformOrigin: 'right',
          alignItems: 'flex-end',

          gap: '$4',
          ...css
        }}
        {...rest}
      >
        <Toggle
          pressed={opened}
          onPressedChange={toggleBarOpened}
          aria-label="toggle-rightbar"
        >
          <TableIcon />
        </Toggle>

        <Tabs
          value={activeTab || ''}
          onValueChange={handleTabChange}
          orientation={opened ? 'horizontal' : 'vertical'}
        >
          <Tabs.List>
            <Tabs.Trigger
              group="rightbar-tabs"
              isActive={activeTab === ERightbarTabs.IMAGE}
              value={ERightbarTabs.IMAGE}
              aria-label="toggle-image-info"
            >
              {opened ? 'Image' : <ImageIcon />}
            </Tabs.Trigger>

            <Tabs.Trigger
              group="rightbar-tabs"
              isActive={activeTab === ERightbarTabs.ANNOTATIONS}
              value={ERightbarTabs.ANNOTATIONS}
              aria-label="toggle-annotations-info"
            >
              {opened ? 'Annotations' : <LayersIcon />}
            </Tabs.Trigger>
          </Tabs.List>

          {activeTab === ERightbarTabs.IMAGE && (
            <Tabs.Content value={ERightbarTabs.IMAGE} forceMount>
              Foo
            </Tabs.Content>
          )}

          {activeTab === ERightbarTabs.ANNOTATIONS && (
            <Tabs.Content value={ERightbarTabs.ANNOTATIONS} forceMount>
              Bar
            </Tabs.Content>
          )}
        </Tabs>
      </Box>
    </AnimatePresence>
  )
}

export default memo(RightBar)
