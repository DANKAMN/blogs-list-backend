const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

/*Read all blogs */
blogsRouter.get('/', (request, response, next) => {
    Blog.find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(error => next(error))
})

/*Read a specific blog */
blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
  .then(blog => {
    if(blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

/*Post a blog */
blogsRouter.post('/', (request, response, next) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and url are required' });
  }

  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes !== undefined ? body.likes : 0,
  })

  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter