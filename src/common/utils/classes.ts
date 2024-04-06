import type { Class } from '@common/types/datamodel'

export const isDefaultClass = (item?: Class) => {
  return !!item?.Default?.id
}

export const getDefaultClass = (item?: Class) => {
  return item?.Default || null
}
