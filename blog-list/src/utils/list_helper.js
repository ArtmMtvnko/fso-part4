const dummy = (blogs) => 1

const totalLikes = blogs => {
    return blogs.reduce((acc, blog) => acc += blog.likes, 0)
}

const favoriteBlog = blogs => {
    if (blogs.legth === 0) return 'blogs are empty'

    const mostLikedBlog = blogs.reduce((acc, blog) => blog.likes > acc.likes ? blog : acc, blogs[0])

    const { title, author, likes } = mostLikedBlog

    return {
        title,
        author,
        likes
    }
}

const mostBlogs = blogs => {
    const blogsMap = new Map()

    blogs.forEach(blog => {
        let author = blogsMap.get(blog.author)
        blogsMap.set(blog.author, author
            ? { author: blog.author, blogs: author.blogs + 1 }
            : { author: blog.author, blogs: 1 }
        )
    })

    let result = { author: 'nothing', blogs: 0 }

    blogsMap.forEach(author => {
        if (author.blogs > result.blogs) {
            result = author
        }
    })

    return result
}

const mostLikes = blogs => {
    const blogsMap = new Map()

    blogs.forEach(blog => {
        let author = blogsMap.get(blog.author)
        blogsMap.set(blog.author, author
            ? { author: blog.author, likes: blog.likes + author.likes }
            : { author: blog.author, likes: blog.likes }
        )
    })

    let result = { author: 'nothing', likes: 0 }

    blogsMap.forEach(author => {
        if (author.likes > result.likes) {
            result = author
        }
    })

    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}