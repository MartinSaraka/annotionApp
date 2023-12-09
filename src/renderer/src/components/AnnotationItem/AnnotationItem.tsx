import {
  ComponentProps,
  MouseEventHandler,
  memo,
  useCallback,
  useMemo,
  useRef
} from 'react'
import { Field, Form, Formik, FormikConfig } from 'formik'
import { useTranslation } from 'react-i18next'
import { type NodeModel } from '@minoru/react-dnd-treeview'

import {
  Box,
  Button,
  Chip,
  ContextMenu,
  Icon,
  Kbd,
  Shape,
  Text,
  Toggle,
  Tooltip,
  TreeView
} from '@renderer/ui'
import { NodeContextMenu } from '@renderer/menus'

import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { AnnotationHandler, AnnotoriousHandler } from '@renderer/handlers'
import { type TNodeData } from '@renderer/adapters/TreeAdapter'

import {
  isAnnotationEditable,
  isAnnotationVisible
} from '@common/utils/annotation'
import {
  ANNOTATION_EDITABILITY_ICON_MAP,
  ANNOTATION_VISIBILITY_ICON_MAP
} from '@common/constants/annotation'
import { HOTKEYS } from '@common/constants/hotkeys'

type TFormValues = {
  name: string
}

type TBaseProps = {
  node: NodeModel<TNodeData>
}

type TStyledProps = Omit<ComponentProps<typeof TreeView.Node>, 'children'>

type TAnnotationItemProps = TStyledProps & TBaseProps

const AnnotationItem = ({
  node,
  isSelected,
  onSelect,
  ...rest
}: TAnnotationItemProps) => {
  const { t } = useTranslation('common')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const id = node.id as TID
  const tag = (node.data?.tag || 'path') as React.ElementType
  const editability = node.data?.editability || 'editable'
  const visibility = node.data?.visibility || 'visible'

  const anno = useAnnotoriousStore((state) => state.anno)
  const cancelSelected = useAnnotoriousStore((state) => state.cancelIfSelected)
  const annotoriousHandler = AnnotoriousHandler.instance(anno)

  const annotation = useImageStore((state) => state.getAnnotation(id))
  const saveAnnotation = useImageStore((state) => state.saveAnnotation)
  const update = useAnnotoriousStore((state) => state.saveAndUpdateAnnotation)

  const handleToggleEditable = useCallback(
    async (pressed: boolean) => {
      if (!annotation) return
      const data = AnnotationHandler.setEditability(annotation, !pressed)
      saveAnnotation(data, false)
      await update(data)
      if (!isSelected || pressed) cancelSelected(data)
    },
    [annotation, isSelected]
  )

  const handleToggleVisibility = useCallback(
    async (pressed: boolean) => {
      if (!annotation) return
      const data = AnnotationHandler.setVisibility(annotation, !pressed)
      saveAnnotation(data, false)
      await update(data)
      if (!isSelected || pressed) cancelSelected(data)
    },
    [annotation, isSelected]
  )

  const handleZoomToAnnotation: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        e.stopPropagation()
        if (!annotation) return
        annotoriousHandler.zoomToAnnotation(annotation)
        onSelect()
      },
      [annotation, annotoriousHandler, onSelect]
    )

  const handleMouseEnter = useCallback(() => {
    if (!annotation) return
    annotoriousHandler.highlightAnnotation(annotation, 'on')
  }, [annotation, annotoriousHandler])

  const handleMouseLeave = useCallback(() => {
    if (!annotation) return
    annotoriousHandler.highlightAnnotation(annotation, 'off')
  }, [annotation, annotoriousHandler])

  const handleSetEditable = useCallback(
    (e: React.MouseEvent<HTMLFormElement>) => {
      e.stopPropagation()
      e.preventDefault()
      if (!inputRef.current) return
      inputRef.current.disabled = false
      inputRef.current.focus()
    },
    [inputRef]
  )

  const onSubmit: FormikConfig<TFormValues>['onSubmit'] = useCallback(
    async (values) => {
      if (inputRef.current) inputRef.current.disabled = true
      if (!annotation) return

      const data = AnnotationHandler.upsertBody(
        annotation,
        'TextualBody',
        'naming',
        values.name
      )

      await update(data)
    },
    [inputRef, update, annotation]
  )

  const initialValues: FormikConfig<TFormValues>['initialValues'] = useMemo(
    () => ({
      name: node.text || ''
    }),
    [node]
  )

  return (
    <ContextMenu.Root
      onOpenChange={(open) => {
        if (open) onSelect()
      }}
    >
      <ContextMenu.Trigger asChild>
        <TreeView.Node
          node={node}
          data-node-id={node.id}
          isSelected={isSelected}
          onSelect={onSelect}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          actions={
            <>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Toggle
                    pressed={!isAnnotationEditable(editability)}
                    onPressedChange={handleToggleEditable}
                  >
                    <Button ghost condensed>
                      <Icon
                        name={ANNOTATION_EDITABILITY_ICON_MAP[editability]}
                        width={12}
                        height={12}
                        css={{ color: '$dark4' }}
                      />
                    </Button>
                  </Toggle>
                </Tooltip.Trigger>

                <Tooltip.Content side="bottom" align="center">
                  <Text>
                    {t(
                      `actions.editability.${isAnnotationEditable(editability)}`
                    )}
                  </Text>

                  <Kbd keys={HOTKEYS.editability} css={{ color: '$dark4' }} />
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip.Root>

              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Toggle
                    pressed={!isAnnotationVisible(visibility)}
                    onPressedChange={handleToggleVisibility}
                  >
                    <Button ghost condensed>
                      <Icon
                        name={ANNOTATION_VISIBILITY_ICON_MAP[visibility]}
                        width={12}
                        height={12}
                        css={{ color: '$dark4' }}
                      />
                    </Button>
                  </Toggle>
                </Tooltip.Trigger>

                <Tooltip.Content side="bottom" align="center">
                  <Text>
                    {t(`actions.visibility.${isAnnotationVisible(visibility)}`)}
                  </Text>

                  <Kbd keys={HOTKEYS.visibility} css={{ color: '$dark4' }} />
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip.Root>
            </>
          }
          {...rest}
        >
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button ghost condensed onDoubleClick={handleZoomToAnnotation}>
                <Shape tag={tag} props={node.data?.shape || {}} />
              </Button>
            </Tooltip.Trigger>

            <Tooltip.Content side="right" align="center">
              <Text>{t('tooltips.dblZoomToAnnotation')}</Text>
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Formik<TFormValues>
            validateOnChange
            enableReinitialize
            onSubmit={onSubmit}
            initialValues={initialValues}
          >
            {({ handleSubmit }) => (
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Box
                    as={Form}
                    css={{ display: 'inline', width: '100%' }}
                    onDoubleClick={handleSetEditable}
                  >
                    <input type="submit" hidden />

                    <Field name="name">
                      {({ field }) => (
                        <Text
                          ref={inputRef}
                          as="input"
                          variant="md"
                          disabled
                          required
                          css={{
                            color: '$light',
                            width: '100%',
                            cursor: 'text',

                            outlineColor: '$blue2',
                            outlineOffset: 2,
                            outlineStyle: 'solid',
                            outlineWidth: 1,

                            '&:disabled': {
                              outline: 'none',
                              cursor: 'pointer'
                            }
                          }}
                          {...field}
                          onBlur={handleSubmit}
                        />
                      )}
                    </Field>
                  </Box>
                </Tooltip.Trigger>

                <Tooltip.Content side="top" align="start">
                  <Text>{t('tooltips.dblEditAnnotationName')}</Text>
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip.Root>
            )}
          </Formik>

          <Chip small fromCss ellipsis data-class-id={node.data?.class} />
        </TreeView.Node>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <NodeContextMenu node={node} />
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}

export default memo(AnnotationItem) as typeof AnnotationItem
