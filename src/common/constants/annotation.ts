import * as RadixIcons from '@radix-ui/react-icons'

import { TAnnotationBody } from '@common/types/annotation'

export const DEFAULT_ANNOTATION_BODY_ITEM: TAnnotationBody = {
  type: 'TextualBody',
  purpose: undefined,
  value: ''
}

export const ANNOTATION_EDITABILITY_ICON_MAP: Record<
  'editable' | 'locked',
  keyof typeof RadixIcons
> = {
  editable: 'LockOpen1Icon',
  locked: 'LockClosedIcon'
}

export const ANNOTATION_VISIBILITY_ICON_MAP: Record<
  'visible' | 'hidden',
  keyof typeof RadixIcons
> = {
  visible: 'EyeOpenIcon',
  hidden: 'EyeClosedIcon'
}
