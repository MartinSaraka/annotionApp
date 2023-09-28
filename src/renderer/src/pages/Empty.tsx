import { memo } from 'react'

import { FileOpener } from '@renderer/components'
import { Box } from '@renderer/ui'

const Empty = () => (
  <Box css={{ _appRegion: 'no-drag' }}>
    <FileOpener />
  </Box>
)

export default memo(Empty)
