import { Request, Response } from "express";
import Category from "../models/Category.model";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";


export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "الاسم والslug مطلوبين",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "صورة التصنيف مطلوبة",
      });
    }

    // رفع الصورة
    const result = await uploadToCloudinary(req.file.buffer);

    const category = await Category.create({
      name,
      slug,
      image: [
        {
          url: result.secure_url,
          public_id: result.public_id,
        },
      ],
    });

    res.status(201).json({
      success: true,
      data: category,
      message: "تم إنشاء التصنيف بنجاح",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إنشاء التصنيف",
    });
  }
};
/**
 * @desc    Get all active categories (User + Admin)
 * @route   GET /api/categories
 */
export const getCategories = async (_req: Request, res: Response) => {
  const categories = await Category.find({ isActive: true }).sort({ name: 1 });

  res.status(200).json({
    success: true,
    data: categories,
    message: "تم الحصول على التصنيفات بنجاح"
  });
};

/**
 * @desc    Get single category
 * @route   GET /api/categories/:id
 */
export const getCategoryById = async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "التصنيف غير موجود"
    });
  }

  res.status(200).json({
    success: true,
    data: category,
    message: "تم الحصول على التصنيف بنجاح"
  });
};

/**
 * @desc    Update category (Admin)
 * @route   PUT /api/categories/:id
 */
export const updateCategory = async (req: Request, res: Response) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "التصنيف غير موجود"
    });
  }

  res.status(200).json({
    success: true,
    data: category,
    message: "تم تحديث التصنيف بنجاح"
  });
};

/**
 * @desc    Toggle category active/inactive (Admin)
 * @route   PATCH /api/categories/:id/toggle
 */
export const toggleCategoryStatus = async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "التصنيف غير موجود"
    });
  }

  category.isActive = !category.isActive;
  await category.save();

  res.status(200).json({
    success: true,
    data: category,
    message: "تم تحديث حالة التصنيف بنجاح"
  });
};


export const deleteCategory = async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "التصنيف غير موجود",
    });
  }

  if (category.productCount > 0) {
    return res.status(400).json({
      success: false,
      message: "لا يمكن حذف تصنيف يحتوي على منتجات",
    });
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: "تم حذف التصنيف بنجاح",
  });
};