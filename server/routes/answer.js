const express = require('express');
const router = express.Router();
const Controller = require('../controllers')

/* session Router page */
router.post('/', (req,res) => {
    res.send("answer-write");
})
router.put('/:boardId', (req,res) => {
    res.send("answer-modify");
})
router.delete('/:boardId', (req,res) => {
    res.send("answer-delete");
})
router.get('/:userId', (req,res) => {
    res.send("answer-delete");
})
router.put('/best-answer/:boardId', (req,res) => {
    res.send("best-answer");
})


module.exports = router;