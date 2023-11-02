import { TAnnotation } from '@common/types/annotation'
import { AnnotationUtils } from '@common/utils'
import { OSDAdapter } from '@renderer/adapters'
import { ImageService } from '@renderer/services'
import { useImageStore } from '@renderer/store'

class NuClickHandler {
  private constructor() {
    throw new Error('`NuClickHandler` should not be instantiated')
  }

  static handle = async (annotation: TAnnotation) => {
    const imageData = useImageStore.getState().getData()

    if (!imageData) throw new Error('Image data is not available')

    const { props } = AnnotationUtils.from(annotation).shape

    const x = +(+props['cx']).toFixed(0)
    const y = +(+props['cy']).toFixed(0)

    const path = OSDAdapter.fromInfoToCroppedSource(imageData, x, y, 128, 128)

    const croppedImage = await ImageService.getCroppedImage(path)

    if (!croppedImage) throw new Error('Cropped image is not available')

    const result = await fetch('http://localhost:8000/models/nuclick/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: croppedImage.base64Image,
        keypoints: [
          {
            x: x - croppedImage.x,
            y: y - croppedImage.y
          }
        ],
        offset: {
          x: croppedImage.x,
          y: croppedImage.y
        }
      })
    })

    const data = await result.json()

    const points = data['segmented_nuclei']?.[0] as
      | { x: number; y: number }[]
      | undefined

    if (!points) return null

    const newAnnotation = AnnotationUtils.createAnnotation(points)

    return newAnnotation
  }
}

export default NuClickHandler
