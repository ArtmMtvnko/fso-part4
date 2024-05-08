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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}