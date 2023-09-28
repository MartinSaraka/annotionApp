import { AppBar } from './sections'

import * as S from './styled'

type TDefaultProps = {
  children: React.ReactNode
}

const Default = ({ children }: TDefaultProps) => (
  <S.Root id="default-layout" css={{ _appRegion: 'drag' }}>
    <AppBar id="default-layout--appbar" css={{ _appRegion: 'drag' }} />

    {children}
  </S.Root>
)

export default Default
