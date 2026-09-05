const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getWishlist,
  addToWishlist
} = require("../controllers/wishlistController");

const router = express.Router();

router.get("/", protect, getWishlist);

router.post("/", protect, addToWishlist);

module.exports = router;