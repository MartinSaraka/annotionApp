import { useCallback, useRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { PlusCircledIcon } from '@radix-ui/react-icons'

import { Box, FileTab, ScrollArea } from '@renderer/ui'
import { useImageStore } from '@renderer/store'
import { onNextTick } from '@common/utils/global'

import * as S from './styled'

type TFileTabsProps = ComponentProps<typeof Box>

const FileTabs = (props: TFileTabsProps) => {
  const { tabs, getData, selected, select, close, addEmptyTab } =
    useImageStore()

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleAddEmptyTab = () => {
    addEmptyTab()

    onNextTick(() => {
      buttonRef?.current?.scrollIntoView({
        behavior: 'smooth'
      })
    })
  }

  const renderItems = useCallback(
    (tab: (typeof tabs)[number]) => (
      <FileTab
        key={`top-bar-tab-${tab}`}
        isActive={tab === selected}
        onSelect={() => select(tab)}
        onClose={() => close(tab)}
        data={getData(tab)}
      />
    ),
    [selected, select, close]
  )

  return (
    <Box
      {...props}
      as="nav"
      css={{
        flexDirection: 'row',
        minHeight: 29
      }}
    >
      <ScrollArea orientation="horizontal">
        <Box css={{ flexDirection: 'row' }}>
          {tabs.map(renderItems)}

          <S.AddTabButton ref={buttonRef} onClick={handleAddEmptyTab}>
            <PlusCircledIcon />
          </S.AddTabButton>
        </Box>
      </ScrollArea>
    </Box>
  )
}

export default FileTabs
