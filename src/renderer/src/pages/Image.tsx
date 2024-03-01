import { memo, useCallback, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

import { Box } from '@renderer/ui'
import { FileOpener, Viewer } from '@renderer/components'

import { useImageStore } from '@renderer/store'

import { GET_IMAGE, type TGetImageData } from '@renderer/apollo/queries/image'
import validationSchema, { type TIdInput } from '@renderer/schemas/id'

// TODO: implement not found

const Image = () => {
  const [getImage] = useLazyQuery<TGetImageData, TIdInput>(GET_IMAGE, {
    fetchPolicy: 'network-only'
  })

  const activeTab = useImageStore((state) => state.selected)
  const getSelected = useImageStore((state) => state.getSelected)

  const activeImage = useImageStore((state) => state.getSelected())
  const setData = useImageStore((state) => state.setData)

  const handleImageData = useCallback(() => {
    const selectedImage = getSelected()
    if (!selectedImage) return

    const { id } = validationSchema.parse({
      id: selectedImage.id
    })

    getImage({ variables: { id } })
      .then(({ data }) => {
        if (!data) throw new Error('NO_DATA')
        console.info('[Sync]: Get Image')
        setData({
          filename: data.image.name
        })
      })
      .catch(() => {
        // TODO: show toast, handle error
        console.error('error')
      })
  }, [getImage, setData, getSelected])

  useEffect(() => {
    handleImageData()
  }, [activeTab])

  useEffect(() => {
    window.api.onWindowIsFocused(handleImageData)
  }, [handleImageData])

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
