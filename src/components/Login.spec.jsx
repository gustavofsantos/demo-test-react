import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'
import i18n from '../config/i18n'
import user from '../mocks/fixtures/stored-user.json'

describe('Login', () => {
  let t

  beforeAll(async () => {
    t = await i18n
  })

  test('Should render the component', async () => {
    render(<Login />)
    await waitFor(() =>
      expect(screen.getByText(t('login'))).toBeInTheDocument()
    )
  })

  test('Should log in the user', async () => {
    render(<Login />)

    userEvent.type(screen.getByLabelText(t('email')), user.email)
    userEvent.type(screen.getByLabelText(t('password')), user.password)
    userEvent.click(screen.getByText(t('login_action')))

    await waitFor(() =>
      expect(screen.getByText(t('login_success'))).toBeInTheDocument()
    )
  })

  test('Should not log in the user that is not registered', async () => {
    render(<Login />)

    userEvent.type(screen.getByLabelText(t('email')), user.email)
    userEvent.type(screen.getByLabelText(t('password')), 'some other password')
    userEvent.click(screen.getByText(t('login_action')))

    await waitFor(() =>
      expect(screen.queryAllByText(t('user_not_found'))).toHaveLength(1)
    )
  })
})
