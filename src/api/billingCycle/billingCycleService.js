import billingCycle from './billingCycle.js'

billingCycle.methods(['get', 'post', 'put', 'delete'])
billingCycle.updateOptions({ new: true, runValidators: true })

module.exports = billingCycle