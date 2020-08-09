import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { func } from 'prop-types'

export default function LoginForm({ onSubmit }) {
  const { t } = useTranslation()
  const { register, handleSubmit, errors } = useForm()

  const submit = ({ email, password }) => onSubmit({ email, password })

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label htmlFor="login_email">{t('email')}</label>
      <input
        id="login_email"
        name="email"
        type="email"
        ref={register({ required: true })}
      />
      {errors.email && (
        <span className="form-error" role="alert">
          {t('email_required')}
        </span>
      )}

      <label htmlFor="login_password">{t('password')}</label>
      <input
        id="login_password"
        name="password"
        type="password"
        ref={register({
          required: true
        })}
      />
      {errors.password && (
        <span className="form-error" role="alert">
          {t('password_required')}
        </span>
      )}

      <button type="submit" data-testid="login_submit">
        {t('login_action')}
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: func.isRequired
}
