require("dotenv").config();
const express = require("express")
const cors = require("cors");
const productRouter = require("./routes/productRouter");
const connectDb = require("./config/db");
const categoryRouter = require("./routes/categoryRouter");
const userRouter = require("./routes/userRouter");
const addressRouter = require("./routes/addressRouter");
const cartRouter = require("./routes/cartRouter");
const wishlistRouter = require("./routes/wishlistRouter");
const orderRouter = require("./routes/orderRouter");




connectDb();

const app = express();
const PORT = 5000;

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"));


app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/user',userRouter)
app.use("/api/address", addressRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(PORT, () => {
    console.log(`server is online: http://localhost:${PORT}`);
})