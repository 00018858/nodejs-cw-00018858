const { body } = require('express-validator');

const reviewValidationRules = () => {
  return [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('genre').notEmpty().withMessage('Genre is required'),
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be an integer between 1 and 5'),
    body('insight').optional().isString()
  ];
};

module.exports = {
  reviewValidationRules
};