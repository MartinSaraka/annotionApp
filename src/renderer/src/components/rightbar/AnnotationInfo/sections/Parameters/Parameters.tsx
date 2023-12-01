import { memo, useCallback, useMemo } from 'react'
import { Field, Form, Formik, FormikConfig } from 'formik'
import { useTranslation } from 'react-i18next'

import { Input, Label, List } from '@renderer/ui'

import { type TAnnotation } from '@common/types/annotation'

import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { AnnotationHandler } from '@renderer/handlers'

type TFormValues = {
  annotation: TAnnotation | null
  name: string
  description: string
}

const Parameters = () => {
  const { t } = useTranslation(['annotation'])

  const update = useAnnotoriousStore((state) => state.saveAndUpdateAnnotation)
  const annotation = useImageStore((state) => state.getSelectedAnnotation())

  const onSubmit: FormikConfig<TFormValues>['onSubmit'] = useCallback(
    async (values) => {
      if (!values.annotation) return

      const withNaming = AnnotationHandler.upsertBody(
        values.annotation,
        'TextualBody',
        'naming',
        values.name
      )

      const data = AnnotationHandler.upsertBody(
        withNaming,
        'TextualBody',
        'describing',
        values.description
      )

      await update(data)
    },
    [update]
  )

  const initialValues: FormikConfig<TFormValues>['initialValues'] =
    useMemo(() => {
      const data = AnnotationHandler.getBody(annotation, [
        'naming',
        'describing'
      ])

      return {
        annotation,
        name: data.naming || '',
        description: data.describing || ''
      } as TFormValues
    }, [annotation])

  return (
    <Formik<TFormValues>
      validateOnChange
      enableReinitialize
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ handleSubmit }) => (
        <List as={Form} title={t('annotation:sections.parameters')}>
          <input type="submit" hidden />

          {/* Box 1 */}
          <List.Box>
            {/* Name */}
            <List.Item css={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <Label htmlFor="parameters-name">
                {t('annotation:properties.name.label')}
              </Label>

              <Input>
                <Field
                  required
                  id="parameters-name"
                  name="name"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />
              </Input>
            </List.Item>

            {/* Description */}
            <List.Item css={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <Label htmlFor="parameters-description">
                {t('annotation:properties.description.label')}
              </Label>

              <Input>
                <Field
                  rows={2}
                  id="parameters-description"
                  name="description"
                  as={Input.TextArea}
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
