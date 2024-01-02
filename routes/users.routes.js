const express = require('express');
const router = express.Router();
const {authenticateAndAuthorise} = require('../middlewares/authentication');
const {ROLES} = require('../utils/enums');

router.get('/protected',authenticateAndAuthorise([ROLES.USER]),(req,res) =>{
    res.send('ok');
});

module.exports = router;