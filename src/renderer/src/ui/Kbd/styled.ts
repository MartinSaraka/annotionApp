import { styled } from '@renderer/styles'

export const Root = styled('kbd', {
  display: 'inline-flex',
  flexShrink: 0,

  alignItems: 'center',
  justifyContent: 'center',

  textTransform: 'capitalize',
  color: 'inherit',

  fontSize: 'inherit',
  fontWeight: 'inherit',
  fontFamily: 'inherit',

  variants: {
    solid: {
      true: {
        $$borderRadius: '$space$2',

        backgroundColor: '$dark1',
        borderRadius: '$$borderRadius',

        borderWidth: '$1',
        borderStyle: '$solid',
        borderColor: '$dark3',

        paddingInline: '$2',
        paddingBlock: '$1'
      }
    }
  }
})
