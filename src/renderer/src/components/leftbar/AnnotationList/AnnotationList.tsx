import { memo, useCallback, useMemo } from 'react'
import { ComponentProps } from '@stitches/react'
import {
  INodeRendererProps,
  ITreeViewOnNodeSelectProps
} from 'react-accessible-treeview'

import { Box, Button, Icon, Input, ScrollArea, TreeView } from '@renderer/ui'

import { TreeAdapter } from '@renderer/adapters'
import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { AnnotoriousHandler } from '@renderer/handlers'
import AnnotationItem from '@renderer/components/AnnotationItem'

type TLeftBarAnnotationListProps = ComponentProps<typeof Box>

const AnnotationList = ({ css, ...rest }: TLeftBarAnnotationListProps) => {
  const preview = useAnnotoriousStore((state) => state.preview)
  const annotations = useImageStore((state) => state.getAnnotations() || {})

  const selectedAnnotations = useImageStore((state) => {
    const selected = state.getSelectedAnnotation()
    return selected ? [selected.id] : []
  })

  const selectAnnotoriousAnnotation = useAnnotoriousStore(
    (state) => state.selectAnnotation
  )
  const saveSelectedAnnotation = useImageStore(
    (state) => state.selectAnnotation
  )

  const handleSelectAnnotation = useCallback(
    (node: ITreeViewOnNodeSelectProps) => {
      const id = node.element.id as TID
      selectAnnotoriousAnnotation(id)

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

  const renderNodes = useCallback(
    (props: INodeRendererProps) => (
      <AnnotationItem data={props} key={props.element.id} />
    ),
    []
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
          <TreeView.Root
            nodeRenderer={renderNodes}
            selectedIds={selectedAnnotations}
            onNodeSelect={handleSelectAnnotation}
            nodes={nodes}
          />
        </Box>
      </ScrollArea>
    </Box>
  )
}

export default memo(AnnotationList) as typeof AnnotationList
