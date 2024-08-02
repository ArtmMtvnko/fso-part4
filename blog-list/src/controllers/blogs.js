const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { blogs: 0 })
        .populate('comments', { blog: 0 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })
  
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const id = request.params.id
    const { content } = request.body
    
    const blog = await Blog.findById(id)

    const comment = new Comment({
        content,
        blog: blog._id
    })

    const savedComment = await comment.save()

    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    response.status(201).json(savedComment)
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes, comments } = request.body

    const result = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes, comments },
        { new: true, runValidators: true, context: 'query' }
    )
    response.json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (request.user.id !== blog.user.toString()) {
        return response.status(400).json({ error: 'user id doesn\'t mathes id of blog owner' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter