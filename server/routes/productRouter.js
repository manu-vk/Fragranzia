const express = require('express');
const { getProduct } = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get('/', getProduct);

module.exports = productRouter;