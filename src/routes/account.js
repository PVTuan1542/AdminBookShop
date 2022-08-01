const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');

//router.use('/:slug', siteController.show);

router.get('/', accountController.index);

module.exports = router;
