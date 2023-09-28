import { useCallback } from 'react'

import { OpenSeadragonMain } from '@renderer/ui/openseadragon'
import { useDidMount, useFullDropzone, useViewer } from '@renderer/hooks'

import { useImageStore, useSettingsStore } from '@renderer/store'
import { setGlobalCssVariable } from '@common/utils/global'
import { TImageInfo } from '@common/types/image'

type TBaseProps = {
  info: TImageInfo
}

const Viewer = ({ info }: TBaseProps) => {
  useViewer(info)

  const open = useImageStore((state) => state.open)

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

  useDidMount(() => {
    setInitialPageColor()
    setInitialSelectedAnnotation()
  })

  return <OpenSeadragonMain />
}

export default Viewer
