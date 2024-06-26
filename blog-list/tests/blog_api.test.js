const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/app')
const Blog = require('../src/models/blog')
const helper = require('./helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
  
test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(blog => blog.title)

    assert(titles.includes('HTML is easy'))
})

test('\'id\' key has proper name', async () => {
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(blog => Object.keys(blog).includes('id'))

    assert(!titles.includes(false))
})

test('post: new blog successfully creating', async () => {
    const createdBlog = await api.post('/api/blogs', helper.testBlog)
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
})

after(async () => {
    await mongoose.connection.close()
})