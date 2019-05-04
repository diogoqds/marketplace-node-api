const { Ad, User, Purchase } = require('../models')
const Queue = require('../services/Queue')
const { PurchaseMail } = require('../jobs')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body
    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    const purchase = await Purchase.create({
      ad,
      user: req.userId,
      content
    })

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.json(purchase)
  }
}

module.exports = new PurchaseController()
