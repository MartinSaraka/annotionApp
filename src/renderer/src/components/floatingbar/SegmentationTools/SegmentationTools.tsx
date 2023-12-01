import { memo, useCallback } from 'react'
import { type ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'

import { Alert, Box, Button, Icon, Text, Toolbar, Tooltip } from '@renderer/ui'

import {
  useImageStore,
  useProcessStore,
  useSegmentStore
} from '@renderer/store'
import { useToggle } from '@renderer/hooks'

import { ProcessType } from '@common/types/process'
import { ETool, EToolType, TOOL_ICON_MAP } from '@common/constants/tools'

type TToolIcon = ComponentProps<typeof Icon>['name']
type TFloatingBarSegmentationToolsProps = ComponentProps<typeof Box>

const GROUP = 'segmentation-tools'

// TODO: move alert to a separate component

const SegmentationTools = ({
  css,
  ...rest
}: TFloatingBarSegmentationToolsProps) => {
  const { t } = useTranslation('common')

  const { visible, show, set } = useToggle()

  const selectedAnnotation = useImageStore((state) =>
    state.getSelectedAnnotation()
  )
  const hasEmbedding = useSegmentStore(
    (state) => !!selectedAnnotation && state.hasEmbedding(selectedAnnotation.id)
  )

  const segmentationTool = useImageStore((state) => state.segmentationTool())
  const toggleSegmentationTool = useImageStore(
    (state) => state.toggleSegmentationTool
  )

  const addProcess = useProcessStore((state) => state.addProcess)
  const process = useProcessStore((state) => {
    if (!selectedAnnotation) return null
    const processes = state.getAnnotationProcesses(selectedAnnotation.id)
    return (
      processes.find(
        (process) => process.type === ProcessType.SAM_EMBEDDINGS
      ) || null
    )
  })

  const handleRunSegmentation = useCallback(() => {
    if (!selectedAnnotation) return
    addProcess(ProcessType.SAM_EMBEDDINGS, selectedAnnotation.id)
  }, [addProcess, selectedAnnotation])

  return (
    <>
      <Alert.Root open={visible} onOpenChange={set}>
        <Alert.Content>
          <Alert.Header>
            <Alert.Title asChild>
              <Text variant="lg" css={{ fontWeight: 500 }}>
                Start segmentation
              </Text>
            </Alert.Title>
          </Alert.Header>

          <Box css={{ padding: '$4', gap: '$4' }}>
            {process ? (
              <Text>Process running: {process.status.message}</Text>
            ) : (
              <Button onClick={handleRunSegmentation}>Run segmentation</Button>
            )}

            <Box css={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Alert.Cancel>
                <Button outlined>Cancel</Button>
              </Alert.Cancel>
            </Box>
          </Box>
        </Alert.Content>
      </Alert.Root>

      <Box
        aria-description={t('aria.description.segmentationTools')}
        css={{
          flexDirection: 'row',
          ...css
        }}
        {...rest}
      >
        <Toolbar.Root orientation="horizontal" role="toolbar">
          <Toolbar.Group
            type="single"
            orientation="horizontal"
            value={segmentationTool?.value}
            onValueChange={hasEmbedding ? toggleSegmentationTool : show}
          >
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Toolbar.Toggle
                  group={GROUP}
                  value={ETool.SAM_FOREGROUND}
                  aria-label={ETool.SAM_FOREGROUND}
                  aria-labelledby={EToolType.SEGMENTATION}
                  isActive={segmentationTool?.value === ETool.SAM_FOREGROUND}
                >
                  <Icon
                    name={TOOL_ICON_MAP[ETool.SAM_FOREGROUND] as TToolIcon}
                    width={15}
                    height={15}
                  />
                </Toolbar.Toggle>
              </Tooltip.Trigger>

              <Tooltip.Content side="bottom" align="center">
                <Text>{t(`tooltips.tools.${ETool.SAM_FOREGROUND}`)}</Text>
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Toolbar.Toggle
                  group={GROUP}
                  value={ETool.SAM_BACKGROUND}
                  aria-label={ETool.SAM_BACKGROUND}
                  aria-labelledby={EToolType.SEGMENTATION}
                  isActive={segmentationTool?.value === ETool.SAM_BACKGROUND}
                >
                  <Icon
                    name={TOOL_ICON_MAP[ETool.SAM_BACKGROUND] as TToolIcon}
                    width={15}
                    height={15}
                  />
                </Toolbar.Toggle>
              </Tooltip.Trigger>

              <Tooltip.Content side="bottom" align="center">
                <Text>{t(`tooltips.tools.${ETool.SAM_BACKGROUND}`)}</Text>
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Toolbar.Toggle
                  group={GROUP}
                  value={ETool.SAM_BBOX}
                  aria-label={ETool.SAM_BBOX}
                  aria-labelledby={EToolType.SEGMENTATION}
                  isActive={segmentationTool?.value === ETool.SAM_BBOX}
                >
                  <Icon
                    name={TOOL_ICON_MAP[ETool.SAM_BBOX] as TToolIcon}
                    width={15}
                    height={15}
                  />
                </Toolbar.Toggle>
              </Tooltip.Trigger>

              <Tooltip.Content side="bottom" align="center">
                <Text>{t(`tooltips.tools.${ETool.SAM_BBOX}`)}</Text>
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Root>
          </Toolbar.Group>
        </Toolbar.Root>
      </Box>
    </>
  )
}

export default memo(SegmentationTools) as typeof SegmentationTools
