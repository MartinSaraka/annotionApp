import { useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

import { Box } from '@renderer/ui'
import { Overlay } from './sections'

import { useImageStore } from '@renderer/store'
import { useAnnotations, useFullDropzone, useViewer } from '@renderer/hooks'

import { TImageInfo } from '@common/types/image'
import { OPEN_SEA_DRAGON_ID } from '@common/constants/viewer'
import { EToolsType } from '@common/constants/tools'

type TBaseProps = {
  info: TImageInfo
}

const Viewer = ({ info }: TBaseProps) => {
  const { viewer } = useViewer(info)
  const { setTool, resetTool } = useAnnotations(viewer.osd)

  const activeTool = useImageStore((state) => state.activeTool())
  const open = useImageStore((state) => state.open)

  const handleFileOpen = useCallback(
    (path: string) => {
      open(path, false).then(console.info).catch(console.error)
    },
    [open]
  )

  useFullDropzone(handleFileOpen)

  useEffect(() => {
    if (activeTool?.type === EToolsType.ANNOTATION) {
      return setTool(activeTool.value || '')
    }

    resetTool()
  }, [activeTool])

  return (
    <>
      <Box
        as={motion.div}
        id={OPEN_SEA_DRAGON_ID}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        css={{
          isolation: 'isolate',
          zIndex: '$base',

          position: 'absolute',
          inset: 0,

          cursor: 'var(--cursor-viewer)'
        }}
      />

      <Overlay />
    </>
  )
}

export default Viewer
