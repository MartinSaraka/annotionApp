import { memo, useState } from 'react'

import { Tabs, Text } from '@renderer/ui'
import { SettingsLayout } from './sections'

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>('layout')

  return (
    <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Trigger
          value="layout"
          group="settings"
          isActive={activeTab === 'layout'}
        >
          <Text variant="md" css={{ fontWeight: 600 }}>
            Layout
          </Text>
        </Tabs.Trigger>

        <Tabs.Trigger
          value="annotation"
          group="settings"
          isActive={activeTab === 'annotation'}
        >
          <Text variant="md" css={{ fontWeight: 600 }}>
            Annotation
          </Text>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="layout">
        <SettingsLayout />
      </Tabs.Content>

      <Tabs.Content value="annotation">Annotation content</Tabs.Content>
    </Tabs.Root>
  )
}

export default memo(Settings)
