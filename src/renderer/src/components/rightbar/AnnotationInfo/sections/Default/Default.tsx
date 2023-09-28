import { memo, useCallback, useMemo } from 'react'
import { Field, Form, Formik, FormikConfig } from 'formik'

import { Button, Icon, Input, Label, List } from '@renderer/ui'
import { useImageStore } from '@renderer/store'
import { copyToClipboard } from '@common/utils/global'
import { useTranslation } from 'react-i18next'

type TFormValues = {
  id: TID
  parent: string
}

const Default = () => {
  const { t } = useTranslation(['annotation'])
  const data = useImageStore((state) => state.getSelectedAnnotation())

  const onSubmit: FormikConfig<TFormValues>['onSubmit'] = useCallback(
    (values) => console.log('Default', values),
    []
  )

  const initialValues: FormikConfig<TFormValues>['initialValues'] = useMemo(
    () => ({
      id: data?.id || '',
      parent: ''
    }),
    [data]
  )

  const copyText = useCallback(
    (text: string) => () => copyToClipboard(text),
    []
  )

  return (
    <Formik<TFormValues>
      validateOnChange
      enableReinitialize
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ handleSubmit, values }) => (
        <List as={Form}>
          <input type="submit" hidden />

          <List.Box>
            <List.Item>
              <Label htmlFor="default-id" css={{ textTransform: 'uppercase' }}>
                {t('annotation:properties.id.label')}
              </Label>

              <Input>
                <Field
                  disabled
                  required
                  id="default-id"
                  name="id"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                {values.id && (
                  <Input.Element>
                    <Button input onClick={copyText(values.id)}>
                      <Icon name="CopyIcon" width={14} height={14} />
                    </Button>
                  </Input.Element>
                )}
              </Input>
            </List.Item>

            <List.Item>
              <Label htmlFor="default-parent">
                {t('annotation:properties.parent.label')}
              </Label>

              <Input>
                <Field
                  disabled
                  required
                  id="default-parent"
                  name="parent"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                {values.parent && (
                  <Input.Element>
                    <Button input>
                      <Icon name="Crosshair2Icon" width={14} height={14} />
                    </Button>
                  </Input.Element>
                )}
              </Input>
            </List.Item>
          </List.Box>
        </List>
      )}
    </Formik>
  )
}

export default memo(Default)
