const express = require('express');
const router = express.Router();
const Controller = require('../controllers')

/* users modify/delete Router page */
router.put('/:userId', Controller.user.modify)
router.delete('/:userId', (req,res) => {
    res.send(req.params);
})

module.exports = router;