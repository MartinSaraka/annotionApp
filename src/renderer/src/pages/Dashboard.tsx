import { memo } from 'react'

import { Box, Text } from '@renderer/ui'
import { DashboardTopBar } from './sections'

// TODO: implement dashboard

const Dashboard = () => (
  <Box
    css={{
      _appRegion: 'no-drag',
      height: '100%'
    }}
  >
    <DashboardTopBar id="dashboard--topbar" />

    <Box css={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        variant="xl"
        css={{
          color: '$dark5',
          fontWeight: 500,
          textTransform: 'uppercase'
        }}
      >
        Welcome - Select your medical images that u want to annotate
      </Text>
    </Box>
  </Box>
)

export default memo(Dashboard)
