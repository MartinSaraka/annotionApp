import { memo, useCallback, useMemo } from 'react'
import { Field, Form, Formik, FormikConfig } from 'formik'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'

import { Button, Input, Label, List } from '@renderer/ui'
import { useImageStore } from '@renderer/store'

import { convertBytes, roundNumber } from '@common/utils/numbers'

import {
  TUpdateImageData,
  UPDATE_IMAGE
} from '@renderer/apollo/mutations/image'
import validationSchema, {
  TUpdateImageInput
} from '@renderer/schemas/image/updateImage'

type TFormValues = {
  filename: string
  uri: string
  format: string
  diskUncompressed: number
  diskCompressed: number
  sizeWidth: number
  sizeHeight: number
  zoom: number
  dimensionsC: number
  dimensionsZ: number
  dimensionsT: number
  pixelSizeW: number
  pixelSizeH: number
  pixelType: string
}

const Parameters = () => {
  const { t } = useTranslation(['common', 'image'])

  const imageId = useImageStore((state) => state.getId())
  const imageData = useImageStore((state) => state.getData())
  const setData = useImageStore((state) => state.setData)

  const [updateImage] = useMutation<TUpdateImageData, TUpdateImageInput>(
    UPDATE_IMAGE
  )

  const initialValues: FormikConfig<TFormValues>['initialValues'] = useMemo(
    () => ({
      filename: imageData?.filename || '',
      uri: imageData?.path || '',
      format: imageData?.format || '',
      diskUncompressed: roundNumber(
        convertBytes(imageData?.fileSize.uncompressed || 0, 'GiB'),
        1
      ),
      diskCompressed: roundNumber(
        convertBytes(imageData?.fileSize.compressed || 0, 'GiB'),
        1
      ),
      sizeWidth: roundNumber(imageData?.size.width.micro || 0, 2),
      sizeHeight: roundNumber(imageData?.size.height.micro || 0, 2),
      zoom: imageData?.magnification || 0,
      dimensionsC: imageData?.size.c || 0,
      dimensionsZ: imageData?.size.z || 0,
      dimensionsT: imageData?.size.t || 0,
      pixelSizeW: roundNumber(imageData?.pixel.width.micro || 0, 4),
      pixelSizeH: roundNumber(imageData?.pixel.height.micro || 0, 4),
      pixelType: imageData?.pixel.type || ''
    }),
    [imageData]
  )

  const handleUpdateImage = useCallback(
    async (data: TUpdateImageInput['data']) => {
      const variables = validationSchema.parse({ id: imageId, data })
      return updateImage({ variables })
    },
    [imageId]
  )

  const onSubmit: FormikConfig<TFormValues>['onSubmit'] = useCallback(
    (values) => {
      const oldName = imageData?.filename || ''
      setData(values)

      handleUpdateImage({ name: values.filename }).catch(() => {
        // TODO: handle error
        setData({ filename: oldName })
      })
    },
    [setData, handleUpdateImage, imageData?.filename]
  )

  return (
    <Formik<TFormValues>
      enableReinitialize
      validateOnChange
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ handleSubmit }) => (
        <List
          as={Form}
          title={t('image:sections.parameters')}
          collapsible
          borderTop
        >
          <input type="submit" hidden />

          <List.Box>
            <List.Item>
              <Label htmlFor="parameters-filename">
                {t('image:properties.name.label')}
              </Label>

              <Input>
                <Field
                  required
                  title={imageData?.filename}
                  id="parameters-filename"
                  name="filename"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />
              </Input>
            </List.Item>

            <List.Item>
              <Label htmlFor="parameters-uri">
                {t('image:properties.uri.label')}
              </Label>

              <Input>
                <Field
                  required
                  disabled
                  id="parameters-uri"
                  title={imageData?.path}
                  name="uri"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />
              </Input>
            </List.Item>

            <List.Item>
              <Label htmlFor="parameters-format">
                {t('image:properties.format.label')}
              </Label>

              <Input>
                <Field
                  required
                  disabled
                  id="parameters-format"
                  title={imageData?.format}
                  name="format"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />
              </Input>
            </List.Item>

            <List.Item>
              <Label htmlFor="parameters-disk-uncompressed">
                {t('image:properties.disk.label')}
              </Label>

              <Input>
                <Input.Element>
                  <Label small htmlFor="parameters-disk-uncompressed">
                    {t('compression.uncompressed')}
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  title={`${imageData?.fileSize.uncompressed} B`}
                  id="parameters-disk-uncompressed"
                  name="diskUncompressed"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                <Input.Element>
                  <Button input disabled>
                    GiB
                  </Button>
                </Input.Element>
              </Input>

              <Input>
                <Input.Element>
                  <Label small htmlFor="parameters-disk-compressed">
                    {t('compression.compressed')}
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  title={`${imageData?.fileSize.compressed} B`}
                  id="parameters-disk-compressed"
                  name="diskCompressed"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                <Input.Element>
                  <Button input disabled>
                    GiB
                  </Button>
                </Input.Element>
              </Input>
            </List.Item>
          </List.Box>

          <List.Box>
            <List.Item>
              <Label htmlFor="parameters-size-width">
                {t('image:properties.size.label')}
              </Label>

              <Input>
                <Input.Element>
                  <Label small htmlFor="parameters-size-width">
                    {t('dimensions.width')}
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  title={imageData?.size.width.micro}
                  id="parameters-size-width"
                  name="sizeWidth"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                <Input.Element>
                  <Button input disabled>
                    μm
                  </Button>
                </Input.Element>
              </Input>

              <Input>
                <Input.Element>
                  <Label small htmlFor="parameters-size-height">
                    {t('dimensions.height')}
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  title={imageData?.size.height.micro}
                  id="parameters-size-height"
                  name="sizeHeight"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                <Input.Element>
                  <Button input disabled>
                    μm
                  </Button>
                </Input.Element>
              </Input>
            </List.Item>

            <List.Item>
              <Label htmlFor="parameters-zoom">
                {t('image:properties.zoom.label')}
              </Label>

              <Input>
                <Field
                  required
                  disabled
                  id="parameters-zoom"
                  name="zoom"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                <Input.Element>
                  <Button input disabled>
                    x
                  </Button>
                </Input.Element>
              </Input>
            </List.Item>

            <List.Item>
              <Label htmlFor="parameters-dimensions-c">
                {t('image:properties.dimensions.label')}
              </Label>

              <Input>
                <Input.Element>
                  <Label small htmlFor="parameters-dimensions-c">
                    C
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  id="parameters-dimensions-c"
                  name="dimensionsC"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />
              </Input>

              <Input>
                <Input.Element>
                  <Label small htmlFor="parameters-dimensions-z">
                    Z
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  id="parameters-dimensions-z"
                  name="dimensionsZ"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />
              </Input>

              <Input>
                <Input.Element>
                  <Label small htmlFor="parameters-dimensions-t">
                    T
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  id="parameters-dimensions-t"
                  name="dimensionsT"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />
              </Input>
            </List.Item>

            <List.Item>
              <Label htmlFor="parameters-pyramid">
                {t('image:properties.pyramid.label')}
              </Label>

              <Input>
                <Field
                  required
                  disabled
                  id="parameters-pyramid"
                  name="pyramid"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />
              </Input>
            </List.Item>
          </List.Box>

          <List.Box title={t('image:properties.pixel.label')}>
            <List.Item>
              <Label htmlFor="parameters-pixel-size-w">
                {t('image:properties.pixel.size.label')}
              </Label>

              <Input>
                <Input.Element>
                  <Label small htmlFor="parameters-pixel-size-w">
                    {t('dimensions.width')}
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  title={imageData?.pixel.width.micro.toString()}
                  id="parameters-pixel-size-2"
                  name="pixelSizeW"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                <Input.Element>
                  <Button input disabled>
                    μm
                  </Button>
                </Input.Element>
              </Input>

              <Input>
                <Input.Element>
                  <Label small htmlFor="parameters-pixel-size-h">
                    {t('dimensions.height')}
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  title={imageData?.pixel.height.micro.toString()}
                  id="parameters-pixel-size-h"
                  name="pixelSizeH"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                <Input.Element>
                  <Button input disabled>
                    μm
                  </Button>
                </Input.Element>
              </Input>
            </List.Item>

            <List.Item>
              <Label htmlFor="parameters-pixel-type">
                {t('image:properties.pixel.type.label')}
              </Label>

              <Input>
                <Field
                  required
                  disabled
                  id="parameters-pixel-type"
                  name="pixelType"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />
              </Input>
            </List.Item>
          </List.Box>
        </List>
      )}
    </Formik>
  )
}

export default memo(Parameters)
