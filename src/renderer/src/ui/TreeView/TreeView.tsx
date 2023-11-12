import React, { forwardRef, memo, useCallback } from 'react'
import { ComponentProps } from '@stitches/react'
import {
  DndProvider,
  DragPreviewRender,
  DropOptions,
  MultiBackend,
  NodeModel,
  NodeRender,
  Tree,
  TreeMethods,
  getBackendOptions,
  useDragOver
} from '@minoru/react-dnd-treeview'
import { noop } from 'lodash'

import { preventAllDefaults, preventAndStop } from '@common/utils/global'
import { TNodeData, TNodeModel } from '@renderer/adapters/TreeAdapter'

import * as S from './styled'
import Icon from '../Icon'

type TRootBaseProps = {
  nodes: TNodeModel[]
  render: NodeRender<TNodeData>
  dragPreviewRender?: DragPreviewRender<TNodeData>
  onDrop?: (
    tree: NodeModel<TNodeData>[],
    options: DropOptions<TNodeData>
  ) => void
}

type TRootProps = Omit<
  ComponentProps<typeof Tree>,
  'tree' | 'rootId' | 'onDrop' | 'render' | 'dragPreviewRender'
> &
  TRootBaseProps

const Root = forwardRef(function Root(
  { nodes, ...rest }: TRootProps,
  forwardedRef: React.ForwardedRef<TreeMethods>
) {
  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        ref={forwardedRef}
        tree={nodes}
        rootId="0"
        sort={false}
        onDrop={noop}
        classes={{
          root: 'treeRoot',
          draggingSource: 'draggingSource',
          dropTarget: 'dropTarget'
        }}
        {...rest}
      />
    </DndProvider>
  )
})

type TNodeBaseProps = {
  node: NodeModel<TNodeData>
  depth: number
  hasChild?: boolean
  isSelected: boolean
  isOpen?: boolean
  onSelect: () => void
  onToggle?: (id: NodeModel['id']) => void
  actions?: React.ReactNode
  children: React.ReactNode
}

type TNodeProps = ComponentProps<typeof S.Node> & TNodeBaseProps

const Node = forwardRef(function Node(
  {
    node,
    children,
    depth,
    hasChild,
    isSelected,
    isOpen = false,
    onSelect,
    onToggle,
    actions,
    css,
    ...rest
  }: TNodeProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  const dragOverProps = useDragOver(node.id, isOpen, onToggle || noop)

  const handleToggle = useCallback(
    preventAllDefaults(() => {
      onToggle?.(node.id)
    }),
    [onToggle, node]
  )

  return (
    <S.Node
      ref={forwardedRef}
      data-child={depth > 0}
      selected={isSelected}
      opened={isOpen}
      css={{ $$offsetLeft: (depth + 1) * 16 + (depth ? depth * 7 : 0), ...css }}
      onClick={!isSelected ? onSelect : undefined}
      {...rest}
      {...dragOverProps}
    >
      {hasChild && (
        <S.Chevron onClick={handleToggle} data-expanded={isOpen}>
          <Icon name="ChevronRightIcon" width={15} height={15} />
        </S.Chevron>
      )}

      {children}

      {actions && <S.Actions onClick={preventAndStop}>{actions}</S.Actions>}
    </S.Node>
  )
})

const TreeView = () => <React.Fragment />
TreeView.Root = memo(Root) as typeof Root
TreeView.Node = memo(Node) as typeof Node

export default TreeView
