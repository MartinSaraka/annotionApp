import { memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { Box, Button, Icon } from '@renderer/ui'
import { TabList } from '@renderer/components'

import * as S from './styled'

type TAppBarProps = ComponentProps<typeof Box>

const AppBar = (props: TAppBarProps) => (
  <S.Root {...props}>
    {/* Reserved space for window controls */}
    <Box css={{ width: 54 }} />

    <S.Content>
      <TabList css={{ _appRegion: 'no-drag' }} />
    </S.Content>

    <S.Aside>
      <Button
        outlined
        slim
        css={{ _appRegion: 'no-drag', alignSelf: 'center' }}
      >
        <Icon name="UpdateIcon" width={12} height={12} />
        Update available
      </Button>

      <Button ghost aria-label="report" css={{ _appRegion: 'no-drag' }}>
        <Icon name="QuestionMarkCircledIcon" width={15} height={15} />
      </Button>
    </S.Aside>
  </S.Root>
)

export default memo(AppBar) as typeof AppBar
