const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const slotreqs = require('../controllers/slotreqs');
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(isLoggedIn, slotreqs.getAll) // only for that users
    .post(isLoggedIn, catchAsync(slotreqs.add))

router.route('/:id')
    .get(isLoggedIn, slotreqs.get)
    .delete(slotreqs.delete);

router.route('/admin')
    .get(isLoggedIn, slotreqs.getAll); // all

router.route('/admin/:id')
    .get(isLoggedIn, slotreqs.get)
    .put(isLoggedIn, catchAsync(slotreqs.update));

module.exports = router;