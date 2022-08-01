const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

//router.use('/:slug', siteController.show);

router.get('/update/:id', orderController.update);
router.get('/view/:id', orderController.view);
router.get('/', orderController.index);

module.exports = router;
