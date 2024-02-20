const express = require('express');
const router = express.Router();

const ProductController = require('../Controllers/Product.controller');

router.get('/', ProductController.getAllProducts);

router.post('/', ProductController.createNewProduct);

router.get('/:id', ProductController.getOneProduct);

router.patch('/:id', ProductController.updateOneProduct);

router.delete('/:id', ProductController.deleteOneProduct);

module.exports = router;