const express = require('express');
const router = express.Router();

const statisticalController = require('../app/controllers/StatisticalController');

//router.use('/:slug', siteController.show);
router.get('/month', statisticalController.month);
router.get('/quarter', statisticalController.quarter);
router.get('/year', statisticalController.year);

module.exports = router;
