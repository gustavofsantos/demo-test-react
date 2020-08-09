import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'
import i18n from '../../config/i18n'

describe('LoginForm', () => {
  let t

  beforeAll(async () => {
    t = await i18n
  })

  test('Should render the component', async () => {
    const handleSubmit = jest.fn()
    render(<LoginForm onSubmit={handleSubmit} />)
    await waitFor(() =>
      expect(screen.getByText(t('login_action'))).toBeInTheDocument()
    )
  })

  test('Should call the onSubmit callback when confirm', async () => {
    const handleSubmit = jest.fn()
    render(<LoginForm onSubmit={handleSubmit} />)

    userEvent.type(screen.getByLabelText(t('email')), 'user@email.com')
    userEvent.type(screen.getByLabelText(t('password')), '1234')
    userEvent.click(screen.getByText(t('login_action')))

    await waitFor(() => expect(handleSubmit).toBeCalledTimes(1))
    expect(handleSubmit).toBeCalledWith({
      email: 'user@email.com',
      password: '1234'
    })
  })

  test('Should call the onSubmit callback only when the email and password is filled', async () => {
    const handleSubmit = jest.fn()
    render(<LoginForm onSubmit={handleSubmit} />)

    userEvent.click(screen.getByText(t('login_action')))
    await waitFor(() => expect(handleSubmit).not.toBeCalled())

    userEvent.type(screen.getByLabelText(t('email')), 'abc@email.com')
    userEvent.click(screen.getByText(t('login_action')))
    await waitFor(() =>
      expect(screen.getByText(t('password_required'))).toBeInTheDocument()
    )
    expect(handleSubmit).not.toBeCalled()

    // clean up
    userEvent.clear(screen.getByLabelText(t('email')))

    userEvent.type(screen.getByLabelText(t('email')), 'abc@email.com')
    userEvent.type(screen.getByLabelText(t('password')), 'some_password')
    userEvent.click(screen.getByText(t('login_action')))

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0))

    expect(handleSubmit).toBeCalledTimes(1)
    expect(handleSubmit).toBeCalledWith({
      email: 'abc@email.com',
      password: 'some_password'
    })
  })
})
