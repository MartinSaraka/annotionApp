import { memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { Box } from '@renderer/ui'
import {
  TopBarLeftSide,
  TopBarMiddle,
  TopBarRightSide
} from '@renderer/components/topbar'

import * as S from './styled'

type TTopBarProps = ComponentProps<typeof S.Root>

const TopBar = (props: TTopBarProps) => (
  <S.Root {...props}>
    <Box css={{ flex: 1 }}>
      <TopBarLeftSide />
    </Box>

    <Box css={{ alignItems: 'center' }}>
      <TopBarMiddle />
    </Box>

    <Box css={{ alignItems: 'flex-end', flex: 1 }}>
      <TopBarRightSide />
    </Box>
  </S.Root>
)

export default memo(TopBar) as typeof TopBar
