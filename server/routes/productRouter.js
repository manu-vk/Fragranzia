const express = require('express');
const { getProduct, addProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const upload = require('../middleware/upload');

const productRouter = express.Router();

productRouter.get('/', getProduct);
// productRouter.post('/', addProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.put('/:id', updateProduct);
productRouter.post('/', upload.array("image", 3), addProduct);

module.exports = productRouter;