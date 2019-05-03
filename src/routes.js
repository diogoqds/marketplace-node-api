const express = require('express')
const routes = express.Router()
const validate = require('express-validation')
const handle = require('express-async-handler')
const authMiddleware = require('./app/middlewares/auth')
const {
  UserController,
  SessionController,
  AdController,
  PurchaseController
} = require('./app/controllers')

const { Ad, Purchase, Session, User } = require('./app/validators')

routes.post('/users', validate(User), handle(UserController.store))
routes.post('/sessions', validate(Session), handle(SessionController.store))

routes.use(authMiddleware)

routes.get('/ads', handle(AdController.index))
routes.get('/ads/:id', handle(AdController.show))
routes.post('/ads', validate(Ad), handle(AdController.store))
routes.put('/ads/:id', validate(Ad), handle(AdController.update))
routes.delete('/ads/:id', handle(AdController.destroy))

routes.post('/purchase', validate(Purchase), handle(PurchaseController.store))
module.exports = routes
