// ██╗   ██╗██╗███████╗██╗   ██╗ █████╗ ██╗         ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗ 
// ██║   ██║██║██╔════╝██║   ██║██╔══██╗██║         ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗
// ██║   ██║██║███████╗██║   ██║███████║██║         ███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║
// ╚██╗ ██╔╝██║╚════██║██║   ██║██╔══██║██║         ╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║
//  ╚████╔╝ ██║███████║╚██████╔╝██║  ██║███████╗    ███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝
//   ╚═══╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝ 

const productModel = require("../model/productModel")

const getProduct = (req, res) => {
    const product = productModel.find()
    res.status(200).json(product);
}

const getProductById = (req, res) => {
    const { id } = req.params;
    const product = productModel.findById(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
}

const createProduct = (req, res) => {
    const { title, description, price, offerPrice, category, stock, rating, ratingCount, image } = req.body;
    const newProduct = new productModel({
        title,
        description,
        price,
        offerPrice,
        category,
        stock,
        rating,
        ratingCount,
        image
    });
    newProduct.save()
        .then(product => res.status(201).json(product))
        .catch(err => res.status(400).json({ message: "Error creating product", error: err }));
}

module.exports = { getProduct, getProductById, createProduct }