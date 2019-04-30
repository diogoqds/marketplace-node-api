const express = require('express')
const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const { UserController, SessionController } = require('./app/controllers')

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.get('/teste', authMiddleware, (req, res) => {
  return res.json({ ok: true })
})
module.exports = routes
