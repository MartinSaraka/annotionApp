import { memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { Box } from '@renderer/ui'
import {
  AnnotationInfoClass,
  AnnotationInfoDefault,
  AnnotationInfoMeasurements,
  AnnotationInfoParameters,
  AnnotationInfoPreview
} from './sections'

type TLeftBarAnnotationInfoProps = ComponentProps<typeof Box>

const AnnotationInfo = (props: TLeftBarAnnotationInfoProps) => (
  <Box {...props}>
    <AnnotationInfoPreview />
    <AnnotationInfoDefault />
    <AnnotationInfoParameters />
    <AnnotationInfoClass />
    <AnnotationInfoMeasurements />
  </Box>
)

export default memo(AnnotationInfo) as typeof AnnotationInfo
