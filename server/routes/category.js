const express = require('express');
const router = express.Router();
const Controller = require('../controllers')

/* category Router page */
router.get('/', (req,res) => {
    res.send('category');
})

module.exports = router;