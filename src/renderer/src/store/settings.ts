import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { theme } from '@renderer/styles'

import { setGlobalCssVariable } from '@common/utils/global'
import { SETTINGS_STORAGE_NAME } from '@common/constants/storage'

export type TSettingsState = {
  pageColor: string
  setPageColor: (color: string) => void
  resetPageColor: () => void
}

export const DEFAULT_PAGE_COLOR = theme.palette.dark2.value

const useSettingsStore = create<TSettingsState>()(
  persist(
    (set /*, get */) => ({
      pageColor: DEFAULT_PAGE_COLOR,

      setPageColor: (color) => {
        setGlobalCssVariable('--page-color', color)
        set({ pageColor: color })
      },

      resetPageColor: () => {
        setGlobalCssVariable('--page-color', DEFAULT_PAGE_COLOR)
        set({ pageColor: DEFAULT_PAGE_COLOR })
      }
    }),
    {
      name: SETTINGS_STORAGE_NAME
    }
  )
)

export default useSettingsStore
