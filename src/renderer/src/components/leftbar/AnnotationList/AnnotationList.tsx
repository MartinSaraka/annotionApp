import { memo, useCallback, useMemo, useRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { DropOptions, NodeModel, NodeRender } from '@minoru/react-dnd-treeview'
import { noop } from 'lodash'

import {
  Box,
  Button,
  Icon,
  Input,
  Kbd,
  ScrollArea,
  TreeView
} from '@renderer/ui'
import { AnnotationItem } from '@renderer/components'

import { TreeAdapter } from '@renderer/adapters'
import { TNodeData } from '@renderer/adapters/TreeAdapter'

import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { AnnotationHandler, AnnotoriousHandler } from '@renderer/handlers'

import {
  isAnnotationEditable,
  isAnnotationGenerating,
  isAnnotationVisible
} from '@common/utils/annotation'

type TLeftBarAnnotationListProps = ComponentProps<typeof Box>

const AnnotationList = ({ css, ...rest }: TLeftBarAnnotationListProps) => {
  const searchRef = useRef<HTMLInputElement | null>(null)

  const preview = useAnnotoriousStore((state) => state.preview)
  const annotations = useImageStore((state) => state.getAnnotations() || {})

  const getAnnotationById = useImageStore((state) => state.getAnnotation)
  const updateAnnotation = useAnnotoriousStore(
    (state) => state.saveAndUpdateAnnotation
  )

  const selectedNodeId = useImageStore(
    (state) => state.getSelectedAnnotation()?.id
  )
  const cancelAllSelected = useAnnotoriousStore(
    (state) => state.cancelAllSelected
  )
  const selectAnnotoriousAnnotation = useAnnotoriousStore(
    (state) => state.selectAnnotation
  )
  const saveSelectedAnnotation = useImageStore(
    (state) => state.selectAnnotation
  )

  const handleSelectNode = useCallback(
    (node: NodeModel<TNodeData>) => {
      const id = node.id as TID

      if (
        isAnnotationEditable(node.data?.editability) &&
        isAnnotationVisible(node.data?.visibility) &&
        !isAnnotationGenerating(node.data?.status)
      ) {
        selectAnnotoriousAnnotation(id)
      } else {
        cancelAllSelected()
      }

      const annotation = saveSelectedAnnotation(id)
      if (!annotation) return

      AnnotoriousHandler.instance(preview).showPreview(annotation)
    },
    [preview, selectAnnotoriousAnnotation, saveSelectedAnnotation]
  )

  const nodes = useMemo(
    () => TreeAdapter.fromAnnotationsToNodes(Object.values(annotations)),
    [annotations]
  )

  const handleDrop = useCallback(
    async (_: NodeModel<TNodeData>[], options: DropOptions<TNodeData>) => {
      const sourceId = options.dragSourceId as string
      const targetId = options.dropTargetId as string

      const annotation = getAnnotationById(sourceId)
      if (!annotation) return

      const data = AnnotationHandler.upsertBody(
        annotation,
        'TextualBody',
        'parent',
        targetId
      )

      await updateAnnotation(data)
    },
    [updateAnnotation]
  )

  const renderNode: NodeRender<TNodeData> = useCallback(
    (node, { depth, hasChild, onToggle, isOpen }) => (
      <AnnotationItem
        node={node}
        key={node.id}
        depth={depth}
        hasChild={hasChild}
        onToggle={onToggle}
        isOpen={isOpen}
        isSelected={node.id === selectedNodeId}
        onSelect={() => handleSelectNode(node)}
      />
    ),
    [selectedNodeId, handleSelectNode]
  )

  return (
    <Box css={{ height: '100%', ...css }} {...rest}>
      <Box css={{ paddingInline: '$3', paddingTop: '$4' }}>
        <Input size="big" role="searchbox">
          <Input.Element>
            <Button input onClick={() => searchRef?.current?.focus()}>
              <Icon name="MagnifyingGlassIcon" width={20} height={20} />
            </Button>
          </Input.Element>

          <Input.Field
            ref={searchRef}
            role="search"
            placeholder="Search annotations"
            aria-labelledby="Annotations search"
            id="annotation-search"
          />

          <Input.Element text>
            <Kbd keys={['cmd', 'f']} />
          </Input.Element>
        </Input>
      </Box>

      <ScrollArea
        fade
        orientation="vertical"
        css={{ maxHeight: '100%', flex: '1 1 auto', minHeight: 0 }}
      >
        <Box
          role="listbox"
          aria-labelledby="image-annotations"
          css={{ alignItems: 'scretch', marginBlock: '$4', width: '100%' }}
        >
          <TreeView.Root
            nodes={nodes}
            render={renderNode}
            onDrop={handleDrop}
            dragPreviewRender={(monitorProps) => (
              <AnnotationItem
                node={monitorProps.item}
                depth={0}
                isSelected={true}
                onSelect={noop}
                css={{ width: 'max-content' }}
              />
            )}
          />
        </Box>
      </ScrollArea>
    </Box>
  )
}

export default memo(AnnotationList) as typeof AnnotationList
