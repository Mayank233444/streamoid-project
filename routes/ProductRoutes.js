const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const upload = require('../middleware/upload');

router.post('/upload' , upload.single('file') , productController.uploadCSV);

router.get('/products' , productController.listProducts);

router.get('/products/search' , productController.searchProducts);

module.exports = router;