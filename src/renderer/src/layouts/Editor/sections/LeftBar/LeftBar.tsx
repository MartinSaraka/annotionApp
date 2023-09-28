import { memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { LeftBarAnnotationList } from '@renderer/components/leftbar'

import * as S from './styled'

type TLeftBarProps = ComponentProps<typeof S.Root>

const LeftBar = (props: TLeftBarProps) => (
  <S.Root {...props}>
    <LeftBarAnnotationList />
  </S.Root>
)

export default memo(LeftBar) as typeof LeftBar
