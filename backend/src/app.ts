import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import orderRoutes from "./routes/order.routes";
import reportRoutes from "./routes/report.routes";
import dashbordRoutes from "./routes/dashbord.routes";
import reportsRotes from "./routes/reportss.routes";
const app = express();

app.use(cors(
  {
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL || ""
    ],
    credentials: true

  }
));
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/dashbord", dashbordRoutes);
app.use("/api/reportss", reportsRotes);









app.get("/", (req, res) => {
  res.send("StockFlow API is running...");
});

export default app;
