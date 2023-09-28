import { useEffect } from 'react'

const useDidMount = (callback: React.EffectCallback) => {
  useEffect(callback, [])
}

export default useDidMount
