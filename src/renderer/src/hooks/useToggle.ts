import { useState, useCallback } from 'react'

type TUseToggle = {
  visible: boolean
  show: () => void
  hide: () => void
  toggle: () => void
  set: (value: boolean) => void
}

const useToggle = (initialValue = false): TUseToggle => {
  const [visible, setVisible] = useState<boolean>(initialValue)

  const show = useCallback(() => setVisible(true), [])

  const hide = useCallback(() => setVisible(false), [])

  const toggle = useCallback(() => setVisible((prev) => !prev), [])

  const set = useCallback((value: boolean) => setVisible(value), [])

  return { visible, show, hide, toggle, set }
}

export default useToggle
