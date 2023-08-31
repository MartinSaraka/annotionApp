import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { omit } from 'lodash'

import { TToast } from '@common/types/toast'
import { DEFAULT_TOAST_OPTIONS } from '@common/constants/toast'

export type TToastState = {
  toasts: Record<TID, TToast>
  show: (toast: Omit<TToast, 'id'>) => void
  hide: (id: TID) => void
  clear: () => void
}

const useToastStore = create<TToastState>()((set, get) => ({
  toasts: {},

  show: (options): void => {
    const toasts = get().toasts

    const toast: TToast = {
      id: uuid(),
      ...DEFAULT_TOAST_OPTIONS,
      ...options
    }

    set({
      toasts: {
        ...toasts,
        [toast.id]: toast
      }
    })

    if (toast.duration !== Infinity) {
      setTimeout(() => {
        const current = get().toasts
        set({ toasts: omit(current, toast.id) })
      }, toast.duration)
    }
  },

  hide: (id): void => {
    const toasts = get().toasts

    if (id in toasts) {
      set({ toasts: omit(toasts, id) })
    }
  },

  clear: (): void => set({ toasts: {} })
}))

export default useToastStore
