import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LoginForm from './forms/LoginForm'
import AuthService from '../services/AuthService'

export default function Login() {
  const { t } = useTranslation()
  const [logged, setLogged] = useState(false)
  const [loginError, setLoginError] = useState(undefined)

  const handleSubmit = async ({ email, password }) => {
    try {
      await AuthService.login({ email, password })
      setLogged(true)
    } catch (e) {
      setLoginError(t('user_not_found'))
    }
  }

  return (
    <div>
      <h1>{t('login')}</h1>

      {!logged && <LoginForm onSubmit={handleSubmit} />}
      {logged && <div>{t('login_success')}</div>}
      {!!loginError && <span role="alert">{loginError}</span>}
    </div>
  )
}
