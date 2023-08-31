import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Layout } from 'react-grid-layout'

import { LAYOUT_STORAGE_NAME } from '@common/constants/storage'
import {
  ERGLItem,
  GRID_LAYOUT_DEFAULT_LAYOUT,
  GRID_LAYOUT_DEFAULT_ITEMS_LAYOUT
} from '@common/constants/layout'

export type TLayoutState = {
  layout: Layout[]

  setLayout: (layout: Layout[]) => void
  resetLayoutItem: (name: ERGLItem) => Layout[] | undefined
  resetLayout: () => void
}

const useLayoutStore = create<TLayoutState>()(
  persist(
    (set, get) => ({
      layout: GRID_LAYOUT_DEFAULT_LAYOUT,

      setLayout: (layout) => set({ layout }),

      resetLayout: () => set({ layout: GRID_LAYOUT_DEFAULT_LAYOUT }),

      resetLayoutItem: (name) => {
        const layout = get().layout

        const index = layout.findIndex((item) => item.i === name)

        if (index === -1) return

        layout[index] = GRID_LAYOUT_DEFAULT_ITEMS_LAYOUT[name]

        set({ layout })

        return get().layout
      }
    }),
    {
      name: LAYOUT_STORAGE_NAME
    }
  )
)

export default useLayoutStore
