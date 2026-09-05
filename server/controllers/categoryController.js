const categoryModel = require("../model/categoryModel")

const getCategory = async (req, res) => {
    const categories = await categoryModel.find();
    res.json(categories)
}

const addCategory = async (req, res) => {
    const category = await categoryModel.create(req.body);
    res.status(201).json(category)
}

const deleteCategory = async (req, res) => {
    await categoryModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Category Deleted" })
}

module.exports = { getCategory, addCategory, deleteCategory }