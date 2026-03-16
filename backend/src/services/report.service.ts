import Order from "../models/Order.model";
import Product from "../models/Product.model";
import Category from "../models/Category.model";
export const getDailyReport = async (date?: string) => {
  const targetDate = date ? new Date(date) : new Date();

  const start = new Date(targetDate.setHours(0, 0, 0, 0));
  const end = new Date(targetDate.setHours(23, 59, 59, 999));

  const orders = await Order.find({
    createdAt: { $gte: start, $lte: end },
    status: { $ne: "cancelled" },
  });

  let totalSales = 0;
  let totalCost = 0;

  for (const order of orders) {
    totalSales += order.totalPrice;

    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        totalCost += product.costPrice * item.quantity;
      }
    }
  }

  const profit = totalSales - totalCost;

  return {
    date: start.toLocaleDateString("ar-EG"),
    totalOrders: orders.length,
    totalSales,
    totalCost,
    profit,
  };
};

export const  getBestSellingProducts = async () =>{
  const orders = await Order.find({
    status: "delivered",
  })

  const salesMap : any = {};

  for(const order of orders){
    for(const item of order.items){
      const id = item.product.toString();

      if(!salesMap[id]){
        salesMap[id] = 0;
      }

      salesMap[id] += item.quantity;
    }
  }

  const results = [];
  for(const productId in salesMap){
    const product = await Product.findById(productId);

    if(product){
      results.push({
        name: product.name,
        sales: salesMap[productId]
      })
    }
  }

  return results.sort((a, b) => b.sales - a.sales);
}



export const getDashboardSummary = async () => {

  const [
    totalOrders,
    productsCount,
    categoriesCount,
    revenueAgg
  ] = await Promise.all([
    Order.countDocuments(),
    Product.countDocuments(),
    Category.countDocuments(),
    Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" }
        }
      }
    ])
  ]);

  const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

  // 🗓️ Today range
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todayOrders = await Order.countDocuments({
    createdAt: { $gte: startOfDay, $lte: endOfDay }
  });

  const todayRevenueAgg = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      }
    },
    {
      $group: {
        _id: null,
        todayRevenue: { $sum: "$totalPrice" }
      }
    }
  ]);

  const todayRevenue = todayRevenueAgg[0]?.todayRevenue || 0;

  return {
    totalOrders,
    totalRevenue,
    productsCount,
    categoriesCount,
    todayOrders,
    todayRevenue
  };
};
