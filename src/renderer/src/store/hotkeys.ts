import { create } from 'zustand'

export type THotkeysState = {
  callbacks: Record<string, (event: KeyboardEvent) => void>

  addShortcut: (
    keys: readonly string[],
    callback: (event: KeyboardEvent) => void
  ) => void

  removeShortcut: (keys: readonly string[]) => void

  destroy: () => void
}

const useHotkeysStore = create<THotkeysState>()((set) => {
  const callbacks: THotkeysState['callbacks'] = {}

  const handleKeyPress = (event: KeyboardEvent) => {
    const activeElement = document.activeElement

    if (
      activeElement instanceof HTMLInputElement ||
      activeElement instanceof HTMLTextAreaElement
    ) {
      if (event.key === 'Escape') activeElement.blur()
      return
    }

    const { key, metaKey, ctrlKey, altKey, shiftKey } = event

    const shortcut = [
      metaKey && 'meta',
      ctrlKey && 'ctrl',
      altKey && 'alt',
      shiftKey && 'shift',
      key
    ]
      .filter(Boolean)
      .join('+')
      .toLowerCase()

    const callback = callbacks[shortcut]
    if (callback) callback(event)
  }

  let isListenerAttached = false

  const addShortcut: THotkeysState['addShortcut'] = (keys, callback) => {
    callbacks[keys.join('+').toLowerCase()] = callback

    if (!isListenerAttached) {
      window.addEventListener('keydown', handleKeyPress)
      isListenerAttached = true
    }

    set({ callbacks })
  }

  const removeShortcut: THotkeysState['removeShortcut'] = (shortcut) => {
    delete callbacks[shortcut.join('+').toLowerCase()]

    set({ callbacks })

    if (isListenerAttached && !Object.keys(callbacks).length) {
      window.removeEventListener('keydown', handleKeyPress)
      isListenerAttached = false
    }
  }

  const destroy: THotkeysState['destroy'] = () => {
    if (!isListenerAttached) return

    window.removeEventListener('keydown', handleKeyPress)
    isListenerAttached = false
  }

  return { callbacks, addShortcut, removeShortcut, destroy }
})

export default useHotkeysStore
