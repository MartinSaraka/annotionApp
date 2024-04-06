import { TTool } from '@common/types/tool'

export enum EAnnotationType {}

export enum ETool {
  /**
   * Openseadragon built-in
   */
  HAND = 'hand',
  /**
   * Openseadragon built-in
   */
  ZOOM_IN = 'zoom-in',
  /**
   * Openseadragon built-in
   */
  ZOOM_OUT = 'zoom-out',

  /**
   * Annotorious built-in
   */
  RECTANGLE = 'rect',
  /**
   * Annotorious built-in
   */
  POLYGON = 'polygon',
  /**
   * SelectorPack plugin
   */
  FREEHAND = 'freehand',
  /**
   * SelectorPack plugin
   */
  ELLIPSE = 'ellipse',
  /**
   * SelectorPack plugin
   */
  CIRCLE = 'circle',
  /**
   * SelectorPack plugin
   */
  POINT = 'point',
  /**
   * Custom plugin
   */
  NUCLICK_POINT = 'nuclick',
  /**
   * Custom plugin
   */
  SAM_FOREGROUND = 'sam-foreground',
  /**
   * Custom plugin
   */
  SAM_BACKGROUND = 'sam-background',
  /**
   * Custom plugin
   */
  SAM_BBOX = 'sam-bbox'
}

export enum EToolType {
  VIEWER = 'VIEWER',
  ANNOTATION = 'ANNOTATION',
  SEGMENTATION = 'SEGMENTATION'
}

export const TOOLS = {
  [ETool.HAND]: {
    type: EToolType.VIEWER,
    value: ETool.HAND
  },
  [ETool.ZOOM_IN]: {
    type: EToolType.VIEWER,
    value: ETool.ZOOM_IN
  },
  [ETool.ZOOM_OUT]: {
    type: EToolType.VIEWER,
    value: ETool.ZOOM_OUT
  },
  [ETool.RECTANGLE]: {
    type: EToolType.ANNOTATION,
    value: ETool.RECTANGLE
  },
  [ETool.POLYGON]: {
    type: EToolType.ANNOTATION,
    value: ETool.POLYGON
  },
  [ETool.FREEHAND]: {
    type: EToolType.ANNOTATION,
    value: ETool.FREEHAND
  },
  [ETool.ELLIPSE]: {
    type: EToolType.ANNOTATION,
    value: ETool.ELLIPSE
  },
  [ETool.CIRCLE]: {
    type: EToolType.ANNOTATION,
    value: ETool.CIRCLE
  },
  [ETool.POINT]: {
    type: EToolType.ANNOTATION,
    value: ETool.POINT
  },
  [ETool.NUCLICK_POINT]: {
    type: EToolType.ANNOTATION,
    value: ETool.NUCLICK_POINT
  },
  [ETool.SAM_FOREGROUND]: {
    type: EToolType.SEGMENTATION,
    value: ETool.SAM_FOREGROUND
  },
  [ETool.SAM_BACKGROUND]: {
    type: EToolType.SEGMENTATION,
    value: ETool.SAM_BACKGROUND
  },
  [ETool.SAM_BBOX]: {
    type: EToolType.SEGMENTATION,
    value: ETool.SAM_BBOX
  }
} as const

export const DEFAULT_ACTIVE_TOOL: TTool = TOOLS[ETool.HAND]
export const DEFAULT_ANNOTATION_TOOL: TTool = TOOLS[ETool.RECTANGLE]
export const DEFAULT_SEGMENTATION_TOOL: TTool = TOOLS[ETool.RECTANGLE]

export const TOOLS_MAP: Partial<Record<ETool, ETool>> = {
  [ETool.SAM_FOREGROUND]: ETool.POINT,
  [ETool.SAM_BACKGROUND]: ETool.POINT,
  [ETool.SAM_BBOX]: ETool.RECTANGLE
}

export const TOOL_ICON_MAP: Record<ETool, string> = {
  [ETool.POINT]: 'PointToolIcon', // 'DotFilledIcon',
  [ETool.NUCLICK_POINT]: 'NuclickToolIcon', // 'MagicWandIcon',
  [ETool.RECTANGLE]: 'RectToolIcon', // 'SquareIcon',
  [ETool.CIRCLE]: 'CircleToolIcon', // 'CircleIcon',
  [ETool.ELLIPSE]: 'EllipseToolIcon', // 'CircleBackslashIcon',
  [ETool.POLYGON]: 'PolygonToolIcon', // 'ComponentInstanceIcon',
  [ETool.FREEHAND]: 'FreehandToolIcon', // 'Pencil1Icon',
  [ETool.HAND]: 'HandIcon',
  [ETool.ZOOM_IN]: 'ZoomInIcon',
  [ETool.ZOOM_OUT]: 'ZoomOutIcon',
  [ETool.SAM_FOREGROUND]: 'PlusCircledIcon',
  [ETool.SAM_BACKGROUND]: 'MinusCircledIcon',
  [ETool.SAM_BBOX]: 'BoxIcon'
}
