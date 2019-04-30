const { User } = require('../models')

class SessionController {
  async store (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ error: 'User not found' })
      }

      if (!user.compareHash(password)) {
        return res.status(400).json({ error: 'Password incorrect' })
      }

      return res.json({ user, token: User.generateToken(user) })
    } catch (error) {
      return res.json(error)
    }
  }
}

module.exports = new SessionController()
