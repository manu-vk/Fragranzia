/**
 * CRITICAL FIX - Run this to completely drop and recreate the carts collection
 * This clears the old broken index and starts fresh
 * 
 * Usage: node fix-cart-index.js
 * 
 * WARNING: This will DELETE all cart items. Only run if you have old broken data.
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/fragranzia", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✓ MongoDB connected");

    // Drop the entire carts collection (this removes all data AND indexes)
    try {
      await mongoose.connection.collection("carts").drop();
      console.log("✓ Dropped carts collection (all old indexes and data removed)");
    } catch (err) {
      if (err.code === 26) {
        console.log("✓ Carts collection doesn't exist (fresh start)");
      } else if (err.message.includes("ns not found")) {
        console.log("✓ Carts collection doesn't exist (fresh start)");
      } else {
        console.error("Error dropping collection:", err.message);
      }
    }

    // Load the model - it will recreate the collection with correct indexes
    const Cart = require("./model/cartModel");
    
    // Force index creation
    await Cart.collection.createIndex({ user: 1, productId: 1 }, { unique: true, sparse: true });
    console.log("✓ Created new compound unique index: [user_1, productId_1]");

    // Verify indexes
    const indexes = await Cart.collection.getIndexes();
    console.log("\n✓ Current indexes on carts collection:");
    for (const [name, spec] of Object.entries(indexes)) {
      console.log(`  - ${name}:`, spec);
    }

    console.log("\n✅ COMPLETE! The carts collection is now clean.");
    console.log("✅ Now restart your server: npm start");
    console.log("\n📝 You can now add multiple items to the same cart!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error);
    process.exit(1);
  }
};

connectDB();
