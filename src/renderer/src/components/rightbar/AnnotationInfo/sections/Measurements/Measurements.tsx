import { memo, useCallback, useMemo } from 'react'
import { Field, Form, Formik, FormikConfig } from 'formik'

import { Button, Input, Label, List } from '@renderer/ui'
import { useImageStore } from '@renderer/store'

import { MeasurementUtils } from '@common/utils'
import { roundNumber } from '@common/utils/numbers'
import { TAnnotation } from '@common/types/annotation'
import { useTranslation } from 'react-i18next'

type TFormValues = {
  annotation: TAnnotation | null
  positionX: number
  positionY: number
  centroidX: number
  centroidY: number
  area: number
  perimeter: number
}

const defaultValues: TFormValues = {
  annotation: null,
  positionX: 0,
  positionY: 0,
  centroidX: 0,
  centroidY: 0,
  area: 0,
  perimeter: 0
}

const Measurements = () => {
  const { t } = useTranslation(['common', 'annotation'])

  const annotation = useImageStore((state) => state.getSelectedAnnotation())
  const data = useImageStore((state) => state.getData())

  const onSubmit: FormikConfig<TFormValues>['onSubmit'] = useCallback(
    (values) => console.log('Measurements', values),
    []
  )

  const initialValues: FormikConfig<TFormValues>['initialValues'] =
    useMemo(() => {
      if (!annotation || !data) return defaultValues

      const utils = MeasurementUtils.from(annotation, {
        width: data.pixel.width.micro,
        height: data.pixel.height.micro
      })

      const position = utils.position
      const centroid = utils.centroid

      return {
        ...defaultValues,
        annotation,
        positionX: roundNumber(position.x),
        positionY: roundNumber(position.y),
        centroidX: roundNumber(centroid.x),
        centroidY: roundNumber(centroid.y),
        area: roundNumber(utils.area),
        perimeter: roundNumber(utils.perimeter)
      }
    }, [annotation, data])

  return (
    <Formik<TFormValues>
      validateOnChange
      enableReinitialize
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ handleSubmit }) => (
        <List
          as={Form}
          title={t('annotation:sections.measurements')}
          collapsible
        >
          <input type="submit" hidden />

          {/* Box 1 */}
          <List.Box>
            {/* Position */}
            <List.Item>
              <Label htmlFor="measurements-position-x">
                {t('annotation:properties.position.label')}
              </Label>

              <Input>
                <Input.Element text>
                  <Label small htmlFor="measurements-position-x">
                    {t('common:position.x')}
                  </Label>
                </Input.Element>

                <Field
                  disabled
                  required
                  id="measurements-position-x"
                  name="positionX"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                <Input.Element>
                  <Button input disabled>
                    {t('common:unit.micro')}
                  </Button>
                </Input.Element>
              </Input>

              <Input>
                <Input.Element text>
                  <Label small htmlFor="measurements-position-y">
                    {t('common:position.y')}
                  </Label>
                </Input.Element>

                <Field
                  disabled
                  required
                  id="measurements-position-y"
                  name="positionY"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                <Input.Element>
                  <Button input disabled>
                    {t('common:unit.micro')}
                  </Button>
                </Input.Element>
              </Input>
            </List.Item>

            {/* Centroid */}
            <List.Item>
              <Label htmlFor="measurements-centroid-x">
                {t('annotation:properties.centroid.label')}
              </Label>

              <Input>
                <Input.Element text>
                  <Label small htmlFor="measurements-centroid-x">
                    {t('common:position.x')}
                  </Label>
                </Input.Element>

                <Field
                  disabled
                  required
                  id="measurements-centroid-x"
                  name="centroidX"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                <Input.Element>
                  <Button input disabled>
                    {t('common:unit.micro')}
                  </Button>
                </Input.Element>
              </Input>

              <Input>
                <Input.Element text>
                  <Label small htmlFor="measurements-centroid-y">
                    {t('common:position.y')}
                  </Label>
                </Input.Element>

                <Field
                  disabled
                  required
                  id="measurements-centroid-y"
                  name="centroidY"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                <Input.Element>
                  <Button input disabled>
                    {t('common:unit.micro')}
                  </Button>
                </Input.Element>
              </Input>
            </List.Item>
          </List.Box>

          {/* Box 2 */}
          <List.Box>
            {/* Area */}
            <List.Item>
              <Label htmlFor="measurements-area">
                {t('annotation:properties.area.label')}
              </Label>

              <Input>
                <Field
                  disabled
                  required
                  id="measurements-area"
                  name="area"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                <Input.Element>
                  <Button input disabled>
                    <span>
                      {t('common:unit.micro')}
                      <sup>2</sup>
                    </span>
                  </Button>
                </Input.Element>
              </Input>
            </List.Item>

            {/* Perimeter */}
            <List.Item>
              <Label htmlFor="measurements-perimeter">
                {t('annotation:properties.perimeter.label')}
              </Label>

              <Input>
                <Field
                  disabled
                  required
                  id="measurements-perimeter"
                  name="perimeter"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                <Input.Element>
                  <Button input disabled>
                    {t('common:unit.micro')}
                  </Button>
                </Input.Element>
              </Input>
            </List.Item>
          </List.Box>
        </List>
      )}
    </Formik>
  )
}

export default memo(Measurements)
