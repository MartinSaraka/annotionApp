import { memo, useCallback, useMemo } from 'react'
import { Form, Formik, FormikConfig } from 'formik'
import { useTranslation } from 'react-i18next'

import { Box, Button, Dialog, Icon, Text } from '@renderer/ui'

import { useImageStore } from '@renderer/store'
import { ImportExportHandler } from '@renderer/handlers'

import { type TExportOptions } from '@renderer/handlers/ImportExportHandler'
import { saveFile } from '@common/utils/file'

type TFormValues = TExportOptions

// TODO: options

const ExportAnnotations = () => {
  const { t } = useTranslation('dialogs')

  const image = useImageStore((state) => state.getSelected())
  const annotations = useImageStore((state) => state.getAnnotations())

  const initialValues: FormikConfig<TFormValues>['initialValues'] = useMemo(
    () => ({
      withHidden: true
    }),
    []
  )

  const onSubmit: FormikConfig<TFormValues>['onSubmit'] = useCallback(
    async (options) => {
      if (!annotations || !image) return

      const geojson = ImportExportHandler.export(
        { ...image.image, ...image.data },
        Object.values(annotations),
        image.classes,
        options
      )

      if (!geojson) return

      const filename = `${geojson.properties.name}.geojson`
      saveFile(geojson, filename)
    },
    [image, annotations]
  )

  return (
    <>
      <Dialog.Header>
        <Dialog.Title asChild>
          <Text variant="lg" css={{ fontWeight: 500 }}>
            {t('exportAnnotations.title')}
          </Text>
        </Dialog.Title>
      </Dialog.Header>

      <Formik<TFormValues>
        validateOnChange
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={initialValues}
      >
        {() => (
          <Box as={Form} css={{ padding: '$4', gap: '$4' }}>
            <Box>Export all annotations</Box>

            <Box
              css={{
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
            >
              <Button type="submit">
                <Icon name="DownloadIcon" width={14} height={14} />
                {t('exportAnnotations.submit')}
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </>
  )
}

export default memo(ExportAnnotations)
