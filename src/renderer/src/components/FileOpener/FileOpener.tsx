import { ChangeEvent, memo, useCallback, useRef, useState } from 'react'
import { type ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'

import { Box, Icon, Text } from '@renderer/ui'
import { useImageStore } from '@renderer/store'

import { preventAllDefaults } from '@common/utils/global'
import { SUPPORTED_FORMATS } from '@common/constants/global'

import validationSchema, {
  TCreateImageInput
} from '@renderer/schemas/image/createImage'
import {
  CREATE_IMAGE,
  TCreateImageData
} from '@renderer/apollo/mutations/image'

import * as S from './styled'

type TStatus = 'idle' | 'loading' | 'error'

type TFileOpenerProps = ComponentProps<typeof Box>

const FileOpener = ({ css, ...rest }: TFileOpenerProps) => {
  const { t } = useTranslation(['common', 'editor'])

  const open = useImageStore((state) => state.open)

  const [status, setStatus] = useState<TStatus>('idle')
  const [createImage] = useMutation<TCreateImageData, TCreateImageInput>(
    CREATE_IMAGE
  )

  const areaRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFocus = useCallback(() => {
    inputRef.current?.click()
  }, [inputRef])

  const handleCreateImage = useCallback(
    (variables: TCreateImageInput['data']) => {
      const data = validationSchema.parse(variables)
      return createImage({ variables: { data } })
    },
    [createImage]
  )

  const handleOpen = useCallback(
    (files: File[]) => {
      setStatus('loading')

      const filePromises = files.map((file) =>
        open(file.path, handleCreateImage)
      )

      Promise.all(filePromises)
        .then(() => setStatus('idle'))
        .catch((err) => {
          console.log(err)
          setStatus('error')
        })
    },
    [open, setStatus, handleCreateImage]
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
    preventAllDefaults(() => {
      if (!areaRef.current) return
      areaRef.current.classList.add('hover')
    }),
    [areaRef]
  )

  const handleDragOver = useCallback(
    preventAllDefaults(() => {
      if (!areaRef.current) return
      areaRef.current.classList.add('hover')
    }),
    [areaRef]
  )

  const handleDragDrop = useCallback(
    preventAllDefaults((event: React.DragEvent<HTMLLabelElement>) => {
      if (areaRef.current) areaRef.current.classList.remove('hover')
      const fileList = event.dataTransfer?.files
      if (!fileList?.length) return
      handleOpen(Array.from(fileList))
    }),
    [areaRef, handleOpen]
  )

  const handleDragLeave = useCallback(
    preventAllDefaults(() => {
      if (!areaRef.current) return
      areaRef.current.classList.remove('hover')
    }),
    [areaRef]
  )

  return (
    <>
      <Box
        css={{
          width: '100%',
          maxWidth: 500,
          gap: '$1',
          ...css
        }}
        {...rest}
      >
        <S.Wrapper
          aria-label={t('aria.label.opener')}
          ref={areaRef}
          variant={status}
        >
          <S.Dropzone
            htmlFor="file-opener"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDrop={handleDragDrop}
            onDragLeave={handleDragLeave}
            aria-disabled={status === 'loading'}
          >
            <Box
              multiple
              hidden
              as="input"
              type="file"
              id="file-opener"
              name="files"
              ref={inputRef}
              onChange={handleChange}
              css={{ display: 'none' }}
              disabled={status === 'loading'}
            />

            <Icon
              name={status === 'error' ? 'CrumpledPaperIcon' : 'FilePlusIcon'}
              width={40}
              height={40}
            />

            <Text as="h1" variant="lg" css={{ fontWeight: 500 }}>
              {t('editor:opener.label')}{' '}
              <Text
                as="button"
                variant="lg"
                onClick={handleFocus}
                css={{
                  fontWeight: 600,
                  textDecoration: 'underline',
                  '&:hover': { color: '$blue2' }
                }}
              >
                {t('editor:opener.button')}
              </Text>
            </Text>
          </S.Dropzone>
        </S.Wrapper>

        <Box css={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text css={{ color: '$dark5', fontWeight: 500 }}>
            {t('editor:opener.formats', {
              formats: SUPPORTED_FORMATS.join(', ')
            })}
          </Text>

          {status === 'loading' && (
            <Text css={{ color: '$dark5', fontWeight: 500 }}>
              {t('editor:opener.loading')}
            </Text>
          )}

          {status === 'error' && (
            <Text css={{ color: '$crimson4', fontWeight: 500 }}>
              {t('editor:opener.error')}
            </Text>
          )}
        </Box>
      </Box>
    </>
  )
}

export default memo(FileOpener) as typeof FileOpener
