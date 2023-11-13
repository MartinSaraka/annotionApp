import { memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { Box, Icon, Kbd, Select, Text, Toolbar, Tooltip } from '@renderer/ui'
import { useImageStore } from '@renderer/store'

import { ETool, EToolType, TOOL_ICON_MAP } from '@common/constants/tools'

type TToolIcon = ComponentProps<typeof Icon>['name']
type TFloatingBarAnnotationToolsProps = ComponentProps<typeof Box>

const AnnotationTools = ({
  css,
  ...rest
}: TFloatingBarAnnotationToolsProps) => {
  const annotationTool = useImageStore((state) => state.annotationTool())
  const toggleAnnotationTool = useImageStore(
    (state) => state.toggleAnnotationTool
  )

  return (
    <Box
      aria-describedby="annotation-tools"
      css={{
        flexDirection: 'row',
        ...css
      }}
      {...rest}
    >
      <Toolbar.Root orientation="horizontal" role="annotation-toolbar">
        <Toolbar.Group
          type="single"
          orientation="horizontal"
          value={annotationTool.value}
          onValueChange={toggleAnnotationTool}
        >
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group="annotation-tools"
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
              <Text variant="base">Rectangle</Text>
              <Kbd keys={['1']} css={{ color: '$dark4' }} />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group="annotation-tools"
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
              <Text variant="base">Circle</Text>
              <Kbd keys={['2']} css={{ color: '$dark4' }} />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group="annotation-tools"
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
              <Text variant="base">Ellipse</Text>
              <Kbd keys={['3']} css={{ color: '$dark4' }} />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group="annotation-tools"
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
              <Text variant="base">Polygon</Text>
              <Kbd keys={['4']} css={{ color: '$dark4' }} />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group="annotation-tools"
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
              <Text variant="base">Point</Text>
              <Kbd keys={['5']} css={{ color: '$dark4' }} />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group="annotation-tools"
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
              <Text variant="base">Freehand</Text>
              <Kbd keys={['6']} css={{ color: '$dark4' }} />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toolbar.Toggle
                group="annotation-tools"
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
                css={{ flexDirection: 'row', alignItems: 'center', gap: '$1' }}
              >
                <Icon
                  name="AiIcon"
                  width={12}
                  height={12}
                  css={{ color: '$blue2' }}
                />
                <Text variant="base">Single click</Text>
              </Box>

              <Kbd keys={['7']} css={{ color: '$dark4' }} />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>
        </Toolbar.Group>

        <Toolbar.Separator orientation="vertical" />

        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Select class" />
          </Select.Trigger>

          <Select.Content>
            <Select.Item value={'foo'}>foo</Select.Item>
            <Select.Item value={'bar'}>bar</Select.Item>
          </Select.Content>
        </Select.Root>
      </Toolbar.Root>
    </Box>
  )
}

export default memo(AnnotationTools) as typeof AnnotationTools
