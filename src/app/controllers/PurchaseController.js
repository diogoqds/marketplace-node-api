const { Ad, User } = require('../models')
const Queue = require('../services/Queue')
const { PurchaseMail } = require('../jobs')

class PurchaseController {
  async store (req, res) {
    try {
      const { ad, content } = req.body
      const purchaseAd = await Ad.findById(ad).populate('author')
      const user = await User.findById(req.userId)

      Queue.create(PurchaseMail.key, {
        ad: purchaseAd,
        user,
        content
      }).save()

      return res.json()
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}

module.exports = new PurchaseController()
