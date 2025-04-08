const express = require('express');
const reviewController = require('../../controllers/review');
const router = express.Router();

// Displaying all reviews
router.get('/', (req, res) => {
    reviewController.getAll(req, res);
});

// Form for creating a new review
router.get('/create', (req, res) => {
    res.render('review/create_update');
});

// Form for updating the review
router.get('/update/:id', (req, res) => {
    reviewController.getById(req, res);
});

module.exports = router;