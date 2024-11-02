/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { memo } from 'react'

import { Box} from '@renderer/ui' // Assuming Button component is imported from your UI library
import { DashboardTopBar } from './sections'
import { OnboardingCardDPSaraka } from '@renderer/dpSaraka'

// Dashboard component
const Dashboard = () => {
  const [showOnboarding] = useState(true)

  return (
    <Box
      css={{
        _appRegion: 'no-drag',
        height: '100%'
      }}
    >
      <DashboardTopBar id="dashboard--topbar" />
      <Box
        css={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {showOnboarding && <OnboardingCardDPSaraka />}

        {/* Your other dashboard content goes here */}
      </Box>
    </Box>
  )
}

export default memo(Dashboard)
