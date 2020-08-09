import { rest } from 'msw'
import AuthService from '../../services/AuthService'

import responseSuccess from '../fixtures/login-success.json'
import responseError from '../fixtures/login-error.json'
import user from '../fixtures/stored-user.json'

const createLoginHandler = () =>
  rest.post(AuthService.routes.login, (req, res, ctx) => {
    if (req.body.email === user.email && req.body.password === user.password) {
      return res(ctx.status(200), ctx.json(responseSuccess))
    } else {
      return res(ctx.status(403), ctx.json(responseError))
    }
  })

export default createLoginHandler
