import { memo, useCallback, useEffect } from 'react'
import { ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'

import { Box, Icon, Kbd, Text, Toolbar, Tooltip } from '@renderer/ui'
import {
  useAnnotoriousStore,
  useHotkeysStore,
  useImageStore,
  useOpenSeadragonStore
} from '@renderer/store'

import { ETool, EToolType, TOOLS, TOOL_ICON_MAP } from '@common/constants/tools'
import { OPEN_SEADRAGON_HOME_ID } from '@common/constants/viewer'
import { HOTKEYS } from '@common/constants/hotkeys'

type TToolIcon = ComponentProps<typeof Icon>['name']
type TTopBarMiddleProps = ComponentProps<typeof Box>

const Middle = ({ css, ...rest }: TTopBarMiddleProps) => {
  const { t } = useTranslation('common')

  const { addShortcut, removeShortcut } = useHotkeysStore()
  const annotorious = useAnnotoriousStore((state) => state.anno)

  const activeTool = useImageStore((state) => state.activeTool())
  const toggleActiveTool = useImageStore((state) => state.toggleActiveTool)

  const annotationTool = useImageStore((state) => state.annotationTool())
  const toggleAnnotationTool = useImageStore(
    (state) => state.toggleAnnotationTool
  )

  const setAnnotoriousTool = useAnnotoriousStore((state) => state.setTool)
  const resetAnnotoriousTool = useAnnotoriousStore((state) => state.resetTool)

  const setViewerTool = useOpenSeadragonStore((state) => state.setTool)
  const resetViewerTool = useOpenSeadragonStore((state) => state.resetTool)

  useEffect(() => {
    resetAnnotoriousTool()
    resetViewerTool()

    if (activeTool.type === EToolType.ANNOTATION) {
      return setAnnotoriousTool(activeTool.value)
    }

    if (activeTool.type === EToolType.VIEWER) {
      return setViewerTool(activeTool.value)
    }
  }, [activeTool.value, annotorious])

  const setInitialZoom = useCallback(() => {
    if (!annotorious._app.current.__v.props.viewer.viewport) return
    annotorious._app.current.__v.props.viewer.viewport.goHome()
  }, [annotorious])

  const handleKeyboardShortcut = useCallback(
    (tool: ETool) => () => {
      if (TOOLS[tool].type === EToolType.VIEWER) toggleActiveTool(tool)
      if (TOOLS[tool].type === EToolType.ANNOTATION) toggleAnnotationTool(tool)
    },
    [toggleActiveTool, toggleAnnotationTool]
  )

  useEffect(() => {
    addShortcut(HOTKEYS.fitToScreen, setInitialZoom)

    addShortcut(HOTKEYS.tools[ETool.HAND], handleKeyboardShortcut(ETool.HAND))
    addShortcut(
      HOTKEYS.tools[ETool.ZOOM_IN],
      handleKeyboardShortcut(ETool.ZOOM_IN)
    )
    addShortcut(
      HOTKEYS.tools[ETool.RECTANGLE],
      handleKeyboardShortcut(ETool.RECTANGLE)
    )
    addShortcut(
      HOTKEYS.tools[ETool.CIRCLE],
      handleKeyboardShortcut(ETool.CIRCLE)
    )
    addShortcut(
      HOTKEYS.tools[ETool.ELLIPSE],
      handleKeyboardShortcut(ETool.ELLIPSE)
    )
    addShortcut(
      HOTKEYS.tools[ETool.POLYGON],
      handleKeyboardShortcut(ETool.POLYGON)
    )
    addShortcut(HOTKEYS.tools[ETool.POINT], handleKeyboardShortcut(ETool.POINT))
    addShortcut(
      HOTKEYS.tools[ETool.FREEHAND],
      handleKeyboardShortcut(ETool.FREEHAND)
    )
    addShortcut(
      HOTKEYS.tools[ETool.NUCLICK_POINT],
      handleKeyboardShortcut(ETool.NUCLICK_POINT)
    )

    return () => {
      removeShortcut(HOTKEYS.fitToScreen)

      removeShortcut(HOTKEYS.tools[ETool.HAND])
      removeShortcut(HOTKEYS.tools[ETool.ZOOM_IN])

      removeShortcut(HOTKEYS.tools[ETool.RECTANGLE])
      removeShortcut(HOTKEYS.tools[ETool.CIRCLE])
      removeShortcut(HOTKEYS.tools[ETool.ELLIPSE])
      removeShortcut(HOTKEYS.tools[ETool.POLYGON])
      removeShortcut(HOTKEYS.tools[ETool.POINT])
      removeShortcut(HOTKEYS.tools[ETool.FREEHAND])
      removeShortcut(HOTKEYS.tools[ETool.NUCLICK_POINT])
    }
  }, [addShortcut, removeShortcut, handleKeyboardShortcut, setInitialZoom])

  return (
    <Box
      aria-description={t('aria.description.toolbar')}
      css={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 'calc($3 - 2px)',
        ...css
      }}
      {...rest}
    >
      <Toolbar.Root orientation="horizontal" role="toolbar">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Toolbar.Button id={OPEN_SEADRAGON_HOME_ID}>
              <Icon name="EnterFullScreenIcon" width={18} height={18} />
            </Toolbar.Button>
          </Tooltip.Trigger>

          <Tooltip.Content side="bottom" align="center">
            <Text variant="base">{t('tooltips.fitToScreen')}</Text>
            <Kbd keys={HOTKEYS.fitToScreen} css={{ color: '$dark4' }} />
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Root>

        <Toolbar.Separator orientation="vertical" />

        <Toolbar.Group
          type="single"
          orientation="horizontal"
          value={activeTool.value}
          onValueChange={toggleActiveTool}
        >
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group="tools"
                value={ETool.HAND}
                aria-label={ETool.HAND}
                aria-labelledby={EToolType.VIEWER}
                isActive={activeTool.value === ETool.HAND}
              >
                <Icon
                  name={TOOL_ICON_MAP[ETool.HAND] as TToolIcon}
                  width={18}
                  height={18}
                />
              </Toolbar.Toggle>
            </Tooltip.Trigger>

            <Tooltip.Content side="bottom" align="center">
              <Text variant="base">{t(`tooltips.tools.${ETool.HAND}`)}</Text>
              <Kbd keys={HOTKEYS.tools[ETool.HAND]} css={{ color: '$dark4' }} />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group="tools"
                value={ETool.ZOOM_IN}
                aria-label={ETool.ZOOM_IN}
                aria-labelledby={EToolType.VIEWER}
                isActive={activeTool.value === ETool.ZOOM_IN}
              >
                <Icon
                  name={TOOL_ICON_MAP[ETool.ZOOM_IN] as TToolIcon}
                  width={18}
                  height={18}
                />
              </Toolbar.Toggle>
            </Tooltip.Trigger>

            <Tooltip.Content side="bottom" align="center">
              <Text variant="base">{t(`tooltips.tools.${ETool.ZOOM_IN}`)}</Text>
              <Kbd
                keys={HOTKEYS.tools[ETool.ZOOM_IN]}
                css={{ color: '$dark4' }}
              />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Toolbar.Separator orientation="vertical" />

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group="tools"
                value={annotationTool.value}
                aria-label={annotationTool.value}
                aria-labelledby={EToolType.ANNOTATION}
                isActive={activeTool.value === annotationTool.value}
              >
                <Icon
                  name={TOOL_ICON_MAP[annotationTool.value] as TToolIcon}
                  width={18}
                  height={18}
                />

                <Icon
                  name="TriangleRightIcon"
                  css={{
                    transform: 'rotate(45deg)',
                    pointerEvents: 'none',
                    position: 'absolute',
                    bottom: 2,
                    right: 2
                  }}
                  width={10}
                  height={10}
                />
              </Toolbar.Toggle>
            </Tooltip.Trigger>

            <Tooltip.Content side="bottom" align="center">
              <Text variant="base">{t(`tooltips.tools.annotation`)}</Text>
              <Kbd
                keys={HOTKEYS.tools[ETool.RECTANGLE]}
                css={{ color: '$dark4' }}
              />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          {/*<Select.Root
            value={annotationTool.value}
            onValueChange={toggleAnnotationTool}
          >
            <Box>
              <Select.Value asChild>
                <Toolbar.Toggle
                  group="tools"
                  value={annotationTool.value}
                  aria-label={annotationTool.value}
                  aria-labelledby={EToolType.ANNOTATION}
                  isActive={activeTool.value === annotationTool.value}
                  css={{ pointerEvents: 'all !important' }}
                >
                  <Icon
                    name={TOOL_ICON_MAP[annotationTool.value] as TToolIcon}
                    width={18}
                    height={18}
                  />
                </Toolbar.Toggle>
              </Select.Value>

              <Select.Trigger
                css={{
                  position: 'absolute',
                  pointerEvents: 'all !important',
                  inset: 0
                }}
              >
                <Select.Icon>
                  <Icon
                    name="TriangleRightIcon"
                    css={{ transform: 'rotate(45deg)' }}
                    width={10}
                    height={10}
                  />
                </Select.Icon>
              </Select.Trigger>
            </Box>

            <Select.Content>
              <Select.Item value={ETool.RECTANGLE}>
                <Toolbar.Toggle
                  group="tools-select"
                  value={ETool.RECTANGLE}
                  aria-label={ETool.RECTANGLE}
                  aria-labelledby={EToolType.ANNOTATION}
                >
                  <Icon
                    name={TOOL_ICON_MAP[ETool.RECTANGLE] as TToolIcon}
                    width={18}
                    height={18}
                  />
                </Toolbar.Toggle>
              </Select.Item>

              <Select.Item value={ETool.CIRCLE}>
                <Toolbar.Toggle
                  group="tools-select"
                  value={ETool.CIRCLE}
                  aria-label={ETool.CIRCLE}
                  aria-labelledby={EToolType.ANNOTATION}
                >
                  <Icon
                    name={TOOL_ICON_MAP[ETool.CIRCLE] as TToolIcon}
                    width={18}
                    height={18}
                  />
                </Toolbar.Toggle>
              </Select.Item>

              <Select.Item value={ETool.ELLIPSE}>
                <Toolbar.Toggle
                  group="tools-select"
                  value={ETool.ELLIPSE}
                  aria-label={ETool.ELLIPSE}
                  aria-labelledby={EToolType.ANNOTATION}
                >
                  <Icon
                    name={TOOL_ICON_MAP[ETool.ELLIPSE] as TToolIcon}
                    width={18}
                    height={18}
                  />
                </Toolbar.Toggle>
              </Select.Item>

              <Select.Item value={ETool.POLYGON}>
                <Toolbar.Toggle
                  group="tools-select"
                  value={ETool.POLYGON}
                  aria-label={ETool.POLYGON}
                  aria-labelledby={EToolType.ANNOTATION}
                >
                  <Icon
                    name={TOOL_ICON_MAP[ETool.POLYGON] as TToolIcon}
                    width={18}
                    height={18}
                  />
                </Toolbar.Toggle>
              </Select.Item>

              <Select.Item value={ETool.POINT}>
                <Toolbar.Toggle
                  group="tools-select"
                  value={ETool.POINT}
                  aria-label={ETool.POINT}
                  aria-labelledby={EToolType.ANNOTATION}
                >
                  <Icon
                    name={TOOL_ICON_MAP[ETool.POINT] as TToolIcon}
                    width={18}
                    height={18}
                  />
                </Toolbar.Toggle>
              </Select.Item>

              <Select.Item value={ETool.FREEHAND}>
                <Toolbar.Toggle
                  group="tools-select"
                  value={ETool.FREEHAND}
                  aria-label={ETool.FREEHAND}
                  aria-labelledby={EToolType.ANNOTATION}
                >
                  <Icon
                    name={TOOL_ICON_MAP[ETool.FREEHAND] as TToolIcon}
                    width={18}
                    height={18}
                  />
                </Toolbar.Toggle>
              </Select.Item>

              <Select.Item value={ETool.NUCLICK_POINT}>
                <Toolbar.Toggle
                  group="tools-select"
                  value={ETool.NUCLICK_POINT}
                  aria-label={ETool.NUCLICK_POINT}
                  aria-labelledby={EToolType.ANNOTATION}
                >
                  <Icon
                    name={TOOL_ICON_MAP[ETool.NUCLICK_POINT] as TToolIcon}
                    width={18}
                    height={18}
                  />
                </Toolbar.Toggle>
              </Select.Item>
            </Select.Content>
              </Select.Root>*/}
        </Toolbar.Group>
      </Toolbar.Root>
    </Box>
  )
}

export default memo(Middle) as typeof Middle
