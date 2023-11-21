const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

mongoose.set('strictQuery', false)

const url = config.MONGODB_URI


mongoose.connect(url)
    .then(result => logger.info('connected to mongoDB'))
    .catch(error => logger.error('Error connecting to mongoDB', error))

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)