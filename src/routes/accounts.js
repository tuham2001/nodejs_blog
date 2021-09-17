const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');


router.post('/postRegister', accountController.postRegister);
router.get('/register', accountController.register);
router.get('/login', accountController.login);
router.post('/postLogin', accountController.postLogin);
router.get('/logout', accountController.logout);

module.exports = router;
