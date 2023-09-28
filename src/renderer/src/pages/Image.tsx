import { memo } from 'react'

import { FileOpener, Viewer } from '@renderer/components'
import { useImageStore } from '@renderer/store'

import { getSelectedOrFirst } from '@common/utils/global'

const Image = () => {
  // TODO: use a selector
  const activeImage = useImageStore(
    ({ opened, selected, getData }) =>
      !!selected && !!getData(selected) && getSelectedOrFirst(opened, selected)
  )

  if (!activeImage) {
    return <FileOpener />
  }

  return <Viewer info={activeImage.image} />
}

export default memo(Image)
