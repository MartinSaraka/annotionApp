import { memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { OpenSeadragonPreview } from '@renderer/ui/openseadragon'
import {
  RightBarAnnotationInfo,
  RightBarImageInfo
} from '@renderer/components/rightbar'
import { useImageStore } from '@renderer/store'

import * as S from './styled'

type TRightBarProps = ComponentProps<typeof S.Root>

const RightBar = (props: TRightBarProps) => {
  const selectedAnnotation = useImageStore((state) =>
    state.getSelectedAnnotation()
  )

  return (
    <S.Root {...props}>
      <OpenSeadragonPreview visible={!!selectedAnnotation} />

      {selectedAnnotation ? <RightBarAnnotationInfo /> : <RightBarImageInfo />}
    </S.Root>
  )
}

export default memo(RightBar) as typeof RightBar
