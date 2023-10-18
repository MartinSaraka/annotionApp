import TreeView from 'react-accessible-treeview'

import { styled } from '@renderer/styles'

export const Actions = styled('div', {
  display: 'none',
  alignItems: 'center',

  position: 'absolute',
  inset: 0,
  left: 'auto',

  paddingInline: '$3',

  background: 'linear-gradient(270deg, $$bg 88.42%, transparent 100%)'
})

export const Root = styled(TreeView, {
  listStyle: 'none',
  margin: 0,
  padding: 0,

  display: 'flex',
  flexDirection: 'column',

  '.tree-leaf-list-item': {
    width: '100%',
    whiteSpace: 'initial'
  },

  '.tree-branch-wrapper, .tree-node__leaf': {
    outline: 'none'
  },

  '.tree-node__leaf': {
    '&:focus, &:active, &:active:focus': {
      outlineColor: '#0074FF',
      outlineOffset: 0,
      outlineStyle: 'solid',
      outlineWidth: 1
    }
  },

  '.tree-node': {
    cursor: 'pointer'
  },

  '.tree-node:hover:not(:focus):not(:active):not(:active:focus)': {
    borderColor: '$dark3'
  },

  '.tree-node--selected': {
    backgroundColor: '$dark2'
  },

  [`.tree-node:hover ${Actions}`]: {
    display: 'inline-flex',
    $$bg: '$colors$dark1'
  },

  [`.tree-node--selected:hover ${Actions}`]: {
    display: 'inline-flex',
    $$bg: '$colors$dark2'
  }
})

export const Node = styled('div', {
  position: 'relative',
  width: '100%',

  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  paddingLeft: 'calc($$offsetLeft * 1px)',
  paddingRight: '$4',
  paddingBlock: '$2',

  border: 0,
  borderTopWidth: '$1',
  borderBottomWidth: '$1',
  borderStyle: '$solid',
  borderColor: 'transparent',

  '&[data-branch-expanded="true"]': {
    borderBottomColor: '$dark3'
  },

  p: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
})

export const Chevron = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$dark4',

  '&[data-expanded="true"]': {
    transform: 'rotate(90deg)'
  }
})
