const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, products: [{ product: productId, quantity }] });
    } else {
      const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
      if (productIndex === -1) {
        cart.products.push({ product: productId, quantity });
      } else {
        cart.products[productIndex].quantity += quantity;
      }
    }
    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.checkout = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const productIndex = cart.products.findIndex((p) => p.product._id.toString() === productId);

    if (productIndex === -1) {
      return res.status(400).json({ success: false, message: "Product not found in cart" });
    }

    const cartProduct = cart.products[productIndex];
    const cartQuantity = cartProduct.quantity;

    if (!cartProduct.product || !cartProduct.product._id) {
      return res.status(400).json({ success: false, message: "Product data is incomplete" });
    }

    if (cartQuantity < quantity) {
      return res.status(400).json({ success: false, message: "Not enough quantity in cart" });
    }

    cart.products[productIndex].quantity -= quantity;

    if (cart.products[productIndex].quantity === 0) {
      cart.products.splice(productIndex, 1);
    }

    await cart.save();

    const product = cartProduct.product;
    const order = await Order.create({
      user: req.user.id,
      items: [{ product: product._id, quantity, price: product.price }],
      total: product.price * quantity,
    });

    res.status(200).json({ success: true, message: "Checkout successful", order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
