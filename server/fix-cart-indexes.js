const mongoose = require("mongoose");
require("dotenv").config();

async function fixCartIndexes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const Cart = require("./model/cartModel");

    // Get all existing indexes
    const indexes = await Cart.collection.getIndexes();
    console.log("Current indexes:", indexes);

    // Drop the incorrect 'user_1' unique index if it exists
    if (indexes.user_1) {
      console.log("Dropping incorrect user_1 index...");
      await Cart.collection.dropIndex("user_1");
      console.log("✅ Dropped user_1 index");
    }

    // The correct compound index should already exist, but let's verify
    const updatedIndexes = await Cart.collection.getIndexes();
    console.log("\nIndexes after fix:", updatedIndexes);

    if (updatedIndexes.user_1_productId_1) {
      console.log("✅ Correct compound index exists: user_1_productId_1");
    } else {
      console.log("Creating compound index...");
      await Cart.collection.createIndex({ user: 1, productId: 1 }, { unique: true });
      console.log("✅ Created compound index: user_1_productId_1");
    }

    console.log("\n✅ Cart indexes fixed! Users can now add multiple different items.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

fixCartIndexes();
