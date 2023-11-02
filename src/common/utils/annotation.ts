import {
  ANNOTATION_EDITABILITY_ICON_MAP,
  ANNOTATION_VISIBILITY_ICON_MAP
} from '@common/constants/annotation'

export const isAnnotationEditable = (value = 'editable') => {
  return value === 'editable'
}

export const isAnnotationVisible = (value = 'visible') => {
  return value === 'visible'
}

export const getAnnotationEditabilityIcon = (value: string) => {
  return ANNOTATION_EDITABILITY_ICON_MAP[value || 'editable']
}

export const getAnnotationVisibilityIcon = (value: string) => {
  return ANNOTATION_VISIBILITY_ICON_MAP[value || 'visible']
}
