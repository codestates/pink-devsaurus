const express = require('express');
const router = express.Router();
// const sessionController;

/* users modify/delete Router page */
router.put('/:userId', (req,res) => {
    res.send(req.params);
})
router.delete('/:userId', (req,res) => {
    res.send(req.params);
})

module.exports = router;