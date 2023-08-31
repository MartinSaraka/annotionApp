import { useCallback } from 'react'
import { ComponentProps } from '@stitches/react'
import {
  AllSidesIcon,
  BoxIcon,
  CircleIcon,
  ComponentInstanceIcon,
  DiscIcon,
  DotIcon,
  HomeIcon,
  Pencil1Icon,
  ZoomInIcon,
  ZoomOutIcon
} from '@radix-ui/react-icons'

import { Toolbar } from '@renderer/ui'
import { useImageStore } from '@renderer/store'

import { ETool, EToolsType } from '@common/constants/tools'
import {
  OPEN_SEA_DRAGON_FULL_PAGE_ID,
  OPEN_SEA_DRAGON_HOME_ID,
  OPEN_SEA_DRAGON_ZOOM_IN_ID,
  OPEN_SEA_DRAGON_ZOOM_OUT_ID
} from '@common/constants/viewer'

type TMainToolbarProps = Partial<ComponentProps<typeof Toolbar>>

const MainToolbar = (props: TMainToolbarProps) => {
  const activeTool = useImageStore((state) => state.activeTool())
  const toggleActiveTool = useImageStore((state) => state.toggleActiveTool)

  const handleToolChange = useCallback(
    (type: EToolsType) => (tool: ETool) => toggleActiveTool(type, tool),
    [toggleActiveTool]
  )

  return (
    <Toolbar orientation="vertical" {...props}>
      <Toolbar.Button id={OPEN_SEA_DRAGON_HOME_ID}>
        <HomeIcon />
      </Toolbar.Button>

      <Toolbar.Button id={OPEN_SEA_DRAGON_FULL_PAGE_ID}>
        <AllSidesIcon />
      </Toolbar.Button>

      <Toolbar.Button id={OPEN_SEA_DRAGON_ZOOM_IN_ID}>
        <ZoomInIcon />
      </Toolbar.Button>

      <Toolbar.Button id={OPEN_SEA_DRAGON_ZOOM_OUT_ID}>
        <ZoomOutIcon />
      </Toolbar.Button>

      <Toolbar.Separator orientation="horizontal" />

      <Toolbar.Group
        type="single"
        orientation="vertical"
        aria-label={EToolsType.ANNOTATION}
        value={activeTool?.value || ''}
        onValueChange={handleToolChange(EToolsType.ANNOTATION)}
      >
        <Toolbar.Toggle
          value={ETool.RECTANGLE}
          group={EToolsType.ANNOTATION}
          isActive={activeTool?.value === ETool.RECTANGLE}
        >
          <BoxIcon />
        </Toolbar.Toggle>

        <Toolbar.Toggle
          value={ETool.CIRCLE}
          group={EToolsType.ANNOTATION}
          isActive={activeTool?.value === ETool.CIRCLE}
        >
          <CircleIcon />
        </Toolbar.Toggle>

        <Toolbar.Toggle
          value={ETool.ELLIPSE}
          group={EToolsType.ANNOTATION}
          isActive={activeTool?.value === ETool.ELLIPSE}
        >
          <DiscIcon />
        </Toolbar.Toggle>

        <Toolbar.Toggle
          value={ETool.POLYGON}
          group={EToolsType.ANNOTATION}
          isActive={activeTool?.value === ETool.POLYGON}
        >
          <ComponentInstanceIcon />
        </Toolbar.Toggle>

        <Toolbar.Toggle
          value={ETool.POINT}
          group={EToolsType.ANNOTATION}
          isActive={activeTool?.value === ETool.POINT}
        >
          <DotIcon />
        </Toolbar.Toggle>

        <Toolbar.Toggle
          value={ETool.FREEHAND}
          group={EToolsType.ANNOTATION}
          isActive={activeTool?.value === ETool.FREEHAND}
        >
          <Pencil1Icon />
        </Toolbar.Toggle>
      </Toolbar.Group>
    </Toolbar>
  )
}

export default MainToolbar
