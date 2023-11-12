import { memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { useImageStore } from '@renderer/store'
import { EToolType } from '@common/constants/tools'

import { FloatingBarAnnotationTools } from '@renderer/components/floatingbar'

import * as S from './styled'

type TFloatingBarProps = ComponentProps<typeof S.Root>

const FloatingBar = (props: TFloatingBarProps) => {
  const isAnnotationToolSelected = useImageStore(
    (state) => state.activeTool().type === EToolType.ANNOTATION
  )

  const isAnnotationSelected = useImageStore(
    (state) => !!state.getSelectedAnnotation()
  )

  if (!isAnnotationToolSelected && !isAnnotationSelected) return null

  return (
    <S.Root {...props}>
      <S.Content>
        {isAnnotationToolSelected ? (
          <FloatingBarAnnotationTools />
        ) : isAnnotationSelected ? (
          <p>todo</p>
        ) : null}
      </S.Content>
    </S.Root>
  )
}

export default memo(FloatingBar) as typeof FloatingBar
