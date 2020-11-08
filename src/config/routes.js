import express from 'express'
import billingCycle from '../api/billingCycle/billingCycleService.js'

function routes(server) {
    const router = express.Router()
    server.use('/api', router)

    billingCycle.register(router,'/billingCycles')

}

export default routes