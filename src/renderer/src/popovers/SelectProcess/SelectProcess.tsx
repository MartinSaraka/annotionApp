import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Icon, List, ScrollArea } from '@renderer/ui'
import { ProcessItem } from '@renderer/components'

import { useImageStore, useProcessStore } from '@renderer/store'

import { ProcessType } from '@common/types/process'
import { PROCESS_ALLOWED_TYPES } from '@common/constants/processes'
import { AnnotationUtils } from '@common/utils'

type TSelectProcessProps = {
  onClose?: () => void
}

const processTypes = Object.keys(ProcessType) as (keyof typeof ProcessType)[]

const SelectProcess = ({ onClose }: TSelectProcessProps) => {
  const { t } = useTranslation(['process'])

  const addProcess = useProcessStore((state) => state.addProcess)
  const annotation = useImageStore((state) => state.getSelectedAnnotation())

  const processes = useMemo(() => {
    if (!annotation) return []

    const type = AnnotationUtils.from(annotation).type
    if (type === 'unknown') return []

    return processTypes.filter((processType) =>
      PROCESS_ALLOWED_TYPES[ProcessType[processType]].includes(type)
    )
  }, [annotation])

  const handleSelectProcess = useCallback(
    (process: ProcessType) => () => {
      if (!annotation) return
      const processId = addProcess(process, annotation.id)
      if (processId) onClose?.()
    },
    [annotation, addProcess, onClose]
  )

  const renderProcess = useCallback(
    (process: (typeof processes)[number]) => (
      <ProcessItem
        key={process}
        type={ProcessType[process]}
        title={t(`process:processes.${ProcessType[process]}.title`)}
        description={t(`process:processes.${ProcessType[process]}.description`)}
        onStart={handleSelectProcess(ProcessType[process])}
      />
    ),
    [t]
  )

  return (
    <List
      title="Process list"
      actions={
        <Button ghost condensed css={{ margin: '-$1' }} onClick={onClose}>
          <Icon name="Cross2Icon" width={16} height={16} />
        </Button>
      }
    >
      {processes.length ? (
        <ScrollArea fade orientation="vertical" css={{ $$maxHeight: '300px' }}>
          <List.Box css={{ flex: 1 }}>{processes.map(renderProcess)}</List.Box>
        </ScrollArea>
      ) : (
        <List.Box>No processes available</List.Box>
      )}
    </List>
  )
}

export default memo(SelectProcess)
