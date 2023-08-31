import { styled } from '@renderer/styles'

export const Close = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: '$2',
  cursor: 'pointer',

  padding: 2,
  opacity: 0,

  transition: 'opacity 0.2s ease',

  '&:hover': {
    opacity: 1,
    _bgAlpha: ['$light', '80']
  }
})

export const Root = styled('button', {
  position: 'relative',
  flexShrink: 0,

  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: '$2',

  paddingBlock: '$1',
  paddingInline: '$3',
  paddingBottom: '$2',

  gap: '$1',
  lineHeight: 1,

  [`&:hover > ${Close}[data-active="false"]`]: {
    opacity: 0.8
  }
})

export const Badge = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  backgroundColor: '$purple9',
  borderRadius: '$2',

  paddingInline: 'calc($1 + 2px)',
  paddingBlock: '$1',
  marginRight: '$1',

  fontSize: '$2',
  lineHeight: '$none',
  fontWeight: 700,
  textTransform: 'uppercase',
  color: '$purple3'
})
