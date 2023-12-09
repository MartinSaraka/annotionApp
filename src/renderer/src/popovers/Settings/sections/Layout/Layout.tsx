import { memo } from 'react'

import { Label, List, Switch } from '@renderer/ui'

const Layout = () => {
  return (
    <List>
      <List.Box css={{ gap: 0 }}>
        <List.Item css={{ $$firstWidth: 'auto' }}>
          <Label
            htmlFor="left-bar-visible"
            css={{ textTransform: 'unset', flex: 1 }}
          >
            Visible left panel
          </Label>

          <Switch.Root id="left-bar-visible" css={{ flex: 'unset !important' }}>
            <Switch.Thumb />
          </Switch.Root>
        </List.Item>

        <List.Item css={{ $$firstWidth: 'auto' }}>
          <Label
            htmlFor="right-bar-visible"
            css={{ textTransform: 'unset', flex: 1 }}
          >
            Visible right panel
          </Label>

          <Switch.Root
            id="right-bar-visible"
            css={{ flex: 'unset !important' }}
          >
            <Switch.Thumb />
          </Switch.Root>
        </List.Item>
      </List.Box>
    </List>
  )
}

export default memo(Layout)
