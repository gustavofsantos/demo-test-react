const LoginFormModel = {
  login(email, password) {
    if (
      typeof email === 'string' &&
      email.length > 3 &&
      typeof password === 'string' &&
      password.length >= 6
    ) {
      return true
    }

    return false
  }
}

export default LoginFormModel
