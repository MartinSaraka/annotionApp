import { memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { OpenSeadragonPreview } from '@renderer/ui/openseadragon'
import {
  RightBarAnnotationInfo,
  RightBarImageInfo
} from '@renderer/components/rightbar'
import { useImageStore } from '@renderer/store'

import * as S from './styled'
import { ScrollArea } from '@renderer/ui'

type TRightBarProps = ComponentProps<typeof S.Root>

const RightBar = (props: TRightBarProps) => {
  const selectedAnnotation = useImageStore((state) =>
    state.getSelectedAnnotation()
  )

  return (
    <S.Root {...props}>
      <ScrollArea
        fade
        orientation="vertical"
        css={{ maxHeight: '100%', flex: '1 1 auto', minHeight: 0 }}
      >
        <S.Inner>
          <OpenSeadragonPreview visible={!!selectedAnnotation} />

          {selectedAnnotation ? (
            <RightBarAnnotationInfo />
          ) : (
            <RightBarImageInfo />
          )}
        </S.Inner>
      </ScrollArea>
    </S.Root>
  )
}

export default memo(RightBar) as typeof RightBar
