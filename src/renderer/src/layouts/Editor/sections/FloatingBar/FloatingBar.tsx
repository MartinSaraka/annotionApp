import { memo } from 'react'
import { type ComponentProps } from '@stitches/react'

import {
  FloatingBarAnnotationTools,
  FloatingBarSegmentationTools
} from '@renderer/components/floatingbar'

import { useImageStore } from '@renderer/store'
import { EToolType } from '@common/constants/tools'

import * as S from './styled'

type TFloatingBarProps = ComponentProps<typeof S.Root>

const FloatingBar = (props: TFloatingBarProps) => {
  const isAnnotationToolSelected = useImageStore(
    (state) => state.activeTool().type === EToolType.ANNOTATION
  )

  const isAnnotationSelected = useImageStore(
    (state) => !isAnnotationToolSelected && !!state.getSelectedAnnotation()
  )

  if (!(isAnnotationToolSelected || isAnnotationSelected)) return null

  return (
    <S.Root {...props}>
      <S.Content>
        {isAnnotationSelected ? (
          <FloatingBarSegmentationTools />
        ) : isAnnotationToolSelected ? (
          <FloatingBarAnnotationTools />
        ) : null}
      </S.Content>
    </S.Root>
  )
}

export default memo(FloatingBar) as typeof FloatingBar
