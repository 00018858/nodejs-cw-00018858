const { validationResult } = require('express-validator');
const reviewService = require('../services/review');

const reviewController = {

  getById: (req, res) => {
    try {
      const review = reviewService.getById(req);
      res.render('review/create_update', { review });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAll: (req, res) => {
    try {
      const reviews = reviewService.get();
      res.render('review/index', { reviews });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('review/create_update', { errors: errors.array(), review: req.body });
    }
    try {
      await reviewService.insert(req);
      res.redirect('/review');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('review/create_update', { errors: errors.array(), review: req.body });
    }
    try {
      const updatedReview = reviewService.update(req);
      if (!updatedReview) return res.status(404).json({ error: 'Review not found' });
      res.redirect('/review');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: (req, res) => {
    try {
      const deleted = reviewService.delete(req);
      if (!deleted) return res.status(404).json({ error: 'Review not found' });
      res.redirect('/review');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = reviewController;