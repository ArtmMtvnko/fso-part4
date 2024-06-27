const jwt = require('jsonwebtoken')
const User = require('../../models/user')

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    request.user = await User.findById(request.body.userId)

    next()
}

module.exports = userExtractor