const Wishlist = require("../model/wishlistModel");

// GET WISHLIST

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id
    }).populate("productId");

    const formatted = wishlist
      .filter((item) => item.productId)
      .map((item) => ({
        id: item.productId._id,
        title: item.productId.title,
        image: item.productId.image,
        price: item.productId.price,
        offerPrice: item.productId.offerPrice,
      }));

    res.status(200).json({
      wishlist: formatted
    });

  } catch (error) {
    console.error("Get wishlist error:", error);

    res.status(500).json({
      message: error.message
    });
  }
};

// ADD TO WISHLIST

const addToWishlist = async (req, res) => {
  try {

    const { productId } = req.body;

    const existing = await Wishlist.findOne({
      productId,
      user: req.user.id
    });

    // remove if already exists

    if (existing) {

      await Wishlist.deleteOne({
        _id: existing._id
      });

      return res.status(200).json({
        message: "Removed from wishlist"
      });
    }

    await Wishlist.create({
      productId,
      user: req.user.id
    });

    res.status(201).json({
      message: "Added to wishlist"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
};