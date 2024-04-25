const express = require("express")
const cors = require("cors")
const stripe = require("stripe")("sk_test_51P5cByGJMzMYUy5TK7ZHSDbqsnRrA4d2hLHYUED3YDumMc7eDo6tBVILKONhfSLznMmokHNV72bGRbPxrr6KIGfD00P5I7i61Q")

const stripeRouter = require("./routers/stripe.router")

const app = express()

app.use(cors())

app.get("/products", async (req, res) => {
    const products = await stripe.products.list({
        expand: ["data.default_price"]
    });
    res.status(200).json(products)
})

app.use("/payments", stripeRouter)

app.listen(3000, () => console.log("Server is up...."))