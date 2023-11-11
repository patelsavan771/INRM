const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const users = require('../controllers/users');

router.route('/register')
    .post(catchAsync(users.register));

router.route('/login')
    .post(users.login);

router.get('/logout', users.logout);

module.exports = router;

