

const productModel = require("../model/productModel")

// const getProduct = async (req, res) => {
//     const products = await productModel.find();
//     res.json(products); 
// };
const getProduct = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching products" });
    }
};
// const addProduct = async (req, res) => {
//     const product = await productModel.create(req.body);
//     res.status(201).json(product);
// }
const addProduct = async (req, res) => {
    try {
        // const images = req.files.map(file => file.filename);
        const images = req.files ? req.files.map(file => file.filename) : [];
        const product = await productModel.create({
            ...req.body,
            image: images
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteProduct = async (req, res) => {
    await productModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Deleted" })
}

const updateProduct = async (req, res) => {
    const { id } = req.params;

    const updatedProduct = await productModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    res.json(updatedProduct);
};

module.exports = { getProduct, addProduct, deleteProduct, updateProduct }