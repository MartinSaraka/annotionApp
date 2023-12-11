import { memo } from 'react'
import { type ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'

import { Box, Button, Icon } from '@renderer/ui'
import { useImageStore } from '@renderer/store'

import * as S from './styled'

import logo from '../../../../../../resources/logo-dark.svg'

type TDashboardTopBarProps = ComponentProps<typeof S.Root>

const DashboardTopBar = (props: TDashboardTopBarProps) => {
  const { t } = useTranslation('common')

  const addEmptyTab = useImageStore((state) => state.addEmptyTab)

  return (
    <S.Root {...props}>
      <Box
        as="img"
        src={logo}
        height={18}
        alt="AnnotAid Logo"
        css={{ filter: 'drop-shadow(0 0 1px $colors$dark1)' }}
      />

      <Button onClick={addEmptyTab}>
        <Icon name="FilePlusIcon" width={14} height={14} />
        {t('actions.openNewImage')}
      </Button>
    </S.Root>
  )
}

export default memo(DashboardTopBar) as typeof DashboardTopBar
