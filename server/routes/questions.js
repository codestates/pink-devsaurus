const express = require('express');
const router = express.Router();
const Controller = require('../controllers')

/* session Router page */
router.get('/:boardId', (req,res) => {
    res.send("게시물 조회");
})
router.get('/', (req,res) => {
    res.send("게시물 목록 조회");
})
router.post('/', (req,res) => {
    res.send("게시물 작성");
})
router.put('/:boardId', (req,res) => {
    res.send("게시물 수정");
})
router.delete('/:boardId', (req,res) => {
    res.send("게시물 삭제");
})


module.exports = router;