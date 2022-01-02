const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

/* users modify/delete Router page */
router.put("/:userId", Controller.user.modify); // 작성자 : 김경봉
router.delete("/:userId", Controller.user.delete); // 작성자 : 카에

module.exports = router;
