import { ChangeEvent, memo, useCallback, useRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { Box, Button, Icon, Text } from '@renderer/ui'
import { useImageStore } from '@renderer/store'
import { preventAllDefaults } from '@common/utils/global'

import * as S from './styled'

type TFileOpenerProps = ComponentProps<typeof Box>

const FileOpener = ({ css, ...rest }: TFileOpenerProps) => {
  const open = useImageStore((state) => state.open)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFocus = useCallback(() => {
    inputRef.current?.click()
  }, [inputRef])

  const handleOpen = useCallback(
    (files: File[]) => {
      files.forEach((file) => {
        open(file.path).then(console.info).catch(console.error)
      })
    },
    [open]
  )

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files
      if (!fileList?.length) return
      handleOpen(Array.from(fileList))
    },
    [handleOpen]
  )

  const handleDragEnter = useCallback(
    preventAllDefaults((event: React.DragEvent<HTMLLabelElement>) => {
      console.log('dragenter', event)
    }),
    []
  )

  const handleDragOver = useCallback(
    preventAllDefaults((event: React.DragEvent<HTMLLabelElement>) => {
      console.log('dragover', event)
    }),
    []
  )

  const handleDragDrop = useCallback(
    preventAllDefaults((event: React.DragEvent<HTMLLabelElement>) => {
      const fileList = event.dataTransfer?.files
      console.log('files', fileList)
      if (!fileList?.length) return
      handleOpen(Array.from(fileList))
    }),
    []
  )

  const handleDragLeave = useCallback(
    preventAllDefaults((event: React.DragEvent<HTMLLabelElement>) => {
      console.log('dragleave', event)
    }),
    []
  )

  return (
    <Box
      css={{
        borderWidth: '$2',
        borderStyle: '$dashed',
        borderColor: '$dark4',
        borderRadius: '$4',
        ...css
      }}
      {...rest}
    >
      <S.Dropzone
        htmlFor="file-opener"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDragDrop}
        onDragLeave={handleDragLeave}
      >
        <Box
          multiple
          hidden
          as="input"
          type="file"
          id="file-opener"
          ref={inputRef}
          onChange={handleChange}
          css={{ display: 'none' }}
        />

        <Icon
          name="FileIcon"
          width={50}
          height={50}
          css={{ color: '$light', marginBottom: '$2' }}
        />

        <Text as="h1" variant="2xl" css={{ color: '$light', fontWeight: 700 }}>
          Select a files or drag and drop here
        </Text>

        <Text variant="lg" css={{ color: '$dark4', fontWeight: 500 }}>
          Supported formats: VSI
        </Text>

        <Button onClick={handleFocus}>Select file</Button>
      </S.Dropzone>
    </Box>
  )
}

export default memo(FileOpener) as typeof FileOpener
