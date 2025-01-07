const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("products.product");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    let total = 0;
    const items = [];
    for (let i = 0; i < cart.products.length; i++) {
      const product = cart.products[i].product;
      const quantity = cart.products[i].quantity;
      total += product.price * quantity;
      items.push({ product: product._id, quantity, price: product.price });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      total,
    });

    cart.products = [];
    await cart.save();

    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
