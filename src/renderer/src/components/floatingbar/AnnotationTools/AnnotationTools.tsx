import { memo, useCallback } from 'react'
import { type ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'

import {
  Box,
  Chip,
  Icon,
  Kbd,
  Select,
  Text,
  Toolbar,
  Tooltip
} from '@renderer/ui'
import { useImageStore } from '@renderer/store'

import { type TAnnotationClass } from '@common/types/annotation'

import { ETool, EToolType, TOOL_ICON_MAP } from '@common/constants/tools'
import { HOTKEYS } from '@common/constants/hotkeys'

type TToolIcon = ComponentProps<typeof Icon>['name']
type TFloatingBarAnnotationToolsProps = ComponentProps<typeof Box>

const GROUP = 'annotation-tools'

const AnnotationTools = ({
  css,
  ...rest
}: TFloatingBarAnnotationToolsProps) => {
  const { t } = useTranslation(['common', 'annotation'])

  const classes = useImageStore((state) => state.getClasses())
  const activeClass = useImageStore((state) => state.getActiveClass())
  const setActiveClass = useImageStore((state) => state.setActiveClass)
  const resetActiveClass = useImageStore((state) => state.resetActiveClass)

  const annotationTool = useImageStore((state) => state.annotationTool())
  const toggleAnnotationTool = useImageStore(
    (state) => state.toggleAnnotationTool
  )

  const handleActiveClass = useCallback(
    (value: string) => {
      if (value === '-') return resetActiveClass()
      setActiveClass(value)
    },
    [resetActiveClass, setActiveClass]
  )

  const renderClass = useCallback(
    (item: TAnnotationClass) => (
      <Select.Item key={item.id} value={item.id}>
        <Chip small auto css={{ $$color: item.color }} data-class-id={item.id}>
          {item.name}
        </Chip>
      </Select.Item>
    ),
    []
  )

  return (
    <Box
      aria-description={t('aria.description.annotationTools')}
      css={{
        flexDirection: 'row',
        paddingRight: '$1',
        ...css
      }}
      {...rest}
    >
      <Toolbar.Root orientation="horizontal" role="toolbar">
        <Toolbar.Group
          type="single"
          orientation="horizontal"
          value={annotationTool.value}
          onValueChange={toggleAnnotationTool}
        >
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group={GROUP}
                value={ETool.RECTANGLE}
                aria-label={ETool.RECTANGLE}
                aria-labelledby={EToolType.ANNOTATION}
                isActive={annotationTool.value === ETool.RECTANGLE}
              >
                <Icon
                  name={TOOL_ICON_MAP[ETool.RECTANGLE] as TToolIcon}
                  width={15}
                  height={15}
                />
              </Toolbar.Toggle>
            </Tooltip.Trigger>

            <Tooltip.Content side="bottom" align="center">
              <Text>{t(`tooltips.tools.${ETool.RECTANGLE}`)}</Text>
              <Kbd
                keys={HOTKEYS.tools[ETool.RECTANGLE]}
                css={{ color: '$dark4' }}
              />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group={GROUP}
                value={ETool.CIRCLE}
                aria-label={ETool.CIRCLE}
                aria-labelledby={EToolType.ANNOTATION}
                isActive={annotationTool.value === ETool.CIRCLE}
              >
                <Icon
                  name={TOOL_ICON_MAP[ETool.CIRCLE] as TToolIcon}
                  width={15}
                  height={15}
                />
              </Toolbar.Toggle>
            </Tooltip.Trigger>

            <Tooltip.Content side="bottom" align="center">
              <Text>{t(`tooltips.tools.${ETool.CIRCLE}`)}</Text>
              <Kbd
                keys={HOTKEYS.tools[ETool.CIRCLE]}
                css={{ color: '$dark4' }}
              />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group={GROUP}
                value={ETool.ELLIPSE}
                aria-label={ETool.ELLIPSE}
                aria-labelledby={EToolType.ANNOTATION}
                isActive={annotationTool.value === ETool.ELLIPSE}
              >
                <Icon
                  name={TOOL_ICON_MAP[ETool.ELLIPSE] as TToolIcon}
                  width={15}
                  height={15}
                />
              </Toolbar.Toggle>
            </Tooltip.Trigger>

            <Tooltip.Content side="bottom" align="center">
              <Text>{t(`tooltips.tools.${ETool.ELLIPSE}`)}</Text>
              <Kbd
                keys={HOTKEYS.tools[ETool.ELLIPSE]}
                css={{ color: '$dark4' }}
              />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group={GROUP}
                value={ETool.POLYGON}
                aria-label={ETool.POLYGON}
                aria-labelledby={EToolType.ANNOTATION}
                isActive={annotationTool.value === ETool.POLYGON}
              >
                <Icon
                  name={TOOL_ICON_MAP[ETool.POLYGON] as TToolIcon}
                  width={15}
                  height={15}
                />
              </Toolbar.Toggle>
            </Tooltip.Trigger>

            <Tooltip.Content side="bottom" align="center">
              <Text>{t(`tooltips.tools.${ETool.POLYGON}`)}</Text>
              <Kbd
                keys={HOTKEYS.tools[ETool.POLYGON]}
                css={{ color: '$dark4' }}
              />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group={GROUP}
                value={ETool.POINT}
                aria-label={ETool.POINT}
                aria-labelledby={EToolType.ANNOTATION}
                isActive={annotationTool.value === ETool.POINT}
              >
                <Icon
                  name={TOOL_ICON_MAP[ETool.POINT] as TToolIcon}
                  width={15}
                  height={15}
                />
              </Toolbar.Toggle>
            </Tooltip.Trigger>

            <Tooltip.Content side="bottom" align="center">
              <Text>{t(`tooltips.tools.${ETool.POINT}`)}</Text>
              <Kbd
                keys={HOTKEYS.tools[ETool.POINT]}
                css={{ color: '$dark4' }}
              />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group={GROUP}
                value={ETool.FREEHAND}
                aria-label={ETool.FREEHAND}
                aria-labelledby={EToolType.ANNOTATION}
                isActive={annotationTool.value === ETool.FREEHAND}
              >
                <Icon
                  name={TOOL_ICON_MAP[ETool.FREEHAND] as TToolIcon}
                  width={15}
                  height={15}
                />
              </Toolbar.Toggle>
            </Tooltip.Trigger>

            <Tooltip.Content side="bottom" align="center">
              <Text>{t(`tooltips.tools.${ETool.FREEHAND}`)}</Text>
              <Kbd
                keys={HOTKEYS.tools[ETool.FREEHAND]}
                css={{ color: '$dark4' }}
              />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group={GROUP}
                value={ETool.NUCLICK_POINT}
                aria-label={ETool.NUCLICK_POINT}
                aria-labelledby={EToolType.ANNOTATION}
                isActive={annotationTool.value === ETool.NUCLICK_POINT}
              >
                <Icon
                  name={TOOL_ICON_MAP[ETool.NUCLICK_POINT] as TToolIcon}
                  width={15}
                  height={15}
                />
              </Toolbar.Toggle>
            </Tooltip.Trigger>

            <Tooltip.Content side="bottom" align="center">
              <Box
                css={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '$1'
                }}
              >
                <Icon
                  name="AiIcon"
                  width={12}
                  height={12}
                  css={{ color: '$blue2' }}
                />
                <Text>{t(`tooltips.tools.${ETool.NUCLICK_POINT}`)}</Text>
              </Box>
              <Kbd
                keys={HOTKEYS.tools[ETool.NUCLICK_POINT]}
                css={{ color: '$dark4' }}
              />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>
        </Toolbar.Group>

        <Toolbar.Separator orientation="vertical" />

        <Select.Root
          value={activeClass?.id || ''}
          onValueChange={handleActiveClass}
        >
          <Select.Trigger>
            <Select.Value
              placeholder={t('annotation:properties.class.placeholder')}
            />
          </Select.Trigger>

          <Select.Content
            css={{
              background: '$dark1',
              padding: '$2',
              borderRadius: '$7',

              borderWidth: '$1',
              borderStyle: '$solid',
              borderColor: '$dark3',

              '& > div': {
                display: 'flex',
                flexDirection: 'column',
                gap: '$1'
              }
            }}
          >
            <Select.Item value="-">
              {t('annotation:properties.class.empty')}
            </Select.Item>

            {classes.map(renderClass)}
          </Select.Content>
        </Select.Root>
      </Toolbar.Root>
    </Box>
  )
}

export default memo(AnnotationTools) as typeof AnnotationTools
