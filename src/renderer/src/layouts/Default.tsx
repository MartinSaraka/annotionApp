import { Outlet } from 'react-router'

import { Box } from '@renderer/ui'

import { LeftBar, RightBar, TopBar } from './sections'

const Default = () => (
  <Box
    as="main"
    id="default-layout"
    css={{
      flexDirection: 'row',
      width: '100vw',
      height: '100vh',
      isolation: 'isolate',
      padding: '$4',
      gap: '$4',
      _appRegion: 'drag'
    }}
  >
    <LeftBar css={{ _appRegion: 'no-drag' }} />

    <Box css={{ flex: 1, overflow: 'hidden' }}>
      <TopBar css={{ _appRegion: 'no-drag' }} />

      <Box
        as="article"
        id="content"
        css={{
          flex: 1,
          backgroundColor: '$gray200',
          color: '$gray900',
          borderRadius: '$12',
          isolation: 'isolate',
          overflow: 'hidden',
          _appRegion: 'no-drag'
        }}
      >
        <Outlet />
      </Box>
    </Box>

    <RightBar css={{ _appRegion: 'no-drag' }} />
  </Box>
)

export default Default
