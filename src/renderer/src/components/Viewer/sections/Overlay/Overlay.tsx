import { ComponentProps } from '@stitches/react'

import { GridOverlay } from '@renderer/components'
import { MainToolbar, Minimap } from '@renderer/components/overlays'

import { ERGLItem } from '@common/constants/layout'

type TOverlayProps = ComponentProps<typeof GridOverlay>

const Overlay = (props: TOverlayProps) => (
  <GridOverlay {...props}>
    <GridOverlay.Item id={ERGLItem.MAIN_TOOLBAR} key={ERGLItem.MAIN_TOOLBAR}>
      <MainToolbar isPlain />
    </GridOverlay.Item>

    <GridOverlay.Item id={ERGLItem.MINIMAP} key={ERGLItem.MINIMAP}>
      <Minimap />
    </GridOverlay.Item>
  </GridOverlay>
)

export default Overlay
