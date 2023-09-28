import { memo, useCallback } from 'react'
import { INodeRendererProps } from 'react-accessible-treeview'

import { Button, Icon, Shape, Text, TreeView } from '@renderer/ui'
import { preventAllDefaults } from '@common/utils/global'

type TBaseProps = {
  data: INodeRendererProps
}

type TAnnotationItemProps = TBaseProps

const AnnotationItem = ({ data }: TAnnotationItemProps) => {
  const tag = (data.element.metadata?.tag || 'path') as React.ElementType

  const handleLock = useCallback(
    preventAllDefaults(() => {
      console.log('handleLock')
    }),
    []
  )

  const handleVisibility = useCallback(
    preventAllDefaults(() => {
      console.log('handleVisibility')
    }),
    []
  )

  return (
    <TreeView.Node
      nodeProps={data}
      actions={
        <>
          <Button ghost condensed onClick={handleLock}>
            <Icon
              name="LockOpen1Icon"
              width={12}
              height={12}
              css={{ color: '$dark4' }}
            />
          </Button>

          <Button ghost condensed onClick={handleVisibility}>
            <Icon
              name="EyeOpenIcon"
              width={12}
              height={12}
              css={{ color: '$dark4' }}
            />
          </Button>
        </>
      }
    >
      <Shape tag={tag} props={data.element.metadata || {}} />
      <Text variant="md">{data.element.name}</Text>
    </TreeView.Node>
  )
}

export default memo(AnnotationItem) as typeof AnnotationItem
