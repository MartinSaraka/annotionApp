import { memo } from 'react'
import { type ComponentProps } from '@stitches/react'
import { Box} from '@renderer/ui'

import * as S from './styled'

import logo from '../../../../../../resources/logo-dark.svg'

type TDashboardTopBarProps = ComponentProps<typeof S.Root>

const DashboardTopBar = (props: TDashboardTopBarProps) => {



  return (
    <S.Root {...props}>
      <Box
        as="img"
        src={logo}
        height={18}
        alt="AnnotAid Logo"
        css={{ filter: 'drop-shadow(0 0 1px $colors$dark1)' }}
      />

    </S.Root>
  )
}

export default memo(DashboardTopBar) as typeof DashboardTopBar
