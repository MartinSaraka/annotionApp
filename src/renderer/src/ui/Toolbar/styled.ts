import * as Toolbar from '@radix-ui/react-toolbar'

import { styled } from '@renderer/styles'

export const ToolbarRoot = styled(Toolbar.Root, {
  display: 'flex',
  flexWrap: 'wrap',

  alignContent: 'flex-start',
  justifyContent: 'center',

  borderRadius: '$6',

  padding: '$2',
  gap: '$1',

  '&[data-orientation="vertical"]': {
    //flexDirection: 'column'
  },

  '&[data-orientation="horizontal"]': {
    //flexDirection: 'row'
  }
})

export const ToolbarGroup = styled(Toolbar.ToggleGroup, {
  display: 'flex',
  flexWrap: 'wrap',

  alignContent: 'flex-start',
  justifyContent: 'center',

  flex: 1,
  gap: '$1',

  '&[data-orientation="vertical"]': {
    // flexDirection: 'column'
  },

  '&[data-orientation="horizontal"]': {
    // flexDirection: 'row'
  }
})

export const ToolbarToggle = styled(Toolbar.ToggleItem, {
  position: 'relative',
  display: 'inline-flex',
  flexShrink: 0,

  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: '$2',
  padding: '$2',

  width: '100%',
  height: '100%',
  aspectRatio: 1,

  maxWidth: 32,
  maxHeight: 32,

  svg: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    zIndex: '$up'
  },

  color: '$purple11'
})

export const ToolbarButton = styled(Toolbar.Button, {
  position: 'relative',
  display: 'inline-flex',
  flexShrink: 0,

  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: '$2',
  padding: '$2',

  width: '100%',
  height: '100%',
  aspectRatio: 1,

  maxWidth: 32,
  maxHeight: 32,

  svg: {
    width: '100%',
    height: '100%',
    aspectRatio: 1
  },

  color: '$purple11',

  '&:hover': {
    backgroundColor: '$purple3'
  }
})

export const ToolbarSeparator = styled(Toolbar.Separator, {
  backgroundColor: '$gray5',

  '&[data-orientation="vertical"]': {
    width: 1,
    height: '100%',
    marginInline: '$2'
  },

  '&[data-orientation="horizontal"]': {
    height: 1,
    width: '100%',
    marginBlock: '$2'
  }
})
