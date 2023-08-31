import { setHtmlElementAttribute } from '@common/utils/global'
import { useCallback, useEffect } from 'react'

const useFullDropzone = <T extends (path: string) => void>(callback: T) => {
  const handleDragEnter = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()

    setHtmlElementAttribute('data-dropzone-visible', true)
  }, [])

  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault()
      event.stopPropagation()

      const path = event?.dataTransfer?.files[0]?.path
      if (path) callback(path)

      setHtmlElementAttribute('data-dropzone-visible', false)
    },
    [callback]
  )

  const handleDragLeave = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (!event.screenX && !event.screenY) {
      setHtmlElementAttribute('data-dropzone-visible', false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('dragenter', handleDragEnter)
    window.addEventListener('dragover', handleDragOver)
    window.addEventListener('drop', handleDrop)
    window.addEventListener('dragleave', handleDragLeave)

    return () => {
      window.removeEventListener('dragenter', handleDragEnter)
      window.removeEventListener('dragover', handleDragOver)
      window.removeEventListener('drop', handleDrop)
      window.removeEventListener('dragleave', handleDragLeave)
    }
  }, [])
}

export default useFullDropzone
