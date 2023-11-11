const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const complaints = require('../controllers/complaints');
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(complaints.getAll)
    .post(isLoggedIn, catchAsync(complaints.add))

router.route('/:id')
    .get(complaints.get)
    .put(isLoggedIn, catchAsync(complaints.update))
    .delete(complaints.delete);

module.exports = router;