const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const resources = require('../controllers/resources');

router.route('/')
    .get(resources.getAll)
    .post(catchAsync(resources.add))

router.route('/:id')
    .get(resources.get)
    .put(catchAsync(resources.update))
    .delete(catchAsync(resources.delete));

module.exports = router;