const express = require('express');
const router = express.Router();
//const authMiddleware = require('../app/middlewares/auth.midleware')

const homeController = require('../app/controllers/HomeController');

//router.use('/:slug', siteController.show);

router.get('/search',  homeController.search);

router.get('/',  homeController.index);

module.exports = router;
