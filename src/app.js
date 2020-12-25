// config environment
require('dotenv').config()
import { respondWithError } from './helpers/messageResponse'
import bodyParser from 'body-parser'
import express from 'express'
import logger from 'morgan'
import mongoClient from 'mongoose'
import cors from 'cors'
import { ErrorCodes } from './helpers/constants'

global.__basedir = __dirname

// setup connect mongodb by mongoose
mongoClient
    .connect('mongodb://localhost/project1', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('✅ Connected database from mongodb.'))
    .catch((error) =>
        console.error(`❌ Connect database is failed with error which is ${error}`),
    )

const app = express()
app.use('/uploads', express.static('assets/uploads'))

const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    exposedHeaders: ['Content-Length', 'Authorization'],
}
app.use(cors(corsOptions))

// Middlewares
app.use(logger(`dev`))
app.use(bodyParser.json())

// Routes
import routerManager from './routes'
routerManager(app)

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    res.json(respondWithError(ErrorCodes.ERROR_CODE_API_NOT_FOUND, 'API not found'))
})

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    // response to client
    return res.status(status).json({
        error: {
            message: error.message,
        },
    })
})

// Start the server
const port = app.get('port') || 3000
app.listen(port, () => console.log(`Server is listening on port ${port}`))
