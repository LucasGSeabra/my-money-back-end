import mongoose from 'mongoose'

async function connectDB() {
    mongoose.Promise = global.Promise
    await mongoose.connect(process.env.DB_URI, {useNewUrlParser: true})
    return mongoose
}

export default connectDB