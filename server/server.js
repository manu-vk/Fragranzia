const express = require("express")
const cors = require("cors");
const productRouter = require("./routes/productRouter");

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json())

app.use('/api/product', productRouter)

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(PORT, () => {
    console.log(`server is online: http://localhost:${PORT}`);
})