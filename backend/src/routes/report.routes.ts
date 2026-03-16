import { Router } from "express";
import { getDailyReport , getBestSellingProducts , getDashboardSummary } from "../controllers/report.controller";
import { protectAdmin } from "../middlewares/auth.middleware";


const router = Router();



router.get(
  "/daily",
  protectAdmin,
getDailyReport
);

router.get("/best-selling", getBestSellingProducts);

router.get("/dashboard-summary", protectAdmin, getDashboardSummary);

export default router;