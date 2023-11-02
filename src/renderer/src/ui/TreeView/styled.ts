import { styled } from '@renderer/styles'

export const Actions = styled('div', {
  display: 'none',
  alignItems: 'center',

  position: 'absolute',
  inset: 0,
  left: 'auto',

  paddingInline: '$3',
  pointerEvents: 'none',

  '& > *': {
    pointerEvents: 'all'
  },

  background: 'linear-gradient(270deg, $$bg 88.42%, transparent 100%)'
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

  cursor: 'pointer',

  p: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },

  '&:focus, &:active, &:active:focus': {
    outlineColor: '#0074FF',
    outlineOffset: 0,
    outlineStyle: 'solid',
    outlineWidth: 1
  },

  '&:hover:not(:focus):not(:active):not(:active:focus)': {
    borderColor: '$dark3'
  },

  '&[data-selected="true"]': {
    backgroundColor: '$dark2'
  },

  '&[data-branch-expanded="true"]': {
    borderBottomColor: '$dark3'
  },

  [`&:hover ${Actions}`]: {
    display: 'inline-flex',
    $$bg: '$colors$dark1'
  },

  [`&[data-selected="true"]:hover ${Actions}`]: {
    display: 'inline-flex',
    $$bg: '$colors$dark2'
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
