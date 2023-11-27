import { memo, useCallback, useState } from 'react'
import { ComponentProps } from '@stitches/react'
import { motion } from 'framer-motion'

import { Box, ContextMenu } from '@renderer/ui'
import { ViewerContextMenu } from '@renderer/menus'

import { OPEN_SEADRAGON_ID } from '@common/constants/viewer'

type TOpenSeadragonMainProps = ComponentProps<typeof Box> &
  React.ComponentProps<typeof motion.div>

type TContextMenuData = {
  x: number
  y: number
  id?: TID
}

const OpenSeadragonMain = ({ css, ...rest }: TOpenSeadragonMainProps) => {
  const [data, setData] = useState<TContextMenuData>({ x: 0, y: 0 })

  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const element = e.target as HTMLElement
      if (!element) return

      // Global context menu
      if (element.classList.value.includes('a9s-annotationlayer')) {
        return setData({ x: e.clientX, y: e.clientY })
      }

      const closest = element.closest('.a9s-annotation.hover')
      if (!closest) return

      const annotationId = closest.getAttribute('data-id')
      if (!annotationId) return

      // Annotation context menu
      return setData({ x: e.clientX, y: e.clientY, id: annotationId })
    },
    [setData]
  )

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <Box
          as={motion.div}
          id={OPEN_SEADRAGON_ID}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onContextMenu={handleContextMenu}
          css={{
            isolation: 'isolate',
            zIndex: '$base',

            position: 'absolute',
            inset: 0,

            cursor: 'var(--cursor-viewer)',
            backgroundColor: 'var(--page-color)',

            ...css
          }}
          {...rest}
        />
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ViewerContextMenu annotationId={data.id} />
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}

export default memo(OpenSeadragonMain) as typeof OpenSeadragonMain
