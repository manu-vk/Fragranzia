const express = require('express');
const { getCategory, addCategory, deleteCategory } = require('../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.get('/', getCategory);
categoryRouter.post('/', addCategory);
categoryRouter.delete('/:id', deleteCategory);

module.exports = categoryRouter;