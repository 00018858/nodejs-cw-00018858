const express = require('express');
const reviewRouter = require('./review');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/review');
});

router.use('/review', reviewRouter);

module.exports = router;
