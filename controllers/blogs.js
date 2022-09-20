const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog)
  } else{
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {

  const blog = new Blog({
    title: "kshfjkhkdfhsd",
    author: "Arjie Aballe",
    url: "https:/jhajkhfkgahf",
    likes: 5,
   
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const user = request.user

  if(blog.user.toString() === user.id){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else{
    return response.status(401).json({ error: 'invalid user'})
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const {likes} = await request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {likes}, {new: true, runValidators: true, context: 'query'})
  response.json(updatedBlog)
})

module.exports = blogsRouter