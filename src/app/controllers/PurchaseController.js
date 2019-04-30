const { Ad, User } = require('../models')
const Mail = require('../services/Mail')

class PurchaseController {
  async store (req, res) {
    try {
      const { ad, content } = req.body
      const purchaseAd = await Ad.findById(ad).populate('author')
      const user = await User.findById(req.userId)

      await Mail.sendMail({
        from: `${user.name} <${user.email}>'`,
        to: purchaseAd.author.email,
        subject: `Solicitação de compra: ${purchaseAd.title}`,
        template: 'purchase',
        context: { user, content, ad: purchaseAd }
      })
      return res.json()
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}

module.exports = new PurchaseController()
