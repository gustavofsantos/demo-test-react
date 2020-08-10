import React from 'react'
import { act, cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as fc from 'fast-check'
import LoginForm from './LoginForm'
import i18n from '../../config/i18n'
import LoginFormModel from './LoginFormModel'

describe('LoginForm', () => {
  let t

  beforeAll(async () => {
    t = await i18n
  })

  test.each([
    ['a@b.c', '1234567', { email: 'a@b.c', password: '1234567' }],
    ['aaaaa@b.c', '', undefined]
  ])(
    'Should call the onSubmit callback only when the email and password are valid',
    async (email, password, expected) => {
      const handleSubmit = jest.fn()
      render(<LoginForm onSubmit={handleSubmit} />)

      userEvent.type(screen.getByLabelText(t('email')), email)
      userEvent.type(screen.getByLabelText(t('password')), password)
      userEvent.click(screen.getByText(t('login_action')))

      if (!!email && !!password) {
        await waitFor(() => expect(handleSubmit).toBeCalled())
        expect(handleSubmit).toBeCalledWith(expected)
      } else {
        await waitFor(() => expect(handleSubmit).not.toBeCalled())
      }
    }
  )

  test(
    'Should call the onSubmit callback when email and password are valid',
    () =>
      fc.assert(
        fc
          .asyncProperty(
            fc.scheduler({ act }),
            fc.emailAddress(),
            fc.string(),
            async (s, email, password) => {
              const handleSubmit = jest.fn()
              const { getByLabelText, getByText } = render(
                <LoginForm onSubmit={handleSubmit} />
              )

              s.scheduleSequence([
                () => userEvent.type(getByLabelText(t('email')), email),
                () => userEvent.type(getByLabelText(t('password')), password),
                async () => userEvent.click(getByText(t('login_action')))
              ])

              await s.waitAll()

              if (LoginFormModel.login(email, password)) {
                expect(handleSubmit).toBeCalledWith({
                  email,
                  password
                })
              } else {
                expect(handleSubmit).not.toBeCalled()
              }
            }
          )
          .beforeEach(async () => {
            await cleanup()
          })
      ),
    15000
  )
})
