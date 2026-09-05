const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createProduct } = require("../controllers/productController");

router.post("/create", upload.single("image"), createProduct);

module.exports = router;
