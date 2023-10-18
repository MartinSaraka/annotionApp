import { memo, useCallback, useMemo, useRef } from 'react'
import { Form, Formik, FormikConfig } from 'formik'

import {
  Box,
  Button,
  Chip,
  Icon,
  Input,
  List,
  Popover,
  RadioGroup,
  ScrollArea
} from '@renderer/ui'

import { TAnnotation, TAnnotationClass } from '@common/types/annotation'
import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { AnnotationService } from '@renderer/services'

type TSelectClassProps = {
  selectedClass: TAnnotationClass | null
}

type TFormValues = {
  annotation: TAnnotation | null
  classId: TAnnotationClass['id']
}

const SelectClass = ({ selectedClass }: TSelectClassProps) => {
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const classes = useImageStore((state) => state.getClasses())
  const update = useAnnotoriousStore((state) => state.saveAndUpdateAnnotation)
  const annotation = useImageStore((state) => state.getSelectedAnnotation())

  const initialValues: FormikConfig<TFormValues>['initialValues'] = useMemo(
    () => ({
      annotation,
      classId: selectedClass?.id || ''
    }),
    [selectedClass, annotation]
  )

  const onSubmit: FormikConfig<TFormValues>['onSubmit'] = useCallback(
    (values) => {
      if (!values.annotation) return

      const data = AnnotationService.annotation(values.annotation)
        .upsertBody({
          type: 'TextualBody',
          purpose: 'tagging',
          value: values.classId
        })
        .get()

      update(data)
        .then(() => closeRef.current?.click())
        .catch(console.error)
    },
    [closeRef, update]
  )

  const renderClasses = useCallback(
    (item: (typeof classes)[number]) => (
      <RadioGroup.Item asChild key={item.id} value={item.id}>
        <List.Item css={{ $$firstWidth: 'auto' }} hoverActive checkable>
          <Chip small auto css={{ $$color: item.color }}>
            {item.name}
          </Chip>
        </List.Item>
      </RadioGroup.Item>
    ),
    []
  )

  return (
    <Formik<TFormValues>
      enableReinitialize
      validateOnChange
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <List
          as={Form}
          title="Class list"
          actions={
            <Box css={{ flexDirection: 'row', gap: '$4' }}>
              <Button ghost condensed css={{ margin: '-$1' }}>
                <Icon name="PlusIcon" width={16} height={16} />
              </Button>

              <Popover.Close asChild ref={closeRef}>
                <Button ghost condensed css={{ margin: '-$1' }}>
                  <Icon name="Cross2Icon" width={16} height={16} />
                </Button>
              </Popover.Close>
            </Box>
          }
        >
          <Box css={{ marginTop: '$1' }}>
            <Input size="small" role="searchbox">
              <Input.Element>
                <Button input>
                  <Icon name="MagnifyingGlassIcon" width={14} height={14} />
                </Button>
              </Input.Element>

              <Input.Field role="search" placeholder="Search classes" />

              <Input.Element>
                <Button input>
                  <Icon name="Cross2Icon" width={12} height={12} />
                </Button>
              </Input.Element>
            </Input>
          </Box>

          <ScrollArea
            fade
            noOverflow
            orientation="vertical"
            css={{
              maxHeight: 200,
              minHeight: 0
            }}
          >
            <RadioGroup.Root
              asChild
              name="classId"
              defaultValue={values.classId}
              onValueChange={(value) => {
                setFieldValue('classId', value)
                handleSubmit()
              }}
            >
              <List.Box css={{ $$gap: 0, flex: 1 }}>
                {classes.map(renderClasses)}
              </List.Box>
            </RadioGroup.Root>
          </ScrollArea>
        </List>
      )}
    </Formik>
  )
}

export default memo(SelectClass)
