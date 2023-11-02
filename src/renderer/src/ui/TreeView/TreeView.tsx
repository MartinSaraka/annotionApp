import React, { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'
import {
  DndProvider,
  MultiBackend,
  NodeRender,
  Tree,
  TreeMethods,
  getBackendOptions
} from '@minoru/react-dnd-treeview'

import { preventAndStop } from '@common/utils/global'
import { TNodeData, TNodeModel } from '@renderer/adapters/TreeAdapter'

import * as S from './styled'

type TRootBaseProps = {
  nodes: TNodeModel[]
  render: NodeRender<TNodeData>
}

type TRootProps = Omit<
  ComponentProps<typeof Tree>,
  'tree' | 'rootId' | 'onDrop' | 'render'
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
        rootId={0}
        dragPreviewRender={() => <p>drag</p>}
        onDrop={() => {}}
        {...rest}
      />
    </DndProvider>
  )
})

type TNodeBaseProps = {
  depth: number
  isSelected: boolean
  onSelect: () => void
  actions?: React.ReactNode
  children: React.ReactNode
}

type TNodeProps = ComponentProps<typeof S.Node> & TNodeBaseProps

const Node = forwardRef(function Node(
  { children, depth, isSelected, onSelect, actions, ...rest }: TNodeProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Node
      ref={forwardedRef}
      data-selected={isSelected}
      css={{ $$offsetLeft: (depth || 1) * 16 }}
      onClick={onSelect}
      {...rest}
    >
      {children}

      {actions && <S.Actions onClick={preventAndStop}>{actions}</S.Actions>}
    </S.Node>
  )
})

const TreeView = () => <React.Fragment />
TreeView.Root = memo(Root) as typeof Root
TreeView.Node = memo(Node) as typeof Node

export default TreeView
