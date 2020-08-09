import { setupServer } from 'msw/node'
import createLoginHandler from './handlers/login-handler'

const createServer = () => setupServer(createLoginHandler())

export default createServer
