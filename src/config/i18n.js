import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enUS from '../locales/en-us.yaml'
import ptBR from '../locales/pt-br.yaml'

const resources = {
  enUS,
  ptBR
}

const i18nInstance = i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ptBR',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18nInstance
