const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    rating: { type: Number, required: true },
    ratingCount: { type: Number, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ProductModel', ProductSchema);