const express = require('express');
const { getProduct } = require('../controllers/productController');

const productRouter = express.Router();

router.get('/', getProduct);

module.exports = productRouter;