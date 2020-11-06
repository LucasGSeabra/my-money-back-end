import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose.connect(uri, {useNewUrlParser: true})

export default mongoose