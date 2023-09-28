import { memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { Box, Button, Icon } from '@renderer/ui'

type TTopBarRightSideProps = ComponentProps<typeof Box>

const RightSide = ({ css, ...rest }: TTopBarRightSideProps) => (
  <Box
    aria-describedby="image-actions"
    css={{ flexDirection: 'row', alignItems: 'center', gap: '$4', ...css }}
    {...rest}
  >
    <Button outlined aria-label="Share with others">
      <Icon name="Share2Icon" width={14} height={14} />
      Share
    </Button>

    <Button aria-label="Export image">
      <Icon name="DownloadIcon" width={14} height={14} />
      Export
    </Button>

    <Button ghost aria-label="Notifications">
      <Icon name="BellIcon" width={18} height={18} />
    </Button>

    <Button ghost aria-label="Settings">
      <Icon name="GearIcon" width={18} height={18} />
    </Button>
  </Box>
)

export default memo(RightSide) as typeof RightSide
