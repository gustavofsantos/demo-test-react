import React from 'react'
import { useTranslation } from 'react-i18next'
import LoginForm from './forms/LoginForm'

export default function Login () {
  const { t } = useTranslation()

  const handleSubmit = console.log

  return (
    <div>
      <h1>{t('login')}</h1>

      <LoginForm onSubmit={handleSubmit} />
    </div>
  )
}
