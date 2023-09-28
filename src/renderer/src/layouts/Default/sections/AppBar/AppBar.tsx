import { memo } from 'react'
import { ComponentProps } from '@stitches/react'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'

import { Box, Button } from '@renderer/ui'
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
      <Button ghost aria-label="report" css={{ _appRegion: 'no-drag' }}>
        <QuestionMarkCircledIcon width={15} height={15} />
      </Button>
    </S.Aside>
  </S.Root>
)

export default memo(AppBar) as typeof AppBar
