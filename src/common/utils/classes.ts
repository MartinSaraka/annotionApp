import { TAnnotationClass } from '@common/types/annotation'

import { DEFAULT_CLASSES } from '@common/constants/classes'

export const isDefaultClass = (item: TAnnotationClass) => {
  return !!DEFAULT_CLASSES?.[item.id]
}
