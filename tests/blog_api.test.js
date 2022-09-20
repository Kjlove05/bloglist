const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)


const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  for(let i=0; i<helper.blogs.length; i++){
    let blogObject = new Blog(helper.blogs[i])
    await blogObject.save()
  }
})

describe('preliminary testings', () => {
  test('length of blogs', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.blogs.length)
  })

  test('check for id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'new Blog',
      author: 'Kyle Joshua',
      url: 'gwapo.com',
      likes: 100
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    
    const contents = response.body.map(r => r.title)
    
    expect(response.body).toHaveLength(helper.blogs.length + 1)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('likes is undefined', async () => {
    const newBlog = {
      title: 'new Blog',
      author: 'Kyle Joshua',
      url: 'gwapo.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blog = response.body[response.body.length-1]

    expect(blog.likes).toBe(0)
  })

  test('deleting a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.blogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('updating likes of blog', async () => {
    const updatedLikes = {
      likes: 999
    }

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .expect(200)
    
    const updated = await api.get(`/api/blogs/${blogToUpdate.id}`)
    
    expect(updated.body.likes).toBe(999)
  })
})

describe('title and url are undefined', () => {
  test('missing title', async () => {
    const newBlog = {
      title: 'new Blog',
      author: 'Kyle Joshua',
      url: 'gwapo.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
  

})




     




afterAll(() => {
  mongoose.connection.close()
})