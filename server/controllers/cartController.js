// const Cart = require("../model/cartModel");
// const Product = require("../model/productModel");
 
// // GET CART
// const getCart = async (req, res) => {
//   try {
//     const cartItems = await Cart.find({ user: req.user.id })
//       .populate("productId");

//     const formattedCart = cartItems.map((item) => ({
//       id: item.productId._id,
//       cartId: item._id,
//       title: item.productId.title,
//       price: item.productId.price,
//       offerPrice: item.productId.offerPrice,
//       image: item.productId.image,
//       quantity: item.quantity,
//     }));

//     res.status(200).json({
//       cart: formattedCart,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// const addToCart = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;

//     // ✅ safety checks
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     if (!productId) {
//       return res.status(400).json({ message: "ProductId missing" });
//     }

//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Check if item already exists
//     const existingItem = await Cart.findOne({
//       productId: productId,
//       user: req.user.id
//     });

//     let cartItem;

//     if (existingItem) {
//       // Update existing item - increment quantity
//       existingItem.quantity = (existingItem.quantity || 1) + (quantity || 1);
//       cartItem = await existingItem.save();
      
//       return res.status(200).json({
//         message: "Cart updated",
//         cart: cartItem
//       });
//     } else {
//       // Create new cart item
//       cartItem = await Cart.create({
//         productId: productId,
//         user: req.user.id,
//         quantity: quantity || 1
//       });

//       return res.status(201).json({
//         message: "Added to cart",
//         cart: cartItem
//       });
//     }

//   } catch (error) {
//     console.error("Add to cart error:", error.message);
    
//     // Handle duplicate key error
//     if (error.code === 11000) {
//       console.error("E11000 duplicate key - attempting recovery");
      
//       // Try to find and update as fallback
//       try {
//         const { productId, quantity } = req.body;
//         const existing = await Cart.findOne({
//           productId: productId,
//           user: req.user.id
//         });
        
//         if (existing) {
//           existing.quantity = (existing.quantity || 1) + (quantity || 1);
//           const updated = await existing.save();
//           return res.status(200).json({
//             message: "Cart updated (after recovery)",
//             cart: updated
//           });
//         }
//       } catch (recoveryError) {
//         console.error("Recovery failed:", recoveryError.message);
//       }
      
//       return res.status(400).json({ 
//         message: "Duplicate key error. Try clearing your browser cache and refresh the page." 
//       });
//     }
    
//     res.status(500).json({ message: error.message });
//   }
// };

// // UPDATE CART ITEM
// const updateCartItem = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;

//     const cartItem = await Cart.findOne({
//       productId,
//       user: req.user.id,
//     });

//     if (!cartItem) {
//       return res.status(404).json({
//         message: "Cart item not found",
//       });
//     }

//     if (quantity <= 0) {
//       await Cart.deleteOne({
//         _id: cartItem._id,
//       });

//       return res.status(200).json({
//         message: "Item removed from cart",
//       });
//     }

//     cartItem.quantity = quantity;

//     await cartItem.save();

//     res.status(200).json({
//       message: "Cart updated",
//       cart: cartItem,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // REMOVE FROM CART
// const removeFromCart = async (req, res) => {
//   try {
//     const { productId } = req.params;

//     const cartItem = await Cart.findOneAndDelete({
//       productId,
//       user: req.user.id,
//     });

//     if (!cartItem) {
//       return res.status(404).json({
//         message: "Item not found",
//       });
//     }

//     res.status(200).json({
//       message: "Item removed from cart",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   getCart,
//   addToCart,
//   updateCartItem,
//   removeFromCart,
// };
const Cart = require("../model/cartModel");
const Product = require("../model/productModel");

// =======================
// GET CART
// =======================
const getCart = async (req, res) => {
  try {
    const userId = req.user.id.toString();

    const cartItems = await Cart.find({ user: userId }).populate("productId");

    const formattedCart = cartItems.map((item) => ({
      id: item.productId._id,
      cartId: item._id,
      title: item.productId.title,
      price: item.productId.price,
      offerPrice: item.productId.offerPrice,
      image: item.productId.image,
      quantity: item.quantity,
    }));

    res.status(200).json({ cart: formattedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addToCart = async (req, res) => {
  try {
    let { productId, quantity } = req.body;

    const userId = req.user.id.toString();
    productId = productId.toString();

    if (!productId) {
      return res.status(400).json({ message: "ProductId missing" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // check existing item
    let cartItem = await Cart.findOne({
      user: userId,
      productId: productId,
    });

    if (cartItem) {
      // update quantity
      cartItem.quantity += quantity || 1;
      await cartItem.save();

      return res.status(200).json({
        message: "Cart updated",
        cart: cartItem,
      });
    }

    // create new item
    cartItem = await Cart.create({
      user: userId,
      productId,
      quantity: quantity || 1,
    });

    return res.status(201).json({
      message: "Added to cart",
      cart: cartItem,
    });
  } catch (error) {
    console.error("Add to cart error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// UPDATE CART ITEM
// =======================
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id.toString();
    let { productId, quantity } = req.body;

    productId = productId.toString();

    const cartItem = await Cart.findOne({
      user: userId,
      productId,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (quantity <= 0) {
      await Cart.deleteOne({ _id: cartItem._id });

      return res.status(200).json({
        message: "Item removed from cart",
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      message: "Cart updated",
      cart: cartItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// REMOVE FROM CART
// =======================
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id.toString();
    const productId = req.params.productId.toString();

    const cartItem = await Cart.findOneAndDelete({
      user: userId,
      productId,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};