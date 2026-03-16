import { Response, Request } from "express";
import OrderModel from "../models/Order.model";
import mongoose from "mongoose";


export const getProfitByRange = async (req: Request, res: Response) => {
    const { range } = req.query;

    let startData = new Date();

    if (range === "daily") {
        startData.setHours(0, 0, 0, 0);
    }

    if (range === "weekly") {
        startData.setDate(startData.getDate() - 7);
    }

    if (range === "monthly") {
        startData.setMonth(startData.getMonth() - 1);
    }


    const profit = await OrderModel.aggregate([
        {
            $match: {
                status: { $in: ["completed", "delivered"] },
                createdAt: { $gte: startData }
            },
        },
        {
            $group: {
                _id: null,
                totalProfit: { $sum: "$totalPrice" },
                totalOrders: { $sum: 1 }
            },
        },
    ]);

    res.status(200).json({
        success: true,
        range,
        totalProfit: profit[0]?.totalProfit || 0,
        totalOrders: profit[0]?.totalOrders || 0
    })

}


export const getTopProducts = async (req: Request, res: Response) => {
    const topProducts = await OrderModel.aggregate([
        // 1 - Only completed and delivered orders
        {
            $match: {
                status: { $in: ["completed", "delivered"] }
            },
        },
        // 2 - Exolode OrderItems
        {
            $unwind: "$orderItems"
        },
        // 3 - Group by product 
        {
            $group: {
                _id: "$orderItems.product",
                totalSold: { $sum: "$orderItems.quantity" },
                totalRevenue: {
                    $sum: {
                        $multiply: ["$orderItems.price", "$orderItems.quantity"]
                    },
                },
            },
        },

        // 4- Sort Descending
        { $sort: { totalSold: -1 } },

        // Limit (Top 5)
        { $limit: 5 },

        // 6 - Lookup Product details
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product",
            },
        },

        // 7 - Final Shop
        {
            $project: {
                _id: 1,
                ProduactId: "$product._id",
                name: "$product.name",
                image: "$product.image",
                price: "$product.price",
                totalSold: 1,
                totalRevenue: 1
            },
        },
    ]);

    res.status(200).json({
        success: true,
        count: topProducts.length,
        data: topProducts
    })
}


export const salesTimeline = async (req: Request, res: Response) => {
    const { range = "weekly" } = req.query;

    let groupFrmat: any;

    switch (range) {
        case "daily":
            groupFrmat = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
            break;

        case "monthly":
            groupFrmat = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
            break;

        default: // weekly (by day insids last 7 days)
            groupFrmat = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    }

    const data = await OrderModel.aggregate([
        {
            $match: {
                status: "delivered"
            },
        },
        {
            $group: {
                _id: groupFrmat,
                totalSales: { $sum: "$totalPrice" },
                orderCount: { $sum: 1 }
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ]);



    res.json({
        success: true,
        range,
        data: data.map(d => ({
            date: d._id,
            totalSales: d.totalSales,
            orderCount: d.orderCount
        }))
    })
}


export const profitRatio = async (req: Request, res: Response) => {
    const stats = await OrderModel.aggregate([
        {
            $match: { status: "delivered" }
        },
        {
            $group: {
                _id: null,
                totalProfit: { $sum: "$totalPrice" },
                totalOrders: { $sum: 1 }
            }
        }
    ])

    const data = stats[0] || { totalProfit: 0, totalOrders: 0 };

    const avgProfitPerOrder =
        data.totalOrders === 0 ? 0 : data.totalProfit / data.totalOrders;

    res.json({
        success: true,
        totalProfit: data.totalProfit,
        totalOrders: data.totalOrders,
        avgProfitPerOrder: Number(avgProfitPerOrder.toFixed(2))
    })
}