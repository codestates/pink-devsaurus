const express = require('express');
const router = express.Router();
const Controller = require('../controllers')

/* session Router page */
router.put('/questions/:boardId', (req,res) => {
    console.log(req.params)
    res.send("like questions : ");
})
router.delete('/questions/:boardId', (req,res) => {
    console.log(req.params)
    res.send("like questions : ");
})

router.put('/answers/:answerId', (req,res) => {
    console.log(req.params)
    res.send("like answers : ");
})
router.delete('/answers/:answerId', (req,res) => {
    console.log(req.params)
    res.send("like answers : ");
})


module.exports = router;