import { memo, MouseEvent, useCallback } from 'react'
import { ComponentProps } from '@stitches/react'

import { Box, Button, FileTab, ScrollArea } from '@renderer/ui'
import { useImageStore } from '@renderer/store'
import { onNextTick } from '@common/utils/global'

import * as S from './styled'
import { PlusIcon } from '@radix-ui/react-icons'

type TTabListProps = ComponentProps<typeof S.Root>

const TabList = ({ css, ...rest }: TTabListProps) => {
  const { tabs, getData, selected, select, close, addEmptyTab } =
    useImageStore()

  const handleClose = useCallback(
    (tab: (typeof tabs)[number]) => () => close(tab),
    [close]
  )

  const handleSelect = useCallback(
    (tab: (typeof tabs)[number]) => (event: MouseEvent<HTMLButtonElement>) => {
      select(tab)

      onNextTick(() => {
        event?.currentTarget?.scrollIntoView({
          behavior: 'smooth'
        })
      })
    },
    [select]
  )

  const renderItems = useCallback(
    (tab: (typeof tabs)[number]) => (
      <FileTab
        key={`app-bar-tab-${tab}`}
        isActive={tab === selected}
        onSelect={handleSelect(tab)}
        onClose={handleClose(tab)}
        data={getData(tab)}
        name={tab}
      />
    ),
    [selected, handleSelect, handleClose]
  )

  return (
    <S.Root css={{ _appRegion: 'no-drag', ...css }} {...rest}>
      <ScrollArea orientation="horizontal">
        <Box css={{ flexDirection: 'row', alignItems: 'scretch' }}>
          {tabs.map(renderItems)}

          {!tabs.includes('empty') && (
            <Box css={{ paddingInline: '$1', justifyContent: 'center' }}>
              <Button ghost aria-label="empty-tab" onClick={addEmptyTab}>
                <Box
                  as={PlusIcon}
                  width={14}
                  height={14}
                  css={{ display: 'block', color: '$dark4' }}
                />
              </Button>
            </Box>
          )}
        </Box>
      </ScrollArea>
    </S.Root>
  )
}

export default memo(TabList) as typeof TabList
