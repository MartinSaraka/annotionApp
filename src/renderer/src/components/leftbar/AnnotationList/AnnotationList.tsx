import { memo, useCallback, useMemo } from 'react'
import { ComponentProps } from '@stitches/react'
import { NodeModel, NodeRender } from '@minoru/react-dnd-treeview'

import { Box, Button, Icon, Input, ScrollArea, TreeView } from '@renderer/ui'
import { AnnotationItem } from '@renderer/components'

import { TreeAdapter } from '@renderer/adapters'
import { TNodeData } from '@renderer/adapters/TreeAdapter'

import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { AnnotoriousHandler } from '@renderer/handlers'

import {
  isAnnotationEditable,
  isAnnotationVisible
} from '@common/utils/annotation'

type TLeftBarAnnotationListProps = ComponentProps<typeof Box>

const AnnotationList = ({ css, ...rest }: TLeftBarAnnotationListProps) => {
  const preview = useAnnotoriousStore((state) => state.preview)
  const annotations = useImageStore((state) => state.getAnnotations() || {})

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
        isAnnotationVisible(node.data?.visibility)
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

  const renderNode: NodeRender<TNodeData> = useCallback(
    (node, { depth }) => (
      <AnnotationItem
        node={node}
        key={node.id}
        depth={depth}
        isSelected={node.id === selectedNodeId}
        onSelect={() => handleSelectNode(node)}
      />
    ),
    [selectedNodeId, handleSelectNode]
  )

  return (
    <Box css={{ height: '100%', ...css }} {...rest}>
      <Box css={{ paddingInline: '$4', paddingTop: '$4' }}>
        <Input size="big" role="searchbox">
          <Input.Element>
            <Button input>
              <Icon name="MagnifyingGlassIcon" width={24} height={24} />
            </Button>
          </Input.Element>

          <Input.Field
            role="search"
            placeholder="Search annotations"
            aria-labelledby="Annotations search"
          />

          <Input.Element text>kbd</Input.Element>
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
          <TreeView.Root nodes={nodes} render={renderNode} />
        </Box>
      </ScrollArea>
    </Box>
  )
}

export default memo(AnnotationList) as typeof AnnotationList
