import { memo, useCallback } from 'react'
import { Field, Form, Formik, FormikConfig } from 'formik'

import { Button, Icon, Input, Label, List } from '@renderer/ui'
import { useSettingsStore } from '@renderer/store'

import { setGlobalCssVariable } from '@common/utils/global'
import { DEFAULT_PAGE_COLOR } from '@renderer/store/settings'

type TFormValues = {
  pageColor: string
}

const PageColor = () => {
  const pageColor = useSettingsStore((state) => state.pageColor)
  const setPageColor = useSettingsStore((state) => state.setPageColor)
  const resetPageColor = useSettingsStore((state) => state.resetPageColor)

  const onChange: React.FormEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const value = event.currentTarget.getAttribute('value')
      if (value) setGlobalCssVariable('--page-color', value)
    },
    [setPageColor]
  )

  const onSubmit: FormikConfig<TFormValues>['onSubmit'] = useCallback(
    (values) => setPageColor(values.pageColor),
    [setPageColor]
  )

  return (
    <Formik<TFormValues>
      validateOnChange
      enableReinitialize
      onSubmit={onSubmit}
      initialValues={{ pageColor }}
    >
      {({ handleSubmit }) => (
        <List as={Form}>
          <input type="submit" hidden />

          <List.Box>
            <List.Item>
              <Label htmlFor="pageHex">Page</Label>

              <Input square>
                <Field
                  required
                  type="color"
                  id="pageColor"
                  name="pageColor"
                  as={Input.Field}
                  onBlur={handleSubmit}
                  onChangeCapture={onChange}
                />
              </Input>

              <Input>
                <Input.Element>
                  <Label small htmlFor="pageHex">
                    #
                  </Label>
                </Input.Element>

                <Field
                  required
                  id="pageHex"
                  name="pageColor"
                  as={Input.Field}
                  onBlur={handleSubmit}
                />

                <Input.Element>
                  <Button
                    input
                    onClick={resetPageColor}
                    disabled={pageColor === DEFAULT_PAGE_COLOR}
                  >
                    <Icon name="ResetIcon" width={14} height={14} />
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

export default memo(PageColor)
