import bodyParser from 'body-parser'
import express from 'express'
import cors from '../config/cors.js'
import queryParser from 'express-query-int'

const server = express()
const port = 3003

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors)
server.use(queryParser())

server.listen(port, function() {
    console.log(`BACKEND is running on ${port}`)
})
 export default server

