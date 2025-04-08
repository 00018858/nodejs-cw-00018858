const express = require('express');
const { reviewValidationRules } = require('../../validators/review');
const reviewController = require('../../controllers/review');
const router = express.Router();

router.post('/create', reviewValidationRules(), reviewController.create);
router.post('/update/:id', reviewValidationRules(), reviewController.update);
router.get('/delete/:id', reviewController.delete);

module.exports = router;

