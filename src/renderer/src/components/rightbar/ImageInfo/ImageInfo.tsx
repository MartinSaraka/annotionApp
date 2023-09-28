import { ComponentProps } from '@stitches/react'

import { Box } from '@renderer/ui'
import { ImageInfoPageColor, ImageInfoParameters } from './sections'
import { memo } from 'react'

type TLeftBarImageInfoProps = ComponentProps<typeof Box>

const ImageInfo = (props: TLeftBarImageInfoProps) => (
  <Box {...props}>
    <ImageInfoPageColor />
    <ImageInfoParameters />
  </Box>
)

export default memo(ImageInfo) as typeof ImageInfo
