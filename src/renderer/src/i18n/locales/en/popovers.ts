export default {
  upsertClass: {
    title_zero: 'Create new class',
    title_one: 'Update class',
    chip: 'Type your class name',
    fields: {
      name: {
        label: 'Name'
      },
      color: {
        label: 'Color'
      }
    },
    submit_zero: 'Create class',
    submit_one: 'Update class'
  },

  settings: {
    actions: {
      reset: 'Reset to default'
    },
    layout: {
      title: 'Layout',
      preview: 'image',
      reset: 'Reset layout settings',
      sections: {
        panels: 'Panels',
        viewer: 'Viewer'
      },
      fields: {
        language: {
          label: 'Language'
        },
        leftBarVisible: {
          label: 'Show left panel'
        },
        rightBarVisible: {
          label: 'Show right panel'
        },
        minimapVisible: {
          label: 'Show minimap'
        }
      }
    },
    annotation: {
      title: 'Annotation',
      preview: 'annotation',
      reset: 'Reset annotation settings',
      sections: {
        class: 'Class'
      },
      fields: {
        annotationsVisible: {
          label: 'Show annotations'
        },
        classVisible: {
          label: 'Show annotation class'
        }
      }
    }
  }
} as const
