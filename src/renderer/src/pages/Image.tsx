import { memo } from 'react'

import { Box } from '@renderer/ui'
import { FileOpener, Viewer } from '@renderer/components'

import { useImageStore } from '@renderer/store'
import { getSelectedOrFirst } from '@common/utils/global'

const Image = () => {
  const activeImage = useImageStore(({ opened, selected, getData }) => {
    if (!selected || !getData(selected)) return
    return getSelectedOrFirst(opened, selected)
  })

  if (!activeImage) {
    return (
      <Box css={{ padding: '$4', height: '100%' }}>
        <FileOpener css={{ height: '100%' }} />
      </Box>
    )
  }

  return <Viewer info={activeImage.image} />
}

export default memo(Image)
