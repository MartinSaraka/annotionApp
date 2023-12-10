import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { useOpenSeadragonStore } from '@renderer/store'

import { setGlobalCssVariable } from '@common/utils/global'
import { SETTINGS_STORAGE_NAME } from '@common/constants/storage'

import {
  DEFAULT_LEFT_SIDEBAR_VISIBILITY,
  DEFAULT_RIGHT_SIDEBAR_VISIBILITY,
  DEFAULT_MINIMAP_VISIBILITY,
  DEFAULT_ANNOTATIONS_VISIBILITY,
  DEFAULT_ANNOTATION_CLASS_VISIBILITY
} from '@common/constants/settings'

import { theme } from '@renderer/styles'

export type TSettingsState = {
  pageColor: string
  visibleLeftSidebar: boolean
  visibleRightSidebar: boolean
  visibleMinimap: boolean
  visibleAnnotations: boolean
  visibleAnnotationClass: boolean

  getLayoutSettings: () => Pick<
    TSettingsState,
    'visibleLeftSidebar' | 'visibleRightSidebar' | 'visibleMinimap'
  >
  getAnnotationSettings: () => Pick<
    TSettingsState,
    'visibleAnnotations' | 'visibleAnnotationClass'
  >

  setPageColor: (color: string) => void
  resetPageColor: () => void

  setLeftSidebarVisibility: (value: boolean) => void
  setRightSidebarVisibility: (value: boolean) => void
  setMinimapVisibility: (value: boolean) => void

  setAnnotationsVisibility: (value: boolean) => void
  setAnnotationClassVisibility: (value: boolean) => void
}

export const DEFAULT_PAGE_COLOR = theme.palette.dark2.value

const useSettingsStore = create<TSettingsState>()(
  persist(
    (set, get) => ({
      pageColor: DEFAULT_PAGE_COLOR,

      visibleLeftSidebar: DEFAULT_LEFT_SIDEBAR_VISIBILITY,
      visibleRightSidebar: DEFAULT_RIGHT_SIDEBAR_VISIBILITY,

      visibleMinimap: DEFAULT_MINIMAP_VISIBILITY,

      visibleAnnotations: DEFAULT_ANNOTATIONS_VISIBILITY,
      visibleAnnotationClass: DEFAULT_ANNOTATION_CLASS_VISIBILITY,

      getLayoutSettings: () => {
        const { visibleLeftSidebar, visibleRightSidebar, visibleMinimap } =
          get()

        return {
          visibleLeftSidebar,
          visibleRightSidebar,
          visibleMinimap
        }
      },

      getAnnotationSettings: () => {
        const { visibleAnnotations, visibleAnnotationClass } = get()

        return {
          visibleAnnotations,
          visibleAnnotationClass
        }
      },

      setPageColor: (color) => {
        setGlobalCssVariable('--page-color', color)
        set({ pageColor: color })
      },

      resetPageColor: () => {
        setGlobalCssVariable('--page-color', DEFAULT_PAGE_COLOR)
        set({ pageColor: DEFAULT_PAGE_COLOR })
      },

      setLeftSidebarVisibility: (value) => {
        set({ visibleLeftSidebar: value })
      },

      setRightSidebarVisibility: (value) => {
        set({ visibleRightSidebar: value })
      },

      setMinimapVisibility: (value) => {
        const viewer = useOpenSeadragonStore.getState().osd
        if (!viewer) return
        viewer.navigator.element.style.display = value ? 'inline-block' : 'none'
        set({ visibleMinimap: value })
      },

      setAnnotationsVisibility: (value) => {
        set({ visibleAnnotations: value })
      },

      setAnnotationClassVisibility: (value) => {
        set({ visibleAnnotationClass: value })
      }
    }),
    {
      name: SETTINGS_STORAGE_NAME
    }
  )
)

export default useSettingsStore
