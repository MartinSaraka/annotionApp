import { memo } from 'react'
import { type ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'

import { Box, Button, Icon } from '@renderer/ui'
import { TabList } from '@renderer/components'
import { TrafficLights } from '@renderer/components/appbar'

import { useAuthStore } from '@renderer/store'

import * as S from './styled'

type TAppBarProps = ComponentProps<typeof Box>

const AppBar = (props: TAppBarProps) => {
  const { t } = useTranslation('common')

  const isAuthenticated = useAuthStore((state) => !!state.user)

  return (
    <S.Root {...props}>
      <TrafficLights />

      <S.Content>
        {isAuthenticated && <TabList css={{ _appRegion: 'no-drag' }} />}
      </S.Content>

      <S.Aside>
        <Button
          outlined
          slim
          css={{ _appRegion: 'no-drag', alignSelf: 'center' }}
        >
          <Icon name="UpdateIcon" width={12} height={12} />
          {t('actions.update.avaiable')}
        </Button>

        <Button
          ghost
          aria-label={t('aria.label.report')}
          css={{ _appRegion: 'no-drag' }}
        >
          <Icon name="QuestionMarkCircledIcon" width={15} height={15} />
        </Button>
      </S.Aside>
    </S.Root>
  )
}

export default memo(AppBar) as typeof AppBar
