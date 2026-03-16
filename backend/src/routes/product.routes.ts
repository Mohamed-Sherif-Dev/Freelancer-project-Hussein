import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { protectAdmin } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/uplode.middleware";

const router = express.Router();

// Public (User)
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin
router.post("/", upload.single("image"), protectAdmin, createProduct);
router.put("/:id", upload.single("image"), protectAdmin, updateProduct);
router.delete("/:id", protectAdmin, deleteProduct);

export default router;
