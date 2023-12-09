import { DateTime } from 'luxon'
import type {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  Point,
  Polygon,
  LineString
} from 'geojson'

import AnnotationHandler from '@renderer/handlers/AnnotationHandler'
import { AnnotationUtils } from '@common/utils'

import type { TOpenedImageState } from '@renderer/store/images'
import type { TAnnotation, TAnnotationClass } from '@common/types/annotation'
import type { TImageInfo } from '@common/types/image'

import { ETool } from '@common/constants/tools'

const ANNOTATION_TYPE_GEOJSON_TYPE_MAP = {
  [ETool.POINT]: 'Point',
  [ETool.RECTANGLE]: 'Rectangle',
  [ETool.CIRCLE]: 'Circle',
  [ETool.ELLIPSE]: 'Ellipse',
  [ETool.POLYGON]: 'Polygon',
  [ETool.FREEHAND]: 'Freehand'
} as const

type TTypeGeoJsonTypeMap = {
  [ETool.POINT]: Point
  [ETool.RECTANGLE]: Polygon
  [ETool.CIRCLE]: Point
  [ETool.ELLIPSE]: Point
  [ETool.POLYGON]: Polygon
  [ETool.FREEHAND]: LineString
}

type TExtraGlobal = {
  properties: {
    name: TImageInfo['filename']
    hash: TImageInfo['hash']
    format: TImageInfo['format']
    width: {
      value: TImageInfo['size']['width']['pixel']
      unit: 'pixel'
    }
    height: {
      value: TImageInfo['size']['height']['pixel']
      unit: 'pixel'
    }
    classes: TAnnotationClass[]
    createdAt: string
  }
}

export type TImportOptions = {
  // List of properties
}

export type TExportOptions = {
  withHidden: boolean
  // List of properties
}

class ImportExportHandler {
  private constructor() {
    throw new Error('`ImportExportHandler` should not be instantiated')
  }

  // TODO: Implement
  static import = (data: FeatureCollection & TExtraGlobal) => {
    console.log(data)
  }

  static export = (
    image: TOpenedImageState['image'],
    annotations: TAnnotation[],
    classes: TOpenedImageState['classes'],
    options: TExportOptions
  ) => {
    console.log(annotations, options)

    const featureCollection: FeatureCollection & TExtraGlobal = {
      type: 'FeatureCollection',
      features: [],
      properties: {
        name: image.filename,
        hash: image.hash,
        format: image.format,
        width: {
          value: image.size.width.pixel,
          unit: 'pixel'
        },
        height: {
          value: image.size.height.pixel,
          unit: 'pixel'
        },
        classes: Object.values(classes),
        createdAt: DateTime.now().toISO()
      }
    }

    for (const annotation of annotations) {
      const type = ImportExportHandler.#getType(annotation)
      if (!type) continue

      const geometry = ImportExportHandler.#getGeometry(annotation)
      if (!geometry) continue

      const properties = ImportExportHandler.#getProperties(annotation)
      if (!properties) continue

      const feature: Feature = {
        type: 'Feature',
        id: annotation.id,
        geometry,
        properties: { ...properties, type }
      }

      featureCollection.features.push(feature)
    }

    return featureCollection
  }

  static #getType = (annotation: TAnnotation): string => {
    return ANNOTATION_TYPE_GEOJSON_TYPE_MAP[
      AnnotationUtils.from(annotation).type
    ]
  }

  static #getProperties = (annotation: TAnnotation): GeoJsonProperties => {
    const type = AnnotationUtils.from(annotation).type
    const { props } = AnnotationUtils.from(annotation).shape

    const body = AnnotationHandler.getBody(annotation, [
      'naming',
      'describing',
      'parent',
      'tagging',
      'subtagging',
      'visibility',
      'editability'
    ])

    const properties: GeoJsonProperties = {
      name: body.naming || '',
      description: body.describing || '',
      parent: body.parent || '',
      class: body.tagging || '',
      subclass: body.subtagging || ''
    }

    if (type === ETool.CIRCLE) {
      properties['r'] = +props['r']
    }

    if (type === ETool.ELLIPSE) {
      properties['rx'] = +props['rx']
      properties['ry'] = +props['ry']
    }

    return properties
  }

  static #getGeometry = (annotation: TAnnotation): Geometry | null => {
    const type = AnnotationUtils.from(annotation).type
    const { props } = AnnotationUtils.from(annotation).shape

    switch (type) {
      case ETool.POINT: {
        const geometry: TTypeGeoJsonTypeMap[ETool.POINT] = {
          type: 'Point',
          coordinates: [+props['cx'], +props['cy']]
        }

        return geometry
      }
      case ETool.RECTANGLE: {
        const geometry: TTypeGeoJsonTypeMap[ETool.RECTANGLE] = {
          type: 'Polygon',
          coordinates: [
            [
              [+props['x'], +props['y']],
              [+props['x'] + +props['width'], +props['y']],
              [+props['x'] + +props['width'], +props['y'] + +props['height']],
              [+props['x'], +props['y'] + +props['height']],
              [+props['x'], +props['y']]
            ]
          ]
        }

        return geometry
      }
      case ETool.CIRCLE: {
        const geometry: TTypeGeoJsonTypeMap[ETool.CIRCLE] = {
          type: 'Point',
          coordinates: [+props['cx'], +props['cy']]
        }

        return geometry
      }
      case ETool.ELLIPSE: {
        const geometry: TTypeGeoJsonTypeMap[ETool.ELLIPSE] = {
          type: 'Point',
          coordinates: [+props['cx'], +props['cy']]
        }

        return geometry
      }
      case ETool.POLYGON: {
        const coordinates: [number, number][] = props['points']
          .split(' ')
          .map((point: string) => {
            const [x, y] = point.split(',')
            return [+x, +y]
          })

        coordinates.push(coordinates[0])

        const geometry: TTypeGeoJsonTypeMap[ETool.POLYGON] = {
          type: 'Polygon',
          coordinates: [coordinates]
        }

        return geometry
      }
      case ETool.FREEHAND: {
        const pathData = props['d'].match(/[\d.-]+/g)

        const coordinates: [number, number][] = []
        for (let i = 0; i < pathData.length; i += 2) {
          const longitude = parseFloat(pathData[i])
          const latitude = parseFloat(pathData[i + 1])
          coordinates.push([longitude, latitude])
        }

        const geometry: TTypeGeoJsonTypeMap[ETool.FREEHAND] = {
          type: 'LineString',
          coordinates
        }

        return geometry
      }
    }

    return null
  }

  // TODO: Implement
  static exportPreview = (
    annotations: TAnnotation[],
    options: TExportOptions
  ) => {
    console.log(annotations, options)
  }

  // TODO: Implement
  static importPreview = (
    data: FeatureCollection & TExtraGlobal,
    options: TImportOptions
  ) => {
    console.log(data, options)
  }
}

export default ImportExportHandler
