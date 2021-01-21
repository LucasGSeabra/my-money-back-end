import express from 'express'
import auth from './auth.js'
import billingCycleService from '../api/billingCycle/billingCycleService.js'
import { login, signUp, validateToken} from '../api/user/userService.js'

function routes(server) {
    const protectedApi = express.Router()
    server.use('/api', protectedApi)
    protectedApi.use(auth)
    billingCycleService.register(protectedApi, '/billingCycles')

    const openApi = express.Router()
    server.use('/oapi', openApi)
    openApi.post('/login', login)
    openApi.post('/signUp', signUp)
    openApi.post('/validateToken', validateToken)
}

export default routes