const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

/* category Router page */
router.get("/", Controller.category.allCategory); // 작성자 : 최민우

module.exports = router;
