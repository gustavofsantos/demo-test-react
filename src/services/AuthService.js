import axios from 'axios'

const AuthService = {
  routes: {
    login: '/auth/login'
  },

  login({ email, password }) {
    return axios.post(this.routes.login, { email, password })
  }
}

export default AuthService
