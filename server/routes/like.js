const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

/* session Router page */
router.put("/questions/:boardId", Controller.like.questionsLikeUp);
router.delete("/questions/:boardId", Controller.like.questionsLikeDown);

router.put("/answers/:answerId", Controller.like.answersLikeUp); // 작성자: 김경봉
router.delete("/answers/:answerId", Controller.like.answersLikeDown); // 작성자: 김경봉

module.exports = router;
