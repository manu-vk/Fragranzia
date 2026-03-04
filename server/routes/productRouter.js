const express = require('express');
const { getProduct, addProduct, deleteProduct, updateProduct } = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get('/', getProduct);
productRouter.post('/', addProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.put('/:id', updateProduct);

module.exports = productRouter;