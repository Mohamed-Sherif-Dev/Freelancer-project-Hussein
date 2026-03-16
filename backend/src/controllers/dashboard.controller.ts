import { Request , Response } from "express";
import Order from "../models/Order.model";
import Product from "../models/Product.model";
export const getDashboardStats = async (req: Request, res: Response) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);

  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: "pending" });

  const lowStockProducts = await Product.countDocuments({ stock: { $lte: 5 } });

  const latestOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("customerName totalPrice status");

  res.json({
    totalSales: totalSales[0]?.total || 0,
    totalOrders,
    pendingOrders,
    lowStockProducts,
    latestOrders,
  });
};