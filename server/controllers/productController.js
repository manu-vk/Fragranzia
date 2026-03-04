// ██╗   ██╗██╗███████╗██╗   ██╗ █████╗ ██╗         ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗ 
// ██║   ██║██║██╔════╝██║   ██║██╔══██╗██║         ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗
// ██║   ██║██║███████╗██║   ██║███████║██║         ███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║
// ╚██╗ ██╔╝██║╚════██║██║   ██║██╔══██║██║         ╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║
//  ╚████╔╝ ██║███████║╚██████╔╝██║  ██║███████╗    ███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝
//   ╚═══╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝ 

const productModel = require("../model/productModel")

const getProduct = async (req, res) => {
    const products = await productModel.find();
    res.json(products); 
};

const addProduct = async (req, res) => {
    const product = await productModel.create(req.body);
    res.status(201).json(product);
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