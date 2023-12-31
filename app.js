const express = require('express')
const app = express()

const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)
const url = config.MONGODB_URI

mongoose.connect(url)
    .then(result => logger.info('connected to mongoDB'))
    .catch(error => logger.error('Error connecting to mongoDB', error))

app.use(cors())
/* app.use(express.static('dist')) */
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app