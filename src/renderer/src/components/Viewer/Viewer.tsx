import { memo, useEffect } from 'react'

import { OpenSeadragonMain } from '@renderer/ui/openseadragon'

import { useViewer } from '@renderer/hooks'
import { ClassHandler } from '@renderer/handlers'
import { useImageStore, useSettingsStore } from '@renderer/store'

import { type TImageInfo } from '@common/types/image'
import { setGlobalCssVariable } from '@common/utils/global'

type TBaseProps = {
  info: TImageInfo
}

const Viewer = ({ info }: TBaseProps) => {
  useViewer(info)

  const classes = useImageStore((state) => state.getClasses())
  const checkClasses = useImageStore((state) => state.checkClasses)

  const setInitialPageColor = useSettingsStore(
    (state) => () => setGlobalCssVariable('--page-color', state.pageColor)
  )
  const setInitialSelectedAnnotation = useImageStore(
    (state) => state.deselectAnnotations
  )

  useEffect(() => {
    setInitialPageColor()
    setInitialSelectedAnnotation()
    checkClasses()
    ClassHandler.initClasses(classes)
  }, [info])

  return <OpenSeadragonMain />
}

export default memo(Viewer) as typeof Viewer
