import { memo, useCallback, useMemo, useRef } from 'react'
import { Field, Form, Formik, FormikConfig } from 'formik'

import {
  Box,
  Button,
  Chip,
  Icon,
  Input,
  Label,
  List,
  Popover
} from '@renderer/ui'

import { useImageStore } from '@renderer/store'
import { TAnnotationClass } from '@common/types/annotation'
import { ClassHandler } from '@renderer/handlers'

type TUpsertClassProps = {
  data?: TAnnotationClass
  onCreate?: (data: TAnnotationClass) => void
}

type TFormValues = NonNullable<TUpsertClassProps['data']>

const UpsertClass = ({ data, onCreate }: TUpsertClassProps) => {
  const operation = !data ? 'Create' : 'Update'

  const closeRef = useRef<HTMLButtonElement | null>(null)

  const upsertClass = useImageStore((state) => state.upsertClass)

  const initialValues: FormikConfig<TFormValues>['initialValues'] = useMemo(
    () => ({
      id: data?.id || '',
      name: data?.name || '',
      color: data?.color || '#0C8CE9'
    }),
    [data]
  )

  const onSubmit: FormikConfig<TFormValues>['onSubmit'] = useCallback(
    (values) => {
      const created = upsertClass(values)
      if (created) {
        ClassHandler.upsertClass(created)
        onCreate?.(created)
      }
      closeRef.current?.click()
    },
    [closeRef, upsertClass, onCreate]
  )

  return (
    <Formik<TFormValues>
      enableReinitialize
      validateOnChange
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ values, initialValues: init }) => (
        <List
          as={Form}
          title={`${operation} ${operation === 'Create' ? 'new ' : ''}class`}
          actions={
            <Popover.Close asChild ref={closeRef}>
              <Button ghost condensed css={{ margin: '-$1' }}>
                <Icon name="Cross2Icon" width={16} height={16} />
              </Button>
            </Popover.Close>
          }
        >
          <Box
            css={{
              backgroundColor: '$dark2',
              marginInline: '-$4',
              borderWidth: '$1',
              borderStyle: '$solid',
              borderColor: '$dark3',
              borderRightWidth: 0,
              borderLeftWidth: 0,
              padding: '$4',
              marginBlock: '$1'
            }}
          >
            <Chip small auto css={{ $$color: values.color }}>
              {values.name || 'Class'}
            </Chip>
          </Box>

          <List.Box>
            <List.Item>
              <Label htmlFor="class-name">Name</Label>

              <Input>
                <Field
                  required
                  autoFocus
                  id="class-name"
                  name="name"
                  title={init.name}
                  as={Input.Field}
                />
              </Input>
            </List.Item>

            <List.Item>
              <Label htmlFor="class-color">Color</Label>

              <Input square>
                <Field
                  required
                  type="color"
                  id="class-color"
                  name="color"
                  title={init.color}
                  as={Input.Field}
                />
              </Input>

              <Input>
                <Field
                  required
                  id="color-hex"
                  name="color"
                  title={init.color}
                  as={Input.Field}
                />
              </Input>
            </List.Item>

            <List.Item css={{ $$firstWidth: 'auto', paddingTop: '$2' }}>
              <Button
                type="submit"
                css={{ flex: 1 }}
                disabled={!values.name || !values.color}
              >
                {operation} class
              </Button>
            </List.Item>
          </List.Box>
        </List>
      )}
    </Formik>
  )
}

export default memo(UpsertClass)
