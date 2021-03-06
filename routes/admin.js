// const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

const router = express.Router();




// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.addProduct);

// /admin/edit-product/:productId
router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.editProduct);

router.post('/delete-product', adminController.deleteProduct);

module.exports = router;

