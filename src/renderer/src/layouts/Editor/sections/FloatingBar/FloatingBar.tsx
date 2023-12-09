import { memo } from 'react'
import { type ComponentProps } from '@stitches/react'

import {
  FloatingBarAnnotationTools,
  FloatingBarSegmentationTools
} from '@renderer/components/floatingbar'

import { useImageStore } from '@renderer/store'
import { AnnotationUtils } from '@common/utils'

import { ProcessType } from '@common/types/process'
import { EToolType } from '@common/constants/tools'

import { PROCESS_ALLOWED_TYPES } from '@common/constants/processes'

import * as S from './styled'

type TFloatingBarProps = ComponentProps<typeof S.Root>

const SAM_ALLOWED_TYPES = PROCESS_ALLOWED_TYPES[ProcessType.SAM_EMBEDDINGS]

const FloatingBar = (props: TFloatingBarProps) => {
  const isAnnotationToolSelected = useImageStore(
    (state) => state.activeTool().type === EToolType.ANNOTATION
  )

  const isAnnotationSelected = useImageStore((state) => {
    const selectedAnnotation = state.getSelectedAnnotation()
    if (!selectedAnnotation) return false
    const type = AnnotationUtils.from(selectedAnnotation).type
    if (type === 'unknown') return false
    return !isAnnotationToolSelected && SAM_ALLOWED_TYPES.includes(type)
  })

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
