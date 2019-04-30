const { Ad } = require('../models')

class AdController {
  async index (req, res) {
    try {
      const filters = {}
      if (req.query.price_min || req.query.price_max) {
        filters.price = {}

        if (req.query.price_min) {
          filters.price.$gte = req.query.price_min
        }

        if (req.query.price_max) {
          filters.price.$lte = req.query.price_max
        }
      }

      if (req.query.title) {
        filters.title = new RegExp(req.query.title, 'i')
      }

      const ads = await Ad.paginate(filters, {
        page: req.query.page || 1,
        limit: 20,
        populate: ['author'],
        sort: '-createdAt'
      })
      return res.json(ads)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  async show (req, res) {
    try {
      const ad = await Ad.findById(req.params.id)
      return res.json(ad)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  async store (req, res) {
    try {
      const ad = await Ad.create({ ...req.body, author: req.userId })
      return res.json(ad)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  async update (req, res) {
    try {
      const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      return res.json(ad)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  async destroy (req, res) {
    try {
      await Ad.findByIdAndRemove(req.params.id)
      return res.json()
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}

module.exports = new AdController()
