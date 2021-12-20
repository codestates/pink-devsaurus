const express = require('express');
const router = express.Router();
const Controller = require('../controllers')

/* session Router page */
router.post('/login', Controller.session.logIn);
router.get('/logout', Controller.session.logOut);
router.post('/sign-up', Controller.session.signUp);
router.get('/userinfo', Controller.session.userInfo)
router.get('/auth', Controller.session.auth)

module.exports = router;