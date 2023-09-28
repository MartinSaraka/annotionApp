import React, { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { flattenTree, INodeRendererProps } from 'react-accessible-treeview'

import * as S from './styled'
import Icon from '../Icon'

type TRootBaseProps = {
  nodes: Parameters<typeof flattenTree>[0]
}

type TRootProps = Omit<ComponentProps<typeof S.Root>, 'data'> & TRootBaseProps

const Root = forwardRef(function Root(
  { nodes, ...rest }: TRootProps,
  forwardedRef: React.ForwardedRef<HTMLUListElement>
) {
  const data = flattenTree(nodes)

  return (
    <S.Root
      ref={forwardedRef}
      data={data}
      clickAction="EXCLUSIVE_SELECT"
      multiSelect
      propagateSelect
      propagateSelectUpwards
      expandOnKeyboardSelect
      propagateCollapse
      {...rest}
    />
  )
})

type TNodeBaseProps = {
  nodeProps: INodeRendererProps
  actions?: React.ReactNode
  children: React.ReactNode
}

type TNodeProps = ComponentProps<typeof S.Node> & TNodeBaseProps

const Node = forwardRef(function Node(
  { children, actions, nodeProps, ...rest }: TNodeProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Node
      ref={forwardedRef}
      data-branch-expanded={nodeProps.isBranch && nodeProps.isExpanded}
      css={{
        $$offsetLeft: nodeProps.level * 16 + (nodeProps.isBranch ? 0 : 8)
      }}
      {...nodeProps.getNodeProps()}
      {...rest}
    >
      {nodeProps.isBranch && (
        <S.Chevron data-expanded={nodeProps.isExpanded}>
          <Icon name="ChevronRightIcon" width={15} height={15} />
        </S.Chevron>
      )}

      {children}

      {actions && <S.Actions>{actions}</S.Actions>}
    </S.Node>
  )
})

const TreeView = () => <React.Fragment />
TreeView.Root = memo(Root) as typeof Root
TreeView.Node = memo(Node) as typeof Node

export default TreeView
