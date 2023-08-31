import { memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { Box } from '@renderer/ui'

type TLeftBarProps = ComponentProps<typeof Box>

const LeftBar = ({ css, ...rest }: TLeftBarProps) => (
  <Box
    id="left-bar"
    as="nav"
    css={{
      flexShrink: 0,
      gap: '$4',
      ...css
    }}
    {...rest}
  >
    <Box css={{ paddingBlock: '$2', minWidth: 53, _appRegion: 'drag' }}>
      <Box css={{ height: 12 }} />
    </Box>
  </Box>
)

export default memo(LeftBar)
