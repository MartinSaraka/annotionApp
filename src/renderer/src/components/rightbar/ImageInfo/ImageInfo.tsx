import { memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { Box } from '@renderer/ui'
import {
  ImageInfoClasses,
  ImageInfoPageColor,
  ImageInfoParameters
} from './sections'

type TLeftBarImageInfoProps = ComponentProps<typeof Box>

const ImageInfo = (props: TLeftBarImageInfoProps) => (
  <Box {...props}>
    <ImageInfoPageColor />
    <ImageInfoParameters />
    <ImageInfoClasses />
  </Box>
)

export default memo(ImageInfo) as typeof ImageInfo
