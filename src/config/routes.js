import express from 'express'
import auth from './auth.js'
import billingCycleService from '../api/billingCycle/billingCycleService.js'
import billingCycle from '../api/billingCycle/billingCycleService.js'

function routes(server) {
    const protectedApi = express.Router()
    server.use('/api', protectedApi)
    protectedApi.use(auth)
    billingCycleService.register(protectedApi, '/billingCycles')

}

export default routes