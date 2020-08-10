import 'regenerator-runtime/runtime'
import createServer from './src/mocks/server'

const server = createServer()

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
