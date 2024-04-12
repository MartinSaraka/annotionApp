import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { type ComponentProps } from '@stitches/react'
import { debounce, noop } from 'lodash'
import {
  DragPreviewRender,
  type DropOptions,
  type NodeModel,
  type NodeRender,
  type TreeMethods
} from '@minoru/react-dnd-treeview'
import { useTranslation } from 'react-i18next'

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

import {
  useAnnotoriousStore,
  useHotkeysStore,
  useImageStore
} from '@renderer/store'
import { TreeAdapter } from '@renderer/adapters'
import { AnnotationHandler, AnnotoriousHandler } from '@renderer/handlers'
import { type TNodeData } from '@renderer/adapters/TreeAdapter'

import {
  isAnnotationEditable,
  isAnnotationGenerating,
  isAnnotationVisible
} from '@common/utils/annotation'

import { HOTKEYS } from '@common/constants/hotkeys'

type TLeftBarAnnotationListProps = ComponentProps<typeof Box>

const AnnotationList = ({ css, ...rest }: TLeftBarAnnotationListProps) => {
  const { t } = useTranslation(['common', 'editor'])

  const searchRef = useRef<HTMLInputElement | null>(null)
  const treeRef = useRef<TreeMethods | null>(null)

  const [searchQuery, setSearchQuery] = useState<string | null>(null)

  const { addShortcut, removeShortcut } = useHotkeysStore()

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
      console.log('hello')
      if (
        isAnnotationEditable(node.data?.editability) &&
        isAnnotationVisible(node.data?.visibility) &&
        !isAnnotationGenerating(node.data?.status)
      ) {
        selectAnnotoriousAnnotation(id)
        console.log('hm')
      } else {
        console.log('bruh')
        cancelAllSelected()
      }

      const annotation = saveSelectedAnnotation(id)
      if (!annotation) return
      AnnotoriousHandler.instance(preview).showPreview(annotation)
    },
    [preview, selectAnnotoriousAnnotation, saveSelectedAnnotation]
  )

  const nodes = useMemo(
    () => TreeAdapter.fromAnnotationsToNodes(annotations, searchQuery),
    [annotations, searchQuery]
  )

  const handleSearch = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value || null)
    }, 400),
    []
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

  const handleFocusSearch = useCallback(() => {
    if (!searchRef.current) return
    searchRef.current.focus()
  }, [searchRef])

  useEffect(() => {
    addShortcut(HOTKEYS.search, handleFocusSearch)

    return () => {
      removeShortcut(HOTKEYS.search)
    }
  }, [addShortcut, removeShortcut, handleFocusSearch])

  useEffect(() => {
    if (!treeRef.current || !selectedNodeId) return

    const parentIds = AnnotationHandler.getParentNodesChain(
      selectedNodeId,
      annotations
    )

    if (parentIds.length) {
      treeRef.current.open(parentIds)
    }
  }, [annotations, selectedNodeId])

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

  const renderDragPreview: DragPreviewRender<TNodeData> = useCallback(
    (monitorProps) => (
      <AnnotationItem
        node={monitorProps.item}
        depth={0}
        isSelected={true}
        onSelect={noop}
        css={{ width: 'max-content' }}
      />
    ),
    []
  )

  return (
    <Box css={{ height: '100%', ...css }} {...rest}>
      <Box css={{ paddingInline: '$3', paddingTop: '$4' }}>
        <Input size="big" role="searchbox">
          <Input.Element>
            <Button input onClick={handleFocusSearch}>
              <Icon name="MagnifyingGlassIcon" width={20} height={20} />
            </Button>
          </Input.Element>

          <Input.Field
            ref={searchRef}
            role="search"
            placeholder={t('editor:fields.search.placeholder')}
            aria-description={t('aria.description.annotationSearch')}
            id="annotation-search"
            onChange={handleSearch}
          />

          <Input.Element>
            <Kbd keys={HOTKEYS.search} solid />
          </Input.Element>
        </Input>
      </Box>

      <ScrollArea
        fade
        orientation="vertical"
        css={{
          maxHeight: '100%',
          flex: '1 1 auto',
          minHeight: 0
        }}
      >
        <Box
          role="listbox"
          aria-description={t('aria.description.annotationList')}
          css={{
            alignItems: 'scretch',
            marginBlock: '$4',
            width: '100%',
            height: '100%'
          }}
        >
          <TreeView.Root
            ref={treeRef}
            nodes={nodes}
            render={renderNode}
            onDrop={handleDrop}
            dragPreviewRender={renderDragPreview}
          />
        </Box>
      </ScrollArea>
    </Box>
  )
}

export default memo(AnnotationList) as typeof AnnotationList
