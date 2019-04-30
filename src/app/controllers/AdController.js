const { Ad } = require('../models')

class AdController {
  async index (req, res) {
    try {
      const ads = await Ad.find()
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
