import { memo, useCallback, useMemo } from 'react'
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
import { UpsertClassPopover } from '@renderer/popovers'

import { TAnnotation, TAnnotationClass } from '@common/types/annotation'
import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { AnnotationHandler } from '@renderer/handlers'

type TSelectClassProps = {
  selectedClass: TAnnotationClass | null
  onClose?: () => void
}

type TFormValues = {
  annotation: TAnnotation | null
  classId: TAnnotationClass['id']
}

const SelectClass = ({ selectedClass, onClose }: TSelectClassProps) => {
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

      const data = AnnotationHandler.upsertBody(
        values.annotation,
        'TextualBody',
        'tagging',
        values.classId
      )

      update(data).then(onClose).catch(console.error)
    },
    [onClose, update]
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
      {({ initialValues: init, values, setFieldValue, handleSubmit }) => (
        <Popover.Root>
          <Popover.Anchor>
            <List
              as={Form}
              title="Class list"
              actions={
                <Box css={{ flexDirection: 'row', gap: '$4' }}>
                  <Popover.Trigger asChild>
                    <Button ghost condensed css={{ margin: '-$1' }}>
                      <Icon name="PlusIcon" width={16} height={16} />
                    </Button>
                  </Popover.Trigger>

                  <Button
                    ghost
                    condensed
                    css={{ margin: '-$1' }}
                    onClick={onClose}
                  >
                    <Icon name="Cross2Icon" width={16} height={16} />
                  </Button>
                </Box>
              }
            >
              {classes?.length ? (
                <>
                  <Box css={{ marginTop: '$1' }}>
                    <Input size="small" role="searchbox">
                      <Input.Element>
                        <Button input>
                          <Icon
                            name="MagnifyingGlassIcon"
                            width={14}
                            height={14}
                          />
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
                    orientation="vertical"
                    css={{ $$maxHeight: '200px' }}
                  >
                    <RadioGroup.Root
                      asChild
                      name="classId"
                      defaultValue={init.classId}
                      value={values.classId}
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
                </>
              ) : (
                <List.Box css={{ marginTop: '$1' }}>
                  <Popover.Trigger asChild>
                    <Button slim outlined css={{ marginBlock: '-$1' }}>
                      <Icon name="PlusIcon" width={12} height={12} />
                      Create first class
                    </Button>
                  </Popover.Trigger>
                </List.Box>
              )}
            </List>
          </Popover.Anchor>

          <Popover.Content alignOffset={-1}>
            <UpsertClassPopover
              onCreate={(value) => {
                setFieldValue('classId', value.id)
                handleSubmit()
              }}
            />
          </Popover.Content>
        </Popover.Root>
      )}
    </Formik>
  )
}

export default memo(SelectClass)
