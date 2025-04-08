const express = require('express');
const reviewRouter = require('./review');
const router = express.Router();

router.use('/review', reviewRouter);

module.exports = router;