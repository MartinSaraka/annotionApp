import { Resizable } from '@renderer/ui'

import { TopBar, LeftBar, RightBar } from './sections'

import * as S from './styled'

type TEditorProps = {
  children: React.ReactNode
}

const Editor = ({ children }: TEditorProps) => (
  <S.Root id="editor-layout" css={{ _appRegion: 'drag' }}>
    <TopBar id="editor-layout--topbar" css={{ _appRegion: 'no-drag' }} />

    <S.Wrapper css={{ _appRegion: 'drag' }}>
      <Resizable
        minWidth={243}
        initialWidth={263}
        maxWidth={363}
        side="right"
        css={{ _appRegion: 'no-drag' }}
      >
        <LeftBar id="editor-layout--leftbar" />
      </Resizable>

      <S.Content id="editor-layout--content" css={{ _appRegion: 'no-drag' }}>
        {children}
      </S.Content>

      <Resizable
        minWidth={292}
        initialWidth={312}
        maxWidth={412}
        side="left"
        css={{ _appRegion: 'no-drag' }}
      >
        <RightBar id="editor-layout--rightbar" />
      </Resizable>
    </S.Wrapper>
  </S.Root>
)

export default Editor
