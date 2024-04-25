const Stripe = require("stripe")

const initStripe = () => {
    const apiKey = ("sk_test_51P5cByGJMzMYUy5TK7ZHSDbqsnRrA4d2hLHYUED3YDumMc7eDo6tBVILKONhfSLznMmokHNV72bGRbPxrr6KIGfD00P5I7i61Q")
    if (!apiKey) return
    return new Stripe(apiKey, {
        apiVersion: "2023-10-16"
    })
}

module.exports = initStripe