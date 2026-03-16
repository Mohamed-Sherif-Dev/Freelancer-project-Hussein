import Category from "../models/Category.model";

// Increase Product Count in Category
export const incrementCategoryProductCount = async (categoryId: string) => {
  await Category.findByIdAndUpdate(categoryId, { $inc: { productCount: 1 } });
};

// Decrease Product Count in Category
export const decrementCategoryProductCount = async (categoryId: string) => {
  await Category.findByIdAndUpdate(categoryId, { $inc: { productCount: -1 } });
};
