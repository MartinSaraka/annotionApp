import { ChangeEvent, memo, useCallback } from 'react'
import { ComponentProps } from '@stitches/react'
import { FileIcon } from '@radix-ui/react-icons'

import { Box, Button, Text } from '@renderer/ui'
import { useImageStore, useToastStore } from '@renderer/store'
import { preventAllDefaults } from '@common/utils/global'

import * as S from './styled'

type TFileOpenerProps = ComponentProps<typeof Box>

const FileOpener = ({ css, ...rest }: TFileOpenerProps) => {
  const open = useImageStore((state) => state.open)
  const show = useToastStore((state) => state.show)

  const handleOpen = useCallback(
    (files: File[]) => {
      files.forEach((file) => {
        open(file.path, false).then(console.info).catch(console.error)
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
        width: '100%',
        height: '100%',
        padding: '$4',
        flex: 1,
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
          as={FileIcon}
          width={50}
          height={50}
          css={{
            color: '$gray12',
            marginBottom: '$2'
          }}
        />

        <Text as="h1" variant="lg" css={{ color: '$gray12', fontWeight: 700 }}>
          Select a files or drag and drop here
        </Text>

        <Text variant="base" css={{ color: '$gray11', fontWeight: 500 }}>
          Supported formats: VSI
        </Text>

        <Button
          onClick={() =>
            show({
              title: 'Update available'
            })
          }
        >
          Select file
        </Button>

        <Box
          multiple
          as="input"
          type="file"
          id="file-opener"
          onChange={handleChange}
          css={{ display: 'none' }}
        />
      </S.Dropzone>
    </Box>
  )
}

export default memo(FileOpener) as typeof FileOpener
