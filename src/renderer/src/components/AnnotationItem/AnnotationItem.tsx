import { ComponentProps, memo, useCallback, useMemo, useRef } from 'react'
import { NodeModel } from '@minoru/react-dnd-treeview'
import { Field, Form, Formik, FormikConfig } from 'formik'

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
  TreeView
} from '@renderer/ui'

import { TNodeData } from '@renderer/adapters/TreeAdapter'
import { AnnotationHandler, AnnotoriousHandler } from '@renderer/handlers'
import { useAnnotoriousStore, useImageStore } from '@renderer/store'

import {
  ANNOTATION_EDITABILITY_ICON_MAP,
  ANNOTATION_VISIBILITY_ICON_MAP
} from '@common/constants/annotation'
import { TAnnotation } from '@common/types/annotation'

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
  ...rest
}: TAnnotationItemProps) => {
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

  // REMOVE ANNOTATION
  const removeAnnotationFromAnnotorious = useAnnotoriousStore(
    (state) => state.removeAnnotation
  )
  const removeAnnotationFromStore = useImageStore(
    (state) => (annotation: TAnnotation) => {
      state.deselectAnnotations()
      state.removeAnnotation(annotation.id)
    }
  )

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

  const handleZoomToAnnotation = useCallback(() => {
    if (!annotation) return
    annotoriousHandler.zoomToAnnotation(annotation)
  }, [annotation, annotoriousHandler])

  const handleMouseEnter = useCallback(() => {
    if (!annotation) return
    annotoriousHandler.highlightAnnotation(annotation, 'on')
  }, [annotation, annotoriousHandler])

  const handleMouseLeave = useCallback(() => {
    if (!annotation) return
    annotoriousHandler.highlightAnnotation(annotation, 'off')
  }, [annotation, annotoriousHandler])

  const handleDelete = useCallback(() => {
    if (!annotation) return
    removeAnnotationFromStore(annotation)
    removeAnnotationFromAnnotorious(annotation)
  }, [annotation])

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
        if (open) rest.onSelect()
      }}
    >
      <ContextMenu.Trigger asChild>
        <TreeView.Node
          node={node}
          data-node-id={node.id}
          isSelected={isSelected}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          actions={
            <>
              <Toggle
                pressed={editability === 'locked'}
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

              <Toggle
                pressed={visibility === 'hidden'}
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
            </>
          }
          {...rest}
        >
          <Button ghost condensed onDoubleClick={handleZoomToAnnotation}>
            <Shape tag={tag} props={node.data?.shape || {}} />
          </Button>

          <Formik<TFormValues>
            validateOnChange
            enableReinitialize
            onSubmit={onSubmit}
            initialValues={initialValues}
          >
            {({ handleSubmit }) => (
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
            )}
          </Formik>

          <Chip small fromCss ellipsis data-class-id={node.data?.class} />
        </TreeView.Node>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item onSelect={handleZoomToAnnotation}>
          <Text>Zoom to annotation</Text>
        </ContextMenu.Item>

        <ContextMenu.Separator />

        <ContextMenu.Item
          onSelect={() => handleToggleEditable(editability !== 'locked')}
        >
          <Text>{editability === 'locked' ? 'Unlock' : 'Lock'} annotation</Text>

          <Kbd keys={['Ctrl+L']} />
        </ContextMenu.Item>

        <ContextMenu.Item
          onSelect={() => handleToggleVisibility(visibility !== 'hidden')}
        >
          <Text>{visibility === 'hidden' ? 'Show' : 'Hide'} annotation</Text>

          <Kbd keys={['Ctrl+H']} />
        </ContextMenu.Item>

        <ContextMenu.Separator />

        <ContextMenu.Item
          css={{ $$bg: '$colors$crimson1', $$fg: '$colors$crimson4' }}
          onSelect={handleDelete}
        >
          <Box css={{ flexDirection: 'row', alignItems: 'center', gap: '$2' }}>
            <Icon name="TrashIcon" width={12} height={12} />

            <Text>Delete annotation</Text>
          </Box>

          <Kbd keys={['Backspace']} />
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}

export default memo(AnnotationItem) as typeof AnnotationItem
