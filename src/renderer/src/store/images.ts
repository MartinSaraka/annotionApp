import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { parse } from 'path'
import { omit } from 'lodash'
import { v4 as uuid } from 'uuid'

import { ImageService } from '@renderer/services'

import { TImageInfo } from '@common/types/image'
import { TAnnotation } from '@common/types/annotation'
import { TTool } from '@common/types/tool'

import { ETool, EToolsType, TOOLS } from '@common/constants/tools'
import { IMAGES_STORAGE_NAME } from '@common/constants/storage'

export type TOpenedImageState = {
  image: TImageInfo
  activeTool: TTool | null
  annotations: Record<TID, TAnnotation>
}

export type TImageState = {
  selected: TPath | string | null
  opened: Record<TPath, TOpenedImageState>

  open: (path: TPath, replace?: boolean) => Promise<TImageInfo | undefined>
  select: (path: TPath | string) => void
  close: (path: TPath | string) => void

  getData: (path: TPath | string) => TImageInfo | undefined

  // Tools

  /**
   * Get active tool of selected image
   * @returns active tool
   */
  activeTool: () => TTool | null
  /**
   * Toggle active tool of selected image
   * @param type - type of the tool
   * @param tool - tool to toggle
   * @returns updated active tool
   */
  toggleActiveTool: (type: EToolsType, tool: ETool) => TTool | null

  // Tabs
  tabs: (TPath | string)[]

  /**
   * Update tabs containing ids of opened images and empty tabs
   * @param tabs - list of tabs to set
   * @returns updated tabs
   */
  setTabs: (tabs: (TPath | string)[]) => (TPath | string)[]
  /**
   * Add empty tab to the list of tabs
   * @returns id of the added empty tab
   */
  addEmptyTab: () => TPath | string

  // Annotations

  /**
   * Add annotation to the selected image
   * @param annotation - annotation to add to the selected image
   * @returns current annotations of the selected image
   */
  saveAnnotation: (annotation: TAnnotation) => Record<TID, TAnnotation> | null
  /**
   * Remove annotation from the selected image
   * @param id - id of the annotation to remove
   * @returns removed annotation
   */
  removeAnnotation: (id: TID) => TAnnotation | null
  /**
   * Get annotations of the selected image
   * @returns annotations of the selected image
   */
  getAnnotations: () => Record<TID, TAnnotation> | null
}

const useImageStore = create<TImageState>()(
  persist(
    (set, get) => ({
      selected: null,
      opened: {},
      tabs: [],

      open: async (path, replace = true) => {
        if (path in get().opened) {
          set({ selected: path })
          return get().opened[path].image
        }

        const metadata = await ImageService.getMetadata(path)

        if (!metadata) return undefined

        const parsedPath = parse(metadata.path)

        const info: TImageInfo = {
          path: metadata.path,
          directory: parsedPath.dir,
          filename: parsedPath.name,
          extension: parsedPath.ext,
          format: metadata.format,
          width: metadata.width,
          height: metadata.height,
          levels: metadata.levels,
          tileWidth: metadata.tileWidth,
          tileHeight: metadata.tileHeight,
          pixelsPerMeter: metadata.pixelsPerMeter
        }

        const selected = get().selected
        const tabs = get().tabs

        if (replace && selected && tabs.includes(selected)) {
          const selectedIdx = tabs.indexOf(selected)

          if (selectedIdx !== -1) {
            tabs[selectedIdx] = info.path
            set({ tabs })
          }
        } else {
          set({ tabs: [...tabs, info.path] })
        }

        console.log('info', tabs)

        set({
          selected: info.path,
          opened: {
            ...get().opened,
            [info.path]: {
              image: info,
              activeTool: null,
              annotations: {}
            }
          }
        })

        return get().opened[info.path].image
      },

      close: (path) => {
        const opened = get().opened
        const selected = get().selected
        const tabs = get().tabs

        if (path in opened) {
          const restOpened = omit(opened, path)
          set({ opened: restOpened })
        }

        if (path === selected) {
          const idx = tabs.indexOf(selected)

          if (idx !== -1 && idx) {
            const prev = tabs[idx - 1]
            set({ selected: prev })
          } else {
            const first = get().tabs[0]
            set({ selected: first })
          }
        }

        if (tabs.includes(path)) {
          const restTabs = tabs.filter((tab) => tab !== path)
          set({ tabs: restTabs })
        }
      },

      select: (path) => {
        const opened = get().opened
        const tabs = get().tabs

        if (path in opened) {
          set({ selected: path })
          return opened[path].image
        }

        if (tabs.includes(path)) {
          set({ selected: path })
          return undefined
        }

        return undefined
      },

      getData: (path) => {
        const opened = get().opened

        if (path in opened) {
          return opened[path].image
        }

        return undefined
      },

      // Tools

      activeTool: () => {
        const opened = get().opened
        const selected = get().selected

        if (!selected) return null

        if (selected in opened) {
          return opened[selected].activeTool
        }

        return null
      },

      toggleActiveTool: (type, tool) => {
        const opened = get().opened
        const selected = get().selected

        if (!selected) return null

        const activeTool = TOOLS?.[type]?.[tool]

        const info = opened[selected]

        set({
          opened: {
            ...opened,
            [selected]: {
              ...info,
              activeTool
            }
          }
        })

        return opened[selected].activeTool
      },

      // Tabs

      setTabs: (tabs) => {
        set({ tabs })

        return get().tabs
      },

      addEmptyTab: () => {
        const tabs = get().tabs

        const newID = uuid()

        set({
          selected: newID,
          tabs: [...tabs, newID]
        })

        return newID
      },

      // Annotations

      saveAnnotation: (annotation) => {
        const opened = get().opened
        const selected = get().selected

        if (!selected || !(selected in opened)) {
          return null
        }

        const info = opened[selected]

        set({
          opened: {
            ...opened,
            [selected]: {
              ...info,
              annotations: {
                ...info.annotations,
                [annotation.id]: annotation
              }
            }
          }
        })

        return opened[selected].annotations
      },

      removeAnnotation: (id) => {
        const opened = get().opened
        const selected = get().selected

        if (!selected || !(selected in opened)) {
          return null
        }

        const info = opened[selected]

        if (!(id in info.annotations)) {
          return null
        }

        const annotation = info.annotations[id]
        const annotations = omit(info.annotations, id)

        set({
          opened: {
            ...opened,
            [selected]: {
              ...info,
              annotations
            }
          }
        })

        return annotation
      },

      getAnnotations: () => {
        const opened = get().opened
        const selected = get().selected

        if (!selected || !(selected in opened)) {
          return null
        }

        return opened[selected].annotations
      }
    }),
    {
      name: IMAGES_STORAGE_NAME
    }
  )
)

export default useImageStore
