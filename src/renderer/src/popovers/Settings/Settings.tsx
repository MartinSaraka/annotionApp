import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Tabs, Text } from '@renderer/ui'
import { SettingsAnnotation, SettingsLayout } from './sections'

const Settings = () => {
  const { t } = useTranslation(['common', 'popovers'])

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
            {t('popovers:settings.layout.title')}
          </Text>
        </Tabs.Trigger>

        <Tabs.Trigger
          value="annotation"
          group="settings"
          isActive={activeTab === 'annotation'}
        >
          <Text variant="md" css={{ fontWeight: 600 }}>
            {t('popovers:settings.annotation.title')}
          </Text>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="layout">
        <SettingsLayout />
      </Tabs.Content>

      <Tabs.Content value="annotation">
        <SettingsAnnotation />
      </Tabs.Content>
    </Tabs.Root>
  )
}

export default memo(Settings)
