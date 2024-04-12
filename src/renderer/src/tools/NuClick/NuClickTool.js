import Tool, { Selection } from '@recogito/annotorious/src/tools/Tool'
import { toFragment, isPoint } from './NuClick'

export default class NuClickTool extends Tool {
  constructor(g, config, env) {
    super(g, config, env)
  }

  startDrawing = (x, y, _, evt) => {
    // The top-most existing annotation at this position (if any)
    const annotation = evt.target.closest('.a9s-annotation')?.annotation
    console.log('fck off')
    // The point drawing tool will ALWAYS create a point annotation,
    // regardless of whether there's already an annotation underneath.
    // UNLESS the annotation underneath is itself a point!
    if (!annotation || !isPoint(annotation)) {
      const element = this.drawHandle(x, y)
      this.scaleHandle(element)

      this.g.appendChild(element)

      element.annotation = new Selection(
        toFragment(x, y, this.env.image, this.config.fragmentUnit),
        [
          {
            purpose: 'status',
            type: 'TextualBody',
            value: 'generating'
          }
        ]
      )

      this.emit('complete', element)
    } else {
      this.emit('cancel')
    }
  }

  stop = () => {
    // Nothing to do
  }

  attachListeners = () => {
    // Nothing to do
  }

  get isDrawing() {
    // Point selection is an instant action - the
    // tool is never an 'drawing' state
    return false
  }
}

NuClickTool.identifier = 'nuclick'

NuClickTool.supports = () => {
  // Not needed, since the target.renderedVia property will be evaluated first
  return false
}
