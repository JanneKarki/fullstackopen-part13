const jwt = require('jsonwebtoken')
const { SECRET } = require('./config.js')
const { Session, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  const session = await Session.findOne({
    where: {
      token: authorization.substring(7)
    },
    include: {
      model: User
    }
  })

  if (!session) {
    return res.status(401).json({ error: 'session expired' })
  }

  if (session.user.disabled) {
    return res.status(401).json({ error: 'account disabled, please contact admin' })
  }

  next()
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: error.errors.map(e => e.message) })
  } else if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: [error.message] })
  }

  next(error)
}

module.exports = { tokenExtractor, errorHandler }
