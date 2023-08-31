import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ERightbarTabs } from '@common/types/rightbar'

import { RIGHTBAR_STORAGE_NAME } from '@common/constants/storage'
import {
  RIGHTBAR_DEFAULT_OPENED,
  RIGHTBAR_DEFAULT_TAB
} from '@common/constants/rightbar'

export type TRightbarState = {
  opened: boolean
  toggleBarOpened: () => void

  activeTab: ERightbarTabs | null
  setActiveTab: (activeTab: ERightbarTabs | null) => void
}

const useRightbarStore = create<TRightbarState>()(
  persist(
    (set, get) => ({
      opened: RIGHTBAR_DEFAULT_OPENED,
      activeTab: RIGHTBAR_DEFAULT_TAB,

      toggleBarOpened: () => {
        const newOpened = !get().opened

        set({
          opened: newOpened,
          activeTab: newOpened ? RIGHTBAR_DEFAULT_TAB : null
        })
      },

      setActiveTab: (activeTab) => set({ activeTab, opened: true })
    }),
    {
      name: RIGHTBAR_STORAGE_NAME
    }
  )
)

export default useRightbarStore
