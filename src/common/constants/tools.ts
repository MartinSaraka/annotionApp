export enum ETool {
  RECTANGLE = 'rect',
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
  POINT = 'point'
}

export enum EToolsType {
  ANNOTATION = 'ANNOTATION'
}

export const TOOLS = {
  [EToolsType.ANNOTATION]: {
    [ETool.RECTANGLE]: {
      type: EToolsType.ANNOTATION,
      value: ETool.RECTANGLE
    },
    [ETool.POLYGON]: {
      type: EToolsType.ANNOTATION,
      value: ETool.POLYGON
    },
    [ETool.FREEHAND]: {
      type: EToolsType.ANNOTATION,
      value: ETool.FREEHAND
    },
    [ETool.ELLIPSE]: {
      type: EToolsType.ANNOTATION,
      value: ETool.ELLIPSE
    },
    [ETool.CIRCLE]: {
      type: EToolsType.ANNOTATION,
      value: ETool.CIRCLE
    },
    [ETool.POINT]: {
      type: EToolsType.ANNOTATION,
      value: ETool.POINT
    }
  }
} as const
