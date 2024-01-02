const express = require('express');
const router = express.Router();
const {validate} = require('express-validation')
const {register , login} = require('../controllers/auth.controller');
const USER = require('../validations/user.validation');

router.post('/register',validate(USER.register),register);
router.post('/login',validate(USER.login),login);
module.exports = router;