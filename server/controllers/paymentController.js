const crypto = require("crypto");
const Order = require("../models/Order");
const Enrollment = require("../models/Enrollment");

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // ✅ Get order
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ✅ Mark order paid
    order.status = "PAID";
    await order.save();

    // 🔴 THIS WAS MISSING
    await Enrollment.create({
      user: order.user,     
      course: order.course  
    });

    res.json({ message: "Payment verified & enrollment created" });

  } catch (error) {
    console.error("PAYMENT VERIFY ERROR:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};