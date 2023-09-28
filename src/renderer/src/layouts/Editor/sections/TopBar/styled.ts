import { styled } from '@renderer/styles'

export const Root = styled('header', {
  position: 'relative',

  display: 'flex',
  flexDirection: 'row',

  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',
  padding: '$4',

  backgroundColor: '$dark1',

  borderBottomWidth: '$1',
  borderBottomColor: '$dark3',
  borderBottomStyle: 'solid',

  borderTopColor: '$dark3',
  borderTopStyle: 'solid',
  borderTopWidth: '$1'
})
