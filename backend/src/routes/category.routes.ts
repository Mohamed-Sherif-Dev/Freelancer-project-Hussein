import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  toggleCategoryStatus,
  deleteCategory
} from "../controllers/category.controller";
import { protectAdmin } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/uplode.middleware";

const router = express.Router();

// Public
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Admin
router.post("/", upload.single("image"),protectAdmin,  createCategory);
router.put("/:id", protectAdmin, updateCategory);
router.patch("/:id/toggle", protectAdmin, toggleCategoryStatus);
router.delete("/:id", protectAdmin, deleteCategory);

export default router;