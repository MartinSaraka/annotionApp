import { memo } from 'react'

import { FileOpener } from '@renderer/components'
import { Box } from '@renderer/ui'

const Empty = () => (
  <Box
    css={{
      _appRegion: 'no-drag',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '$dark1',
      borderTopWidth: '$1',
      borderTopStyle: '$solid',
      borderTopColor: '$dark3'
    }}
  >
    <FileOpener />
  </Box>
)

export default memo(Empty)
