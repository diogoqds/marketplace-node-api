const express = require('express')
const routes = express.Router()
const validate = require('express-validation')
const authMiddleware = require('./app/middlewares/auth')

const {
  UserController,
  SessionController,
  AdController,
  PurchaseController
} = require('./app/controllers')

const { Ad, Purchase, Session, User } = require('./app/validators')

routes.post('/users', validate(User), UserController.store)
routes.post('/sessions', validate(Session), SessionController.store)

routes.use(authMiddleware)

routes.get('/ads', AdController.index)
routes.get('/ads/:id', AdController.show)
routes.post('/ads', validate(Ad), AdController.store)
routes.put('/ads/:id', validate(Ad), AdController.update)
routes.delete('/ads/:id', AdController.destroy)

routes.post('/purchase', validate(Purchase), PurchaseController.store)
module.exports = routes
