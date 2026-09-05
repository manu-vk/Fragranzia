// MANUAL FIX - Run these commands in MongoDB Compass or mongo shell
// If fix-cart-index.js doesn't work, use this

// Step 1: Switch to fragranzia database
use fragranzia

// Step 2: DROP the entire carts collection (removes all corrupted data and indexes)
db.carts.drop()

// Step 3: Verify it's gone
db.getCollectionNames()  // carts should NOT appear in the list

// Step 4: Exit and restart the Node.js server
// The server will automatically recreate the collection with correct indexes

// ============================================
// How to use in MongoDB Compass:
// ============================================
// 1. Open MongoDB Compass
// 2. Click on "fragranzia" database
// 3. Right-click on "carts" collection
// 4. Select "Drop Collection"
// 5. Click "Drop" to confirm
// 6. Close Compass
// 7. In terminal: npm start

// ============================================
// How to use in MongoDB shell (mongo CLI):
// ============================================
// 1. Open Command Prompt/PowerShell
// 2. Run: mongosh
// 3. Paste the commands above
// 4. Press Enter
