import { Box, Resizable } from '@renderer/ui'
import { motion } from 'framer-motion'

import { TopBar, LeftBar, RightBar, FloatingBar, Hints } from './sections'

import { useSettingsStore } from '@renderer/store'

import * as S from './styled'

type TEditorProps = {
  children: React.ReactNode
}

const Editor = ({ children }: TEditorProps) => {
  const { visibleLeftSidebar, visibleRightSidebar } = useSettingsStore(
    (state) => state.getLayoutSettings()
  )

  return (
    <S.Root id="editor-layout" css={{ _appRegion: 'drag' }}>
      <TopBar id="editor-layout--topbar" css={{ _appRegion: 'no-drag' }} />

      <S.Wrapper css={{ _appRegion: 'drag' }}>
        <Box
          as={motion.div}
          css={{
            _appRegion: 'no-drag',
            overflow: 'hidden',
            willChange: 'width'
          }}
          initial={{
            width: visibleLeftSidebar ? 'auto' : 0
          }}
          animate={{
            width: visibleLeftSidebar ? 'auto' : 0
          }}
          transition={{
            type: 'linear',
            delay: visibleLeftSidebar ? 0 : 0.2
          }}
        >
          <Resizable
            minWidth={243}
            initialWidth={263}
            maxWidth={363}
            side="right"
            css={{
              height: '100%',
              willChange: 'width, transform'
            }}
            animate={{
              x: visibleLeftSidebar ? 0 : '-100%'
            }}
            transition={{
              type: 'linear',
              delay: visibleLeftSidebar ? 0.2 : 0
            }}
          >
            <LeftBar id="editor-layout--leftbar" />
          </Resizable>
        </Box>

        <S.Content id="editor-layout--content" css={{ _appRegion: 'no-drag' }}>
          <FloatingBar
            id="editor-layout--floating-bar"
            css={{ _appRegion: 'no-drag' }}
          />

          {children}

          <Hints id="editor-layout--hints" />
        </S.Content>

        <Box
          as={motion.div}
          css={{
            _appRegion: 'no-drag',
            overflow: 'hidden',
            willChange: 'width',
            transformOrigin: 'right'
          }}
          initial={{
            width: visibleRightSidebar ? 'auto' : 0
          }}
          animate={{
            width: visibleRightSidebar ? 'auto' : 0
          }}
          transition={{
            type: 'linear',
            delay: visibleRightSidebar ? 0 : 0.2
          }}
        >
          <Resizable
            minWidth={292}
            initialWidth={312}
            maxWidth={412}
            side="left"
            css={{
              height: '100%',
              willChange: 'width, transform',
              transformOrigin: 'right'
            }}
            animate={{
              x: visibleRightSidebar ? 0 : '100%'
            }}
            transition={{
              type: 'linear',
              delay: visibleRightSidebar ? 0.2 : 0
            }}
          >
            <RightBar id="editor-layout--rightbar" />
          </Resizable>
        </Box>
      </S.Wrapper>
    </S.Root>
  )
}

export default Editor
