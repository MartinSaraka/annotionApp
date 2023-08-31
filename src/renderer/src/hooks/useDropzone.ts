import { useCallback, useEffect } from 'react'

export type TUseDropzoneProps = {
  onDragEnter?: (event: DragEvent) => void
  onDragOver?: (event: DragEvent) => void
  onDrop: (event: DragEvent) => void
  onDragLeave?: (event: DragEvent) => void
}

const useDropzone = <
  TElement extends HTMLElement | null,
  TRef extends React.MutableRefObject<TElement>
>(
  ref: TRef,
  { onDragEnter, onDragOver, onDrop, onDragLeave }: TUseDropzoneProps
) => {
  const handleDragEnter = useCallback(
    (event: DragEvent) => {
      event.preventDefault()
      event.stopPropagation()
      onDragEnter?.(event)
    },
    [onDragEnter]
  )

  const handleDragOver = useCallback(
    (event: DragEvent) => {
      event.preventDefault()
      event.stopPropagation()
      onDragOver?.(event)
    },
    [onDragOver]
  )

  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault()
      event.stopPropagation()
      onDrop(event)
    },
    [onDrop]
  )

  const handleDragLeave = useCallback(
    (event: DragEvent) => {
      event.preventDefault()
      event.stopPropagation()
      onDragLeave?.(event)
    },
    [onDragLeave]
  )

  useEffect(() => {
    ref.current?.addEventListener('dragenter', handleDragEnter)
    ref.current?.addEventListener('dragover', handleDragOver)
    ref.current?.addEventListener('drop', handleDrop)
    ref.current?.addEventListener('dragleave', handleDragLeave)

    return () => {
      ref.current?.removeEventListener('dragenter', handleDragEnter)
      ref.current?.removeEventListener('dragover', handleDragOver)
      ref.current?.removeEventListener('drop', handleDrop)
      ref.current?.removeEventListener('dragleave', handleDragLeave)
    }
  }, [
    ref.current,
    handleDragEnter,
    handleDragOver,
    handleDrop,
    handleDragLeave
  ])
}

export default useDropzone
