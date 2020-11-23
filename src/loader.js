import server from './config/server.js'
import dontenv from 'dotenv'
import connectDB from './config/database.js'
import routes from './config/routes.js'

dontenv.config()
connectDB()
routes(server)