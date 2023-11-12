import { memo, useCallback, useMemo } from 'react'
import { Field, Form, Formik, FormikConfig } from 'formik'

import { Button, Input, Label, List } from '@renderer/ui'
import { useImageStore } from '@renderer/store'
import { convertBytes, roundNumber } from '@common/utils/numbers'

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
  const data = useImageStore((state) => state.getData())
  const setData = useImageStore((state) => state.setData)

  const initialValues: FormikConfig<TFormValues>['initialValues'] = useMemo(
    () => ({
      filename: data?.filename || '',
      uri: data?.path || '',
      format: data?.format || '',
      diskUncompressed: roundNumber(
        convertBytes(data?.fileSize.uncompressed || 0, 'GiB'),
        1
      ),
      diskCompressed: roundNumber(
        convertBytes(data?.fileSize.compressed || 0, 'GiB'),
        1
      ),
      sizeWidth: roundNumber(data?.size.width.micro || 0, 2),
      sizeHeight: roundNumber(data?.size.height.micro || 0, 2),
      zoom: data?.magnification || 0,
      dimensionsC: data?.size.c || 0,
      dimensionsZ: data?.size.z || 0,
      dimensionsT: data?.size.t || 0,
      pixelSizeW: roundNumber(data?.pixel.width.micro || 0, 4),
      pixelSizeH: roundNumber(data?.pixel.height.micro || 0, 4),
      pixelType: data?.pixel.type || ''
    }),
    [data]
  )

  const onSubmit: FormikConfig<TFormValues>['onSubmit'] = useCallback(
    (values) => {
      setData(values)
    },
    []
  )

  return (
    <Formik<TFormValues>
      enableReinitialize
      validateOnChange
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ handleSubmit }) => (
        <List as={Form} title="Parameters" collapsible borderTop>
          <input type="submit" hidden />

          <List.Box>
            <List.Item>
              <Label htmlFor="parameters-filename">Name</Label>

              <Input>
                <Field
                  required
                  title={data?.filename}
                  id="parameters-filename"
                  name="filename"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />
              </Input>
            </List.Item>

            <List.Item>
              <Label htmlFor="parameters-uri">URI</Label>

              <Input>
                <Field
                  required
                  disabled
                  id="parameters-uri"
                  title={data?.path}
                  name="uri"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />
              </Input>
            </List.Item>

            <List.Item>
              <Label htmlFor="parameters-format">Format</Label>

              <Input>
                <Field
                  required
                  disabled
                  id="parameters-format"
                  title={data?.format}
                  name="format"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />
              </Input>
            </List.Item>

            <List.Item>
              <Label htmlFor="parameters-disk-uncompressed">Disk</Label>

              <Input>
                <Input.Element>
                  <Label small htmlFor="parameters-disk-uncompressed">
                    Unc.
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  title={`${data?.fileSize.uncompressed} B`}
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
                    Com.
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  title={`${data?.fileSize.compressed} B`}
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
              <Label htmlFor="parameters-size-width">Size</Label>

              <Input>
                <Input.Element>
                  <Label small htmlFor="parameters-size-width">
                    W
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  title={data?.size.width.micro}
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
                    H
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  title={data?.size.height.micro}
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
              <Label htmlFor="parameters-zoom">Zoom</Label>

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
              <Label htmlFor="parameters-dimensions-c">Dim.</Label>

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
              <Label htmlFor="parameters-pyramid">Pyramid</Label>

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

          <List.Box title="pixel">
            <List.Item>
              <Label htmlFor="parameters-pixel-size-w">Size</Label>

              <Input>
                <Input.Element>
                  <Label small htmlFor="parameters-pixel-size-w">
                    W
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  title={data?.pixel.width.micro.toString()}
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
                    H
                  </Label>
                </Input.Element>

                <Field
                  required
                  disabled
                  title={data?.pixel.height.micro.toString()}
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
              <Label htmlFor="parameters-pixel-type">Type</Label>

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
