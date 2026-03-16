import express from "express"
import { getProfitByRange, getTopProducts,  salesTimeline , profitRatio } from "../controllers/reports.controller"
import { protectAdmin } from "../middlewares/auth.middleware";

const router = express.Router();




router.get("/profit", protectAdmin, getProfitByRange);

router.get("/top-products", protectAdmin, getTopProducts);

router.get("/sales-timeline", protectAdmin, salesTimeline);

router.get("/profit-ratio", protectAdmin, profitRatio);
export default router;