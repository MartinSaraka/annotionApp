import { styled } from '@renderer/styles'

import * as Dialog from '@radix-ui/react-dialog'

export const Root = styled(Dialog.Root, {
  position: 'relative'
})

export const Trigger = styled(Dialog.Trigger, {})

export const Overlay = styled(Dialog.Overlay, {
  _bgAlpha: ['$dark1', '80'],
  backdropFilter: 'blur(8px)',
  position: 'fixed',
  inset: 0
})

export const Content = styled(Dialog.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  backgroundColor: '$dark1',
  borderColor: '$dark3',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',

  borderWidth: '$1',
  borderStyle: '$solid',
  borderRadius: '$4',

  width: '90vw',
  maxWidth: 450,
  maxHeight: '85vh'
})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$6',

  padding: '$4',

  borderBottomWidth: '$1',
  borderBottomStyle: '$solid',
  borderBottomColor: '$dark3'
})

export const Title = styled(Dialog.Title, {
  '&&': {
    lineHeight: 1
  }
})

export const Description = styled(Dialog.Description, {})
