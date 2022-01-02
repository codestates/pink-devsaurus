const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

/* session Router page */
router.get("/", Controller.board.allQuestions);
router.get("/:boardId", Controller.board.questions);
router.get("/answers/:boardId", Controller.board.answers);
router.post("/", Controller.board.write);
router.put("/:boardId", Controller.board.modify);
router.delete("/:boardId", Controller.board.delete);

module.exports = router;
