import { ETool } from '@common/constants/tools'
import { TAnnotation, TAnnotationSelector } from '@common/types/annotation'

type TPixel = {
  width: number
  height: number
}

class MeasurementUtils {
  private constructor() {
    throw new Error('This class cannot be instantiated')
  }

  static from = (
    annotation: TAnnotation,
    pixel: TPixel = { width: 1, height: 1 }
  ) => {
    const value = annotation.target.selector.value

    const numbers = MeasurementUtils.getNumbers(value)
    const type = MeasurementUtils.getType(value)

    return {
      get position(): { x: number; y: number } {
        return MeasurementUtils.calculatePosition(numbers, pixel)
      },
      get area(): number {
        return MeasurementUtils.calculateArea(type, numbers, pixel)
      },
      get perimeter(): number {
        return MeasurementUtils.calculatePerimeter(type, numbers, pixel)
      },
      get centroid(): { x: number; y: number } {
        return MeasurementUtils.calculateCentroid(type, numbers, pixel)
      }
    }
  }

  // Calculate methods

  private static calculatePosition = (
    numbers: number[] | undefined,
    pixel: TPixel
  ): { x: number; y: number } => {
    const [x, y] = numbers || [0, 0]

    return {
      x: x * pixel.width,
      y: y * pixel.height
    }
  }

  private static calculateArea = (
    type: ETool | undefined,
    numbers: number[] | undefined,
    pixel: TPixel
  ): number => {
    switch (type) {
      case ETool.RECTANGLE: // ETool.POINT
        return MeasurementUtils.calculateRectangleArea(numbers, pixel)
      case ETool.CIRCLE:
        return MeasurementUtils.calculateCircleArea(numbers, pixel)
      case ETool.ELLIPSE:
        return MeasurementUtils.calculateEllipseArea(numbers, pixel)
      case ETool.POLYGON:
        return MeasurementUtils.calculatePolygonArea(numbers, pixel)
      case ETool.FREEHAND:
        return MeasurementUtils.calculatePolygonArea(numbers, pixel)
    }

    return 0
  }

  private static calculatePerimeter = (
    type: ETool | undefined,
    numbers: number[] | undefined,
    pixel: TPixel
  ): number => {
    switch (type) {
      case ETool.RECTANGLE: // ETool.POINT
        return MeasurementUtils.calculateRectanglePerimeter(numbers, pixel)
      case ETool.CIRCLE:
        return MeasurementUtils.calculateCirclePerimeter(numbers, pixel)
      case ETool.ELLIPSE:
        return MeasurementUtils.calculateEllipsePerimeter(numbers, pixel)
      case ETool.POLYGON:
        return MeasurementUtils.calculatePolygonPerimeter(numbers, pixel)
      case ETool.FREEHAND:
        return MeasurementUtils.calculatePolygonPerimeter(numbers, pixel)
    }

    return 0
  }

  private static calculateCentroid = (
    type: ETool | undefined,
    numbers: number[] | undefined,
    pixel: TPixel
  ): { x: number; y: number } => {
    switch (type) {
      case ETool.RECTANGLE: // ETool.POINT
        return MeasurementUtils.calculateRectangleCentroid(numbers, pixel)
      case ETool.CIRCLE:
        return MeasurementUtils.calculateCircleCentroid(numbers, pixel)
      case ETool.ELLIPSE:
        return MeasurementUtils.calculateEllipseCentroid(numbers, pixel)
      case ETool.POLYGON:
        return MeasurementUtils.calculatePolygonCentroid(numbers, pixel)
      case ETool.FREEHAND:
        return MeasurementUtils.calculatePolygonCentroid(numbers, pixel)
    }

    return { x: 0, y: 0 }
  }

  // HELPER METHODS

  private static getNumbers = (value: TAnnotationSelector['value']) =>
    value.match(/(\d*\.?\d+)/g)?.map(Number)

  private static getType = (value: TAnnotationSelector['value']) => {
    if (value.includes('xywh')) return ETool.RECTANGLE
    if (value.includes('circle')) return ETool.CIRCLE
    if (value.includes('ellipse')) return ETool.ELLIPSE
    if (value.includes('polygon')) return ETool.POLYGON
    if (value.includes('path')) return ETool.FREEHAND
    return undefined
  }

  private static euclideanDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  }

  // Area calculations

  private static calculateRectangleArea = (
    numbers: number[] = [0, 0, 0, 0],
    pixel: TPixel
  ) => {
    const [, , w, h] = numbers
    return w * pixel.width * h * pixel.height
  }

  private static calculateCircleArea = (
    numbers: number[] = [0, 0, 0],
    pixel: TPixel
  ) => {
    const [, , r] = numbers
    return Math.PI * r * pixel.width * r * pixel.height
  }

  private static calculateEllipseArea = (
    numbers: number[] = [0, 0, 0, 0],
    pixel: TPixel
  ) => {
    const [, , rx, ry] = numbers
    return Math.PI * rx * pixel.width * ry * pixel.height
  }

  private static calculatePolygonArea = (
    numbers: number[] = [0, 0],
    pixel: TPixel
  ) => {
    const points = numbers

    let total = 0

    for (let i = 0; i < points.length; i += 2) {
      const [x1, y1] = [
        // POINT A
        points[i] * pixel.width,
        points[i + 1] * pixel.height
      ]

      const [x2, y2] = [
        // POINT B
        (points[i + 2] || points[0]) * pixel.width,
        (points[i + 3] || points[1]) * pixel.height
      ]

      total += x1 * y2 - y1 * x2
    }

    return Math.abs(total / 2)
  }

  // Perimeter calculations

  private static calculateRectanglePerimeter = (
    numbers: number[] = [0, 0, 0, 0],
    pixel: TPixel
  ) => {
    const [, , w, h] = numbers
    const width = w * pixel.width
    const height = h * pixel.height
    return (width + height) * 2
  }

  private static calculateCirclePerimeter = (
    numbers: number[] = [0, 0, 0],
    pixel: TPixel
  ) => {
    const [, , r] = numbers
    const rX = r * pixel.width
    const rY = r * pixel.height
    return Math.PI * (3 * (rX + rY) - Math.sqrt((3 * rX + rY) * (rX + 3 * rY)))
  }

  private static calculateEllipsePerimeter = (
    numbers: number[] = [0, 0, 0, 0],
    pixel: TPixel
  ) => {
    const [, , rx, ry] = numbers
    const rX = rx * pixel.width
    const rY = ry * pixel.height
    return Math.PI * (3 * (rX + rY) - Math.sqrt((3 * rX + rY) * (rX + 3 * rY)))
  }

  private static calculatePolygonPerimeter = (
    numbers: number[] = [0, 0],
    pixel: TPixel
  ) => {
    const points = numbers

    let total = 0

    for (let i = 0; i < points.length; i += 2) {
      const [x1, y1] = [
        // POINT A
        points[i] * pixel.width,
        points[i + 1] * pixel.height
      ]

      const [x2, y2] = [
        // POINT B
        (points[i + 2] || points[0]) * pixel.width,
        (points[i + 3] || points[1]) * pixel.height
      ]

      total += MeasurementUtils.euclideanDistance(x1, y1, x2, y2)
    }

    return total
  }

  // Centroid calculations

  private static calculateRectangleCentroid = (
    numbers: number[] = [0, 0, 0, 0],
    pixel: TPixel
  ) => {
    const [x, y, w, h] = numbers

    const width = w * pixel.width
    const height = h * pixel.height
    const cX = x * pixel.width
    const cY = y * pixel.height

    return { x: cX + width / 2, y: cY + height / 2 }
  }

  private static calculateCircleCentroid = (
    numbers: number[] = [0, 0, 0],
    pixel: TPixel
  ) => {
    const [cx, cy] = numbers

    const cX = cx * pixel.width
    const cY = cy * pixel.height

    return { x: cX, y: cY }
  }

  private static calculateEllipseCentroid = (
    numbers: number[] = [0, 0, 0],
    pixel: TPixel
  ) => {
    const [cx, cy] = numbers

    const cX = cx * pixel.width
    const cY = cy * pixel.height

    return { x: cX, y: cY }
  }

  private static calculatePolygonCentroid = (
    numbers: number[] = [0, 0],
    pixel: TPixel
  ) => {
    const points = numbers

    let cX = 0
    let cY = 0

    for (let i = 0; i < points.length; i += 2) {
      const [x1, y1] = [
        // POINT A
        points[i] * pixel.width,
        points[i + 1] * pixel.height
      ]

      const [x2, y2] = [
        // POINT B
        (points[i + 2] || points[0]) * pixel.width,
        (points[i + 3] || points[1]) * pixel.height
      ]

      const crossProduct = x1 * y2 - x2 * y1

      cX += (x1 + x2) * crossProduct
      cY += (y1 + y2) * crossProduct
    }

    const area = MeasurementUtils.calculatePolygonArea(numbers, pixel)

    return { x: cX / (6 * area), y: cY / (6 * area) }
  }
}

export default MeasurementUtils
