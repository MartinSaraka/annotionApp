import { memo } from 'react'
import { ComponentProps } from '@stitches/react'
import { useImageStore } from '@renderer/store'
import { Box } from '@renderer/ui'
import {
  AnnotationInfoClass,
  AnnotationInfoDefault,
  AnnotationInfoMeasurements,
  AnnotationInfoParameters,
  AnnotationInfoPreview,
  AnnotationInfoProcess,
  AnnotationInfoFeatures // Newly added
} from './sections'

type TLeftBarAnnotationInfoProps = ComponentProps<typeof Box>

const AnnotationInfo = (props: TLeftBarAnnotationInfoProps) => {
  const annotation = useImageStore((state) => state.getSelectedAnnotation())

  return (
    <Box {...props}>
      {annotation && annotation.type === 'AI' && (
        <>
          <AnnotationInfoFeatures />
        </>
      )}

      <AnnotationInfoPreview />
      <AnnotationInfoProcess />
      <AnnotationInfoDefault />
      <AnnotationInfoParameters />
      <AnnotationInfoClass />
      <AnnotationInfoMeasurements />
    </Box>
  )
}

export default memo(AnnotationInfo) as typeof AnnotationInfo
