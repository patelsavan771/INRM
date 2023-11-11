const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const slotreqs = require('../controllers/slotreqs');
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(isLoggedIn, slotreqs.getAll)
    .post(isLoggedIn, catchAsync(slotreqs.add))

router.route('/:id')
    .get(isLoggedIn, slotreqs.get)
    .put(isLoggedIn, catchAsync(slotreqs.update))
    .delete(slotreqs.delete);

module.exports = router;