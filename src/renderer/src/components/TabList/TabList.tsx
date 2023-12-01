import { memo, MouseEvent, useCallback } from 'react'
import { type ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'

import {
  Box,
  Button,
  FileTab,
  Icon,
  ScrollArea,
  Text,
  Tooltip
} from '@renderer/ui'
import { useImageStore } from '@renderer/store'

import { onNextTick } from '@common/utils/global'

import * as S from './styled'

type TTabListProps = ComponentProps<typeof S.Root>

const TabList = ({ css, ...rest }: TTabListProps) => {
  const { t } = useTranslation('common')

  const { tabs, getData, selected, select, close, addEmptyTab } =
    useImageStore()

  const handleClose = useCallback(
    (tab: (typeof tabs)[number]) => () => close(tab),
    [close]
  )

  const handleSelect = useCallback(
    (tab: (typeof tabs)[number]) => (event: MouseEvent<HTMLDivElement>) => {
      select(tab)

      onNextTick(() => {
        event?.currentTarget?.scrollIntoView({
          behavior: 'smooth'
        })
      })
    },
    [select]
  )

  const renderTab = useCallback(
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
          {tabs.map(renderTab)}

          {!tabs.includes('empty') && (
            <Box css={{ paddingInline: '$1', justifyContent: 'center' }}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Button
                    ghost
                    aria-label={t('tooltips.tabs.add')}
                    onClick={addEmptyTab}
                  >
                    <Icon
                      name="PlusIcon"
                      width={14}
                      height={14}
                      css={{ color: '$dark4' }}
                    />
                  </Button>
                </Tooltip.Trigger>

                <Tooltip.Content side="right" align="center">
                  <Text>{t('tooltips.tabs.add')}</Text>
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip.Root>
            </Box>
          )}
        </Box>
      </ScrollArea>
    </S.Root>
  )
}

export default memo(TabList) as typeof TabList
