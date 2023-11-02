import { useCallback, useEffect } from 'react'

import { OpenSeadragonMain } from '@renderer/ui/openseadragon'
import { useFullDropzone, useViewer } from '@renderer/hooks'

import { ClassHandler } from '@renderer/handlers'
import { useImageStore, useSettingsStore } from '@renderer/store'

import { TImageInfo } from '@common/types/image'
import { setGlobalCssVariable } from '@common/utils/global'

type TBaseProps = {
  info: TImageInfo
}

const Viewer = ({ info }: TBaseProps) => {
  useViewer(info)

  const open = useImageStore((state) => state.open)
  const classes = useImageStore((state) => state.getClasses())

  const setInitialPageColor = useSettingsStore(
    (state) => () => setGlobalCssVariable('--page-color', state.pageColor)
  )
  const setInitialSelectedAnnotation = useImageStore(
    (state) => state.deselectAnnotations
  )

  const handleFileOpen = useCallback(
    (path: string) => {
      open(path, false).then(console.info).catch(console.error)
    },
    [open]
  )

  useFullDropzone(handleFileOpen)

  useEffect(() => {
    setInitialPageColor()
    setInitialSelectedAnnotation()
    ClassHandler.initClasses(classes)
  }, [info])

  return <OpenSeadragonMain />
}

export default Viewer
