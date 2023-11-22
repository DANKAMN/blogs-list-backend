const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')
require('dotenv').config()

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

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString(); // Map '_id' to 'id'
      delete returnedObject._id; // Remove '_id' property
      delete returnedObject.__v; // Remove '__v' property
    },
});

module.exports = mongoose.model('Blog', blogSchema)