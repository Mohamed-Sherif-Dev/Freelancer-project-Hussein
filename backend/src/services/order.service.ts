
import mongoose from "mongoose";
import Order from "../models/Order.model";
import Product from "../models/Product.model";

export const createOrder = async (data: any) => {
  const { customerName, phone, items, invoiceToken } = data;

  if (!items || items.length === 0) {
    throw new Error("الطلب فارغ");
  }

  let totalPrice = 0;

  for (const item of items) {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new Error("منتج غير موجود");
    }

    if (product.stock < item.quantity) {
      throw new Error(`الكمية غير متوفرة للمنتج: ${product.name}`);
    }

    totalPrice += product.price * item.quantity;

    item.name = product.name;
    item.price = product.price;
  }

  const lastOrder = await Order.findOne({
    invoiceNumber: { $exists: true }
  }).sort({ createdAt: -1 });

  let nextInvoiceNumber = "INV-1000";

  if (lastOrder && lastOrder.invoiceNumber) {
    const lastNumber = Number(lastOrder.invoiceNumber.split("-")[1]);
    nextInvoiceNumber = `INV-${lastNumber + 1}`;
  }

  const order = await Order.create({
    customerName,
    phone,
    invoiceNumber: nextInvoiceNumber,
    invoiceToken,
    items,
    totalPrice,
  });

  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity },
    });
  }

  return order;
};

export const updateOrderStatus = async (orderId: string, newstatus: string) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new Error("معرف الطلب غير صالح");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("الطلب غير موجود");
  }

  if (order.status === "delivered") {
    throw new Error("لا يمكن تحديث حالة الطلب الذي تم تسليمه");
  }

  const allowedStatuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!allowedStatuses.includes(newstatus)) {
    throw new Error("حالة الطلب غير صالحة");
  }

  if (newstatus === "cancelled" && order.status !== "cancelled") {
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }
  }

  order.status = newstatus as any;
  await order.save();

  return order;
};

export const getOrders = async (query: any): Promise<{
  orders: any[];
  total: number;
  page: number;
  pages: number;
}> => {
  const filters: any = {};

  if (query.status) {
    filters.status = query.status;
  }

  if (query.serch) {
    filters.$or = [
      { customerName: { $regex: query.serch, $options: "i" } },
      { phone: { $regex: query.serch, $options: "i" } },
    ];
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const skip = (page - 1) * limit;

  const orders = await Order.find(filters)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("items.product", "name price");

  const total = await Order.countDocuments(filters);

  return {
    orders,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

export const getOrderInvoice = async (orderId: string) => {
  const order = await Order.findById(orderId)
    .populate("items.product", "name price");

  if (!order) {
    throw new Error("الطلب غير موجود");
  }

  return {
    invoiceNumber: order.invoiceNumber,
    customerName: order.customerName,
    phone: order.phone,
    date: order.createdAt,
    status: order.status,
    items: order.items.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    })),
    totalPrice: order.totalPrice,
  };
};