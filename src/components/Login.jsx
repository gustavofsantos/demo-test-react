import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Login () {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('login')}</h1>
    </div>
  )
}
