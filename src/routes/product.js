const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductsController');

//router.use('/:slug', siteController.show);
router.get('/create', productController.create);
router.post('/add-product', productController.addProduct);
router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.get('/', productController.show);

module.exports = router;
