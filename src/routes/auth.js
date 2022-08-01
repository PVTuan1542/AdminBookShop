const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');
const authMiddleware = require('../app/middlewares/auth.midleware')

//router.use('/:slug', siteController.show);

router.get('/logout', authController.logout);
//router.get('/login', authController.login);
router.post('/login', authController.login);
router.get('/', authController.login);

module.exports = router;