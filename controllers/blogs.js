const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/*Read all blogs */
blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
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
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes !== undefined ? body.likes : 0,
    user: user.id
  })


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

module.exports = blogsRouter