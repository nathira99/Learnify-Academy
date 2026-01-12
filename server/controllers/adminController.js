const Order = require("../models/Order");

exports.getAllPayments = async (req, res) => {
  const orders = await Order.find({ status: "PAID" })
    .populate("user")
    .populate("course")
    .sort({ createdAt: -1 });

  res.json(orders);
};

exports.getRevenueStats = async (req, res) => {
  const orders = await Order.find({ status: "PAID" });

  const totalRevenue = orders.reduce(
    (sum, o) => sum + o.amount,
    0
  );

  res.json({
    totalRevenue,
    totalPayments: orders.length
  });
};