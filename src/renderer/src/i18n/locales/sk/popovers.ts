export default {
  upsertClass: {
    title_zero: 'Vytvoriť novú triedu',
    title_one: 'Aktualizovať triedu',
    chip: 'Zadajte názov triedy',
    fields: {
      name: {
        label: 'Názov'
      },
      color: {
        label: 'Farba'
      }
    },
    submit_zero: 'Vytvoriť triedu',
    submit_one: 'Aktualizovať triedu'
  },

  settings: {
    actions: {
      reset: 'Obnoviť na predvolené hodnoty'
    },
    layout: {
      title: 'Rozloženie',
      preview: 'obrázok',
      reset: 'Obnoviť nastavenia rozloženia',
      sections: {
        panels: 'Panely',
        viewer: 'Prehliadač'
      },
      fields: {
        language: {
          label: 'Jazyk'
        },
        leftBarVisible: {
          label: 'Zobraziť ľavý panel'
        },
        rightBarVisible: {
          label: 'Zobraziť pravý panel'
        },
        minimapVisible: {
          label: 'Zobraziť minimapu'
        }
      }
    },
    annotation: {
      title: 'Anotácia',
      preview: 'anotácia',
      reset: 'Obnoviť nastavenia anotácie',
      sections: {
        class: 'Trieda'
      },
      fields: {
        annotationsVisible: {
          label: 'Zobraziť anotácie'
        },
        classVisible: {
          label: 'Zobraziť triedu anotácie'
        }
      }
    }
  }
} as const
