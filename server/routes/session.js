const express = require('express');
const router = express.Router();
// const sessionController;

/* session Router page */
router.post('/login', (req,res) => {
    res.send("login");
})
router.get('/logout', (req,res) => {
    res.send("logout");
})
router.post('/sign-up', (req,res) => {
    res.send("sign-up");
})
router.get('/userinfo', (req,res) => {
    res.send("userinfo");
})
router.get('/auth', (req,res) => {
    res.send("auth");
})

module.exports = router;