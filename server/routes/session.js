const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const Controller = require("../controllers");

/* session Router page */
router.get("/", (req, res) => {
  res.redirect("https://www.pinkdevsaurus.tk/");
});
router.post("/login", Controller.session.logIn);
router.get("/logout", Controller.session.logOut);
router.post("/sign-up", Controller.session.signUp);
router.get("/userinfo", Controller.session.userInfo);
router.get("/auth", Controller.session.auth);

module.exports = router;
