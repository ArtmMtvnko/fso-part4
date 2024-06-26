const User = require('../src/models/user')

const initialBlogs = [
    {
        title: 'test 2 title',
        author: 'Jhon Jhonson',
        url: 'http://mybook.com/books/1',
        likes: 42,
    },
    {
        title: 'HTML is easy',
        author: 'Obeme',
        url: 'http://mybook.com/books/4',
        likes: 30,
    }
]

const testBlog = {
    title: 'Test title',
    author: 'Test Testson',
    url: 'http://mytestbook.com/books/1',
    likes: 11,
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, testBlog, usersInDb
}