const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

/* session Router page */
router.post("/", Controller.answer.write);
router.put("/:boardId", Controller.answer.modify); // 작성자 : 최민우
router.delete("/:answerId", Controller.answer.delete); // 작성자 : 김경봉
router.put("/best-answer/:boardId", Controller.answer.bestAnswer); //작성자 : 최민우

module.exports = router;
