const Order = require("../models/Order");
const Product = require("../models/Product");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { productId, paymentStatus, paypalOrderId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newOrder = new Order({
      productId: product._id,
      productName: product.name,
      price: product.price,
      paymentStatus: paymentStatus || "completed",
      paypalOrderId: paypalOrderId || ""
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order" });
  }
};
