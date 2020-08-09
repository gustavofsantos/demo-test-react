import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Login from './Login'
import i18n from '../config/i18n'

describe('Login', () => {
  test('Should render the component', async () => {
    render(<Login />)

    const t = await i18n

    await waitFor(() => expect(screen.getByText(t('login'))).toBeInTheDocument())
  })
})
