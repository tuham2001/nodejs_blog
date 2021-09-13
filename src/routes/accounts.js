const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');

router.get('/register', accountController.register);
router.get('/login', accountController.login);
router.post('/saveRegister', accountController.saveRegister);
router.post('/saveLogin', accountController.saveLogin);

module.exports = router;
