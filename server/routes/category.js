const express = require('express');
const router = express.Router();
// const sessionController;

/* category Router page */
router.get('/', (req,res) => {
    res.send('category');
})

module.exports = router;