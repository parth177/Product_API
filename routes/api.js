const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products/create', productController.create);
router.get('/products', productController.productList);
router.delete('/products/:id', productController.delete);
router.post('/products/:id/update_quantity', productController.updateQty);

module.exports.create = module.exports = router;
