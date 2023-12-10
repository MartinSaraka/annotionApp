import { memo, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import {
  Box,
  Button,
  Label,
  List,
  Switch,
  Text,
  ToggleGroup
} from '@renderer/ui'

import { useLanguage } from '@renderer/hooks'
import { useSettingsStore } from '@renderer/store'

import {
  DEFAULT_LEFT_SIDEBAR_VISIBILITY,
  DEFAULT_MINIMAP_VISIBILITY,
  DEFAULT_RIGHT_SIDEBAR_VISIBILITY
} from '@common/constants/settings'

import { theme } from '@renderer/styles'

// TODO: translate

const Layout = () => {
  const { current, available, setLanguage } = useLanguage()

  const settings = useSettingsStore((state) => state.getLayoutSettings())

  const setLeftSidebarVisibility = useSettingsStore(
    (state) => state.setLeftSidebarVisibility
  )
  const setRightSidebarVisibility = useSettingsStore(
    (state) => state.setRightSidebarVisibility
  )
  const setMinimapVisibility = useSettingsStore(
    (state) => state.setMinimapVisibility
  )

  const handleHover = useCallback(
    (element: string, value: boolean) => () => {
      const id = `settings-layout-preview--${element}`
      const root = document.getElementById(id)
      if (!root) return
      root.style.backgroundColor = value ? theme.colors.blue2.value : ''
    },
    []
  )

  const resetPanels = useCallback(() => {
    setLeftSidebarVisibility(DEFAULT_LEFT_SIDEBAR_VISIBILITY)
    setRightSidebarVisibility(DEFAULT_RIGHT_SIDEBAR_VISIBILITY)
  }, [setLeftSidebarVisibility, setRightSidebarVisibility])

  const resetViewer = useCallback(() => {
    setMinimapVisibility(DEFAULT_MINIMAP_VISIBILITY)
  }, [setMinimapVisibility])

  const resetAll = useCallback(() => {
    resetPanels()
    resetViewer()
  }, [resetPanels, resetViewer])

  const renderLang = useCallback(
    (lang: (typeof available)[number]) => (
      <ToggleGroup.Item
        key={`settings-language-${lang}`}
        value={lang}
        css={{ textTransform: 'uppercase' }}
      >
        <Text css={{ lineHeight: 1, fontWeight: 500 }}>{lang}</Text>
      </ToggleGroup.Item>
    ),
    []
  )

  return (
    <>
      <Box
        as={motion.div}
        id="settings-layout-preview"
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
          id="settings-layout-preview--window"
          css={{
            borderRadius: '$3',
            backgroundColor: '$dark1',
            borderWidth: '$1',
            borderStyle: '$solid',
            borderColor: '$dark3',
            aspectRatio: '16/9',
            maxWidth: '60%',
            width: '100%',
            overflow: 'hidden',
            boxShadow: 'rgba(16, 16, 33, 0.4) 1px 1px 6px'
          }}
        >
          <Box
            as={motion.div}
            id="settings-layout-preview--topbar"
            css={{
              width: '100%',
              height: '15%',
              _bgAlpha: ['$dark5', '90'],
              borderBottomWidth: '$1',
              borderBottomStyle: '$solid',
              borderBottomColor: '$dark3',
              willChange: 'background-color'
            }}
          />
          <Box
            as={motion.div}
            id="settings-layout-preview--content"
            css={{
              width: '100%',
              height: '85%',
              backgroundColor: '$dark1',
              flexDirection: 'row'
            }}
          >
            <AnimatePresence initial={false}>
              {settings.visibleLeftSidebar && (
                <Box
                  as={motion.div}
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'linear' }}
                  id="settings-layout-preview--leftbar"
                  css={{
                    width: '20%',
                    height: '100%',
                    _bgAlpha: ['$dark5', '90'],
                    borderRightWidth: '$1',
                    borderRightStyle: '$solid',
                    borderRightColor: '$dark3',
                    willChange: 'background-color'
                  }}
                />
              )}
            </AnimatePresence>

            <Box
              as={motion.div}
              id="settings-layout-preview--viewer"
              css={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text
                variant="sm"
                css={{
                  textTransform: 'uppercase',
                  color: '$dark4',
                  fontWeight: 500
                }}
              >
                image
              </Text>

              <AnimatePresence initial={false}>
                {settings.visibleMinimap && (
                  <Box
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'linear' }}
                    id="settings-layout-preview--viewer-minimap"
                    css={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      aspectRatio: 1,
                      width: '20%',
                      maxWidth: 30,
                      borderWidth: '$1',
                      borderStyle: '$solid',
                      borderColor: '$dark3',
                      _bgAlpha: ['$dark5', '90'],
                      willChange: 'background-color'
                    }}
                  />
                )}
              </AnimatePresence>
            </Box>

            <AnimatePresence initial={false}>
              {settings.visibleRightSidebar && (
                <Box
                  as={motion.div}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'linear' }}
                  id="settings-layout-preview--rightbar"
                  css={{
                    width: '25%',
                    height: '100%',
                    _bgAlpha: ['$dark5', '90'],
                    borderLeftWidth: '$1',
                    borderLeftStyle: '$solid',
                    borderLeftColor: '$dark3',
                    willChange: 'background-color'
                  }}
                />
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>

      <List>
        <List.Box>
          <List.Item css={{ $$firstWidth: 'auto', minHeight: 'unset' }}>
            <Label htmlFor="language" css={{ textTransform: 'unset', flex: 1 }}>
              Language
            </Label>

            <ToggleGroup.Root
              type="single"
              value={current}
              onValueChange={setLanguage}
              css={{ flex: 'unset !important' }}
            >
              {available.map(renderLang)}
            </ToggleGroup.Root>
          </List.Item>
        </List.Box>

        <List.Box
          title="Panels"
          actions={
            <Button input css={{ color: '$dark4' }} onClick={resetPanels}>
              reset to default
            </Button>
          }
        >
          <List.Item
            css={{ $$firstWidth: 'auto', minHeight: 'unset' }}
            onHoverStart={handleHover('leftbar', true)}
            onHoverEnd={handleHover('leftbar', false)}
          >
            <Label
              htmlFor="left-bar-visible"
              css={{ textTransform: 'unset', flex: 1 }}
            >
              Show left panel
            </Label>

            <Switch.Root
              id="left-bar-visible"
              checked={settings.visibleLeftSidebar}
              css={{ flex: 'unset !important' }}
              onCheckedChange={setLeftSidebarVisibility}
            >
              <Switch.Thumb />
            </Switch.Root>
          </List.Item>

          <List.Item
            css={{ $$firstWidth: 'auto', minHeight: 'unset' }}
            onHoverStart={handleHover('rightbar', true)}
            onHoverEnd={handleHover('rightbar', false)}
          >
            <Label
              htmlFor="right-bar-visible"
              css={{ textTransform: 'unset', flex: 1 }}
            >
              Show right panel
            </Label>

            <Switch.Root
              id="right-bar-visible"
              css={{ flex: 'unset !important' }}
              checked={settings.visibleRightSidebar}
              onCheckedChange={setRightSidebarVisibility}
            >
              <Switch.Thumb />
            </Switch.Root>
          </List.Item>
        </List.Box>

        <List.Box
          title="Viewer"
          actions={
            <Button input css={{ color: '$dark4' }} onClick={resetViewer}>
              reset to default
            </Button>
          }
        >
          <List.Item
            css={{ $$firstWidth: 'auto', minHeight: 'unset' }}
            onHoverStart={handleHover('viewer-minimap', true)}
            onHoverEnd={handleHover('viewer-minimap', false)}
          >
            <Label
              htmlFor="minimap-visible"
              css={{ textTransform: 'unset', flex: 1 }}
            >
              Show Minimap
            </Label>

            <Switch.Root
              id="minimap-visible"
              css={{ flex: 'unset !important' }}
              checked={settings.visibleMinimap}
              onCheckedChange={setMinimapVisibility}
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

export default memo(Layout)
