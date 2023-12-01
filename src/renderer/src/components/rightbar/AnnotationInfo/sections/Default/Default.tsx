import { memo, useCallback, useMemo } from 'react'
import { Field, Form, Formik, FormikConfig } from 'formik'
import { useTranslation } from 'react-i18next'

import { Button, Icon, Input, Label, List, Text, Tooltip } from '@renderer/ui'
import { copyToClipboard } from '@common/utils/global'

import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { AnnotationHandler, AnnotoriousHandler } from '@renderer/handlers'

type TFormValues = {
  id: TID
  parent: TID
}

// TODO: change parent to name

const Default = () => {
  const { t } = useTranslation(['common', 'annotation'])

  const anno = useAnnotoriousStore((state) => state.anno)
  const annotation = useImageStore((state) => state.getSelectedAnnotation())

  const onSubmit: FormikConfig<TFormValues>['onSubmit'] = useCallback(
    (values) => console.log('Default', values),
    []
  )

  const initialValues: FormikConfig<TFormValues>['initialValues'] =
    useMemo(() => {
      const annotationBody = AnnotationHandler.getBody(annotation, ['parent'])

      const parent =
        annotationBody?.parent &&
        annotationBody?.parent !== '0' &&
        annotationBody?.parent

      return {
        id: annotation?.id || '',
        parent: parent || ''
      }
    }, [annotation])

  const copyText = useCallback(
    (text: string) => () => copyToClipboard(text),
    []
  )

  const handleZoomToParent = useCallback(
    (parentId?: TID) => () => {
      if (!anno || !parentId) return
      AnnotoriousHandler.instance(anno).zoomToParent(parentId)
    },
    [anno]
  )

  return (
    <Formik<TFormValues>
      validateOnChange
      enableReinitialize
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ handleSubmit, values }) => (
        <List as={Form} borderTop>
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
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Button input onClick={copyText(values.id)}>
                          <Icon name="CopyIcon" width={14} height={14} />
                        </Button>
                      </Tooltip.Trigger>

                      <Tooltip.Content side="left" align="center">
                        <Text>{t('tooltips.copyAnnotationId')}</Text>
                        <Tooltip.Arrow />
                      </Tooltip.Content>
                    </Tooltip.Root>
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
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Button
                          input
                          onClick={handleZoomToParent(values.parent)}
                        >
                          <Icon name="Crosshair2Icon" width={14} height={14} />
                        </Button>
                      </Tooltip.Trigger>

                      <Tooltip.Content side="left" align="center">
                        <Text>{t('tooltips.zoomToParentAnnotation')}</Text>
                        <Tooltip.Arrow />
                      </Tooltip.Content>
                    </Tooltip.Root>
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
