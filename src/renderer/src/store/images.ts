import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { parse } from 'path'
import { omit } from 'lodash'
import { v4 as uuid } from 'uuid'

import { TImageInfo } from '@common/types/image'
import { TAnnotation, TAnnotationClass } from '@common/types/annotation'
import { TTool } from '@common/types/tool'

import { ETool, TOOLS } from '@common/constants/tools'
import { IMAGES_STORAGE_NAME } from '@common/constants/storage'
import {
  DEFAULT_ACTIVE_TOOL,
  DEFAULT_ANNOTATION_TOOL
} from '@common/constants/tools'

import { ImageService } from '@renderer/services'
import { AnnotationHandler } from '@renderer/handlers'

export type TOpenedImageState = {
  image: TImageInfo
  data: Partial<TImageInfo>
  activeTool: TTool
  annotationTool: TTool
  selectedAnnotation: TID | null
  annotations: Record<TID, TAnnotation>
  classes: Record<TAnnotationClass['id'], TAnnotationClass>
}

export type TImageState = {
  selected: TPath | string | null
  opened: Record<TPath, TOpenedImageState>

  open: (path: TPath, replace?: boolean) => Promise<TImageInfo | undefined>
  select: (path: TPath | string) => void
  close: (path: TPath | string) => void

  setData: (data: Partial<TImageInfo>) => TImageInfo | undefined
  getData: (path?: TPath | string) => TImageInfo | undefined

  // Tools

  /**
   * Get active tool of selected image
   * @returns active tool
   */
  activeTool: () => TTool
  annotationTool: () => TTool
  /**
   * Toggle active tool of selected image
   * @param tool - tool to toggle
   * @returns updated active tool
   */
  toggleActiveTool: (tool: ETool) => TTool
  toggleAnnotationTool: (tool: ETool) => TTool

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

  selectAnnotation: (id: TID) => TAnnotation | null
  deselectAnnotations: () => void
  getAnnotation: (id: TID) => TAnnotation | null
  getSelectedAnnotation: () => TAnnotation | null
  getSelectedAnnotationClass: () => TAnnotationClass | null

  getSelectedAnnotationParameters: () => {
    name?: string
    description?: string
  }

  /**
   * Add annotation to the selected image
   * @param annotation - annotation to add to the selected image
   * @returns current annotations of the selected image
   */
  saveAnnotation: (
    annotation: TAnnotation,
    select?: boolean
  ) => Record<TID, TAnnotation> | null
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

  // Classes
  getClasses: () => TAnnotationClass[]
  upsertClass: (data: TAnnotationClass) => TAnnotationClass | null
  deleteClass: (data: TAnnotationClass) => TAnnotationClass | null
}

const useImageStore = create<TImageState>()(
  persist(
    (set, get) => ({
      opened: {},
      selected: 'dashboard',
      tabs: ['dashboard'],

      open: async (path, replace = true) => {
        if (path in get().opened) {
          set({ selected: path })
          return get().opened[path].image
        }

        const metadata = await ImageService.getMetadata(path)

        if (!metadata) return undefined

        const parsedPath = parse(metadata.path)

        const info: TImageInfo = {
          directory: parsedPath.dir,
          filename: parsedPath.name,
          extension: parsedPath.ext,
          ...metadata
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

        set({
          selected: info.path,
          opened: {
            ...get().opened,
            [info.path]: {
              image: info,
              data: {},
              activeTool: DEFAULT_ACTIVE_TOOL,
              annotationTool: DEFAULT_ANNOTATION_TOOL,
              selectedAnnotation: null,
              annotations: {},
              classes: {}
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
        const selected = get().selected
        const tabs = get().tabs

        if (selected === 'empty') {
          const restTabs = tabs.filter((tab) => tab !== 'empty')
          set({ tabs: restTabs })
        }

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

      setData: (data) => {
        const opened = get().opened
        const selected = get().selected

        if (!selected || !(selected in opened)) {
          return undefined
        }

        const info = opened[selected]

        set({
          opened: {
            ...opened,
            [selected]: {
              ...info,
              data
            }
          }
        })

        return {
          ...opened[selected].image,
          ...opened[selected].data
        }
      },

      getData: (path) => {
        const opened = get().opened
        const current = get().selected

        if (!path && current) {
          return {
            ...opened[current]?.image,
            ...opened[current]?.data
          }
        }

        if (path && path in opened) {
          return {
            ...opened[path].image,
            ...opened[path].data
          }
        }

        return undefined
      },

      // Tools

      activeTool: () => {
        const opened = get().opened
        const selected = get().selected

        if (!selected) return DEFAULT_ACTIVE_TOOL

        if (selected in opened) {
          return opened[selected].activeTool
        }

        return DEFAULT_ACTIVE_TOOL
      },

      annotationTool: () => {
        const opened = get().opened
        const selected = get().selected

        if (!selected) return DEFAULT_ANNOTATION_TOOL

        if (selected in opened) {
          return opened[selected].annotationTool
        }

        return DEFAULT_ANNOTATION_TOOL
      },

      toggleActiveTool: (tool) => {
        const opened = get().opened
        const selected = get().selected

        if (!selected) return DEFAULT_ACTIVE_TOOL

        const activeTool = TOOLS?.[tool] || DEFAULT_ACTIVE_TOOL

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

      toggleAnnotationTool: (tool) => {
        const opened = get().opened
        const selected = get().selected

        if (!selected) return DEFAULT_ANNOTATION_TOOL

        const annotationTool = TOOLS?.[tool] || DEFAULT_ANNOTATION_TOOL

        const info = opened[selected]

        set({
          opened: {
            ...opened,
            [selected]: {
              ...info,
              activeTool: annotationTool,
              annotationTool
            }
          }
        })

        return opened[selected].annotationTool
      },

      // Tabs

      setTabs: (tabs) => {
        set({ tabs })

        return get().tabs
      },

      addEmptyTab: () => {
        const tabs = get().tabs

        if (tabs.includes('empty')) {
          return 'empty'
        }

        set({
          selected: 'empty',
          tabs: [...tabs, 'empty']
        })

        return 'empty'
      },

      // Annotations

      selectAnnotation: (id) => {
        const opened = get().opened
        const selected = get().selected

        if (!selected || !(selected in opened)) {
          return null
        }

        const info = opened[selected]

        if (!(id in info.annotations)) {
          return null
        }

        set({
          opened: {
            ...opened,
            [selected]: {
              ...info,
              selectedAnnotation: id
            }
          }
        })

        return get().opened[selected].annotations[id]
      },

      deselectAnnotations: () => {
        const opened = get().opened
        const selected = get().selected

        if (!selected || !(selected in opened)) {
          return
        }

        const info = opened[selected]

        set({
          opened: {
            ...opened,
            [selected]: {
              ...info,
              selectedAnnotation: null
            }
          }
        })
      },

      getAnnotation: (id) => {
        const opened = get().opened
        const selected = get().selected

        if (!selected || !(selected in opened)) {
          return null
        }

        const info = opened[selected]

        return info.annotations?.[id] || null
      },

      getSelectedAnnotation: () => {
        const opened = get().opened
        const selected = get().selected

        if (!selected || !(selected in opened)) {
          return null
        }

        const info = opened[selected]

        if (!info.selectedAnnotation) {
          return null
        }

        return info.annotations[info.selectedAnnotation] || null
      },

      getSelectedAnnotationClass: () => {
        const selectedAnnotation = get().getSelectedAnnotation()

        const selectedClassId = selectedAnnotation?.body.find(
          (item) => item.purpose === 'tagging'
        )?.value

        if (!selectedClassId) return null

        const opened = get().opened
        const selected = get().selected

        if (!selected || !(selected in opened)) {
          return null
        }

        const classes = opened[selected].classes

        return classes[selectedClassId] || null
      },

      getSelectedAnnotationParameters: () => {
        const selectedAnnotation = get().getSelectedAnnotation()

        return {
          name: selectedAnnotation?.body.find(
            (item) => item.purpose === 'naming'
          )?.value,
          description: selectedAnnotation?.body.find(
            (item) => item.purpose === 'describing'
          )?.value
        }
      },

      saveAnnotation: (annotation, select = true) => {
        const opened = get().opened
        const selected = get().selected

        if (!selected || !(selected in opened)) {
          return null
        }

        const info = opened[selected]
        const isExisting = annotation.id in info.annotations

        const newAnnotation = isExisting
          ? annotation
          : AnnotationHandler.formatDefault(
              annotation,
              Object.keys(info?.annotations).length + 1
            )

        set({
          opened: {
            ...opened,
            [selected]: {
              ...info,
              ...(select && {
                selectedAnnotation: newAnnotation.id
              }),
              annotations: {
                ...info.annotations,
                [newAnnotation.id]: newAnnotation
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
      },

      // Classes
      getClasses: () => {
        const opened = get().opened
        const selected = get().selected

        if (!selected || !(selected in opened)) {
          return []
        }

        return Object.values(opened[selected].classes)
      },

      upsertClass: (data) => {
        const opened = get().opened
        const selected = get().selected

        if (!selected || !(selected in opened)) {
          return null
        }

        const info = opened[selected]
        const id = !data.id ? uuid() : data.id

        set({
          opened: {
            ...opened,
            [selected]: {
              ...info,
              classes: {
                ...info.classes,
                [id]: {
                  ...data,
                  id
                }
              }
            }
          }
        })

        return get().opened[selected].classes[id]
      },

      deleteClass: (data) => {
        const opened = get().opened
        const selected = get().selected

        if (!selected || !(selected in opened)) {
          return null
        }

        const classes = opened[selected].classes

        set({
          opened: {
            ...opened,
            [selected]: {
              ...opened[selected],
              classes: omit(classes, data.id)
            }
          }
        })

        return data
      }
    }),
    {
      name: IMAGES_STORAGE_NAME
    }
  )
)

export default useImageStore
