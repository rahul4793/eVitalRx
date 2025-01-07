



const express = require("express");
const { addToCart, checkout } = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.post("/checkout", authMiddleware, checkout); // Add this route for checkout

module.exports = router;
