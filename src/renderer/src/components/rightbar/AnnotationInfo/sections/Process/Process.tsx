import { memo, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Button, Icon, List, Popover, Text, Tooltip } from '@renderer/ui'
import { ProcessItem } from '@renderer/components'
import { SelectProcessPopover } from '@renderer/popovers'

import { useImageStore, useProcessStore } from '@renderer/store'
import { TProcess } from '@common/types/process'

const Process = () => {
  const { t } = useTranslation(['process'])

  const closeRef = useRef<HTMLButtonElement | null>(null)

  const annotation = useImageStore((state) => state.getSelectedAnnotation())
  const stopProcess = useProcessStore((state) => state.stopProcess)
  const activeProcesses = useProcessStore((state) =>
    annotation ? state.getAnnotationProcesses(annotation.id) : []
  )

  const handleClosePopover = useCallback(() => {
    closeRef.current?.click()
  }, [closeRef])

  const renderActiveProcess = useCallback(
    (process: TProcess) => (
      <ProcessItem
        key={`${process.type}-${process.id}`}
        type={process.type}
        status={process.status.type}
        title={t(`process:processes.${process.type}.title`)}
        description={process.status.message}
        onStop={() => stopProcess(process.id)}
      />
    ),
    [t, stopProcess]
  )

  return (
    <Popover.Root>
      <Popover.Anchor>
        <List
          title={
            <Box
              css={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '$1'
              }}
            >
              <Icon
                name="AiIcon"
                width={13}
                height={13}
                css={{ color: '$blue2' }}
              />

              <span>Processes</span>
            </Box>
          }
          actions={
            <>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Popover.Trigger asChild>
                    <Button ghost condensed css={{ margin: '-$1' }}>
                      <Icon name="TokensIcon" width={16} height={16} />
                    </Button>
                  </Popover.Trigger>
                </Tooltip.Trigger>

                <Tooltip.Content>
                  <Text variant="base">Select process</Text>
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip.Root>

              <Popover.Close ref={closeRef} css={{ display: 'none' }} />
            </>
          }
        >
          {!!activeProcesses.length && (
            <List.Box css={{ flex: 1 }}>
              {activeProcesses?.map(renderActiveProcess)}
            </List.Box>
          )}
        </List>
      </Popover.Anchor>

      <Popover.Content>
        <SelectProcessPopover onClose={handleClosePopover} />
      </Popover.Content>
    </Popover.Root>
  )
}

export default memo(Process)
