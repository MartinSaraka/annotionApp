import { memo, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Box, Button, Label, List, Switch } from '@renderer/ui'

import { useSettingsStore } from '@renderer/store'

import { DEFAULT_ANNOTATION_CLASS_VISIBILITY } from '@common/constants/settings'

import { theme } from '@renderer/styles'

// TODO: translate

const Annotation = () => {
  const settings = useSettingsStore((state) => state.getAnnotationSettings())

  const setAnnotationsVisibility = useSettingsStore(
    (state) => state.setAnnotationsVisibility
  )
  const setAnnotationClassVisibility = useSettingsStore(
    (state) => state.setAnnotationClassVisibility
  )

  const handleHover = useCallback(
    (element: string, value: boolean) => () => {
      const id = `settings-annotation-preview--${element}`
      const root = document.getElementById(id)
      if (!root) return
      root.style.backgroundColor = value ? theme.colors.blue2.value : ''
    },
    []
  )

  const resetClass = useCallback(() => {
    setAnnotationClassVisibility(DEFAULT_ANNOTATION_CLASS_VISIBILITY)
  }, [setAnnotationClassVisibility])

  const resetAll = useCallback(() => {
    resetClass()
  }, [resetClass])

  return (
    <>
      <Box
        as={motion.div}
        id="settings-annotation-preview"
        css={{
          backgroundColor: '$dark2',
          alignItems: 'center',
          padding: '$5',
          borderWidth: '$1',
          borderStyle: '$solid',
          borderColor: '$dark3',
          borderLeftWidth: 0,
          borderRightWidth: 0,

          '*': {
            transition: 'background-color 0.2s ease, opacity 0.2s ease'
          }
        }}
      >
        <Box
          as={motion.div}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: settings.visibleAnnotations ? 1 : 0.4 }}
          transition={{ type: 'linear' }}
          id="settings-annotation-preview--box"
          css={{
            backgroundColor: '$dark1',
            borderWidth: '$3',
            borderStyle: '$solid',
            borderColor: '$dark3',
            aspectRatio: '16/9',
            maxWidth: '60%',
            width: '100%',
            overflow: 'hidden',
            boxShadow: 'rgba(16, 16, 33, 0.4) 1px 1px 6px'
          }}
        >
          <AnimatePresence initial={false}>
            {settings.visibleAnnotationClass && (
              <Box
                as={motion.div}
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ type: 'linear' }}
                id="settings-annotation-preview--box-class"
                css={{
                  position: 'absolute',
                  top: 5,
                  left: 5,
                  width: '60%',
                  height: 15,
                  _bgAlpha: ['$dark5', '90'],
                  borderRadius: '$3',
                  borderWidth: '$1',
                  borderStyle: '$solid',
                  borderColor: '$dark3',
                  willChange: 'background-color'
                }}
              />
            )}
          </AnimatePresence>
        </Box>
      </Box>

      <List>
        <List.Box>
          <List.Item
            css={{ $$firstWidth: 'auto', minHeight: 'unset' }}
            onHoverStart={handleHover('box', true)}
            onHoverEnd={handleHover('box', false)}
          >
            <Label htmlFor="hide" css={{ textTransform: 'unset', flex: 1 }}>
              Show annotations
            </Label>

            <Switch.Root
              id="hide"
              checked={settings.visibleAnnotations}
              css={{ flex: 'unset !important' }}
              onCheckedChange={setAnnotationsVisibility}
            >
              <Switch.Thumb />
            </Switch.Root>
          </List.Item>
        </List.Box>

        <List.Box
          title="Class"
          actions={
            <Button input css={{ color: '$dark4' }} onClick={resetClass}>
              reset to default
            </Button>
          }
        >
          <List.Item
            css={{ $$firstWidth: 'auto', minHeight: 'unset' }}
            onHoverStart={handleHover('box-class', true)}
            onHoverEnd={handleHover('box-class', false)}
          >
            <Label
              htmlFor="left-bar-visible"
              css={{ textTransform: 'unset', flex: 1 }}
            >
              Show annotation class
            </Label>

            <Switch.Root
              id="left-bar-visible"
              checked={settings.visibleAnnotationClass}
              css={{ flex: 'unset !important' }}
              onCheckedChange={setAnnotationClassVisibility}
            >
              <Switch.Thumb />
            </Switch.Root>
          </List.Item>
        </List.Box>

        <Box
          css={{
            paddingBottom: '$3',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <Button input css={{ color: '$dark4' }} onClick={resetAll}>
            reset layout settings
          </Button>
        </Box>
      </List>
    </>
  )
}

export default memo(Annotation)
