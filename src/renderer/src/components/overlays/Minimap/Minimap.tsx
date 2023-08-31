import { ComponentProps } from '@stitches/react'

import { Box } from '@renderer/ui'

import { OPEN_SEA_DRAGON_MINIMAP_ID } from '@common/constants/viewer'

type TMinimapProps = Omit<ComponentProps<typeof Box>, 'children'>

const Minimap = (props: TMinimapProps) => (
  <Box
    css={{
      width: '100%',
      flex: 1,
      aspectRatio: 1
    }}
  >
    <Box
      {...props}
      id={OPEN_SEA_DRAGON_MINIMAP_ID}
      css={{
        position: 'relative !important',
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  </Box>
)

export default Minimap
