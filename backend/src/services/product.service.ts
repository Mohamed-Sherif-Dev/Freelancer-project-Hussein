import Product from "../models/Product.model";
import {
  incrementCategoryProductCount,
  decrementCategoryProductCount,
} from "./category.service";
import slugify from "slugify";
// Create Product
export const createProduct = async (productData: any) => {
  productData.slug = slugify(productData.name);


  const product = await Product.create(
    productData
  );

  await incrementCategoryProductCount(product.category.toString());

  return product;
};

// Delete Product
export const deleteProductById = async (productId: string) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("المنتج غير موجود");
  }

  await Product.findByIdAndDelete(productId);

  await decrementCategoryProductCount(product.category.toString());
};

// Update Product
export const updateProductById = async (
  productId: string,
  updateData: any
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("المنتج غير موجود");
  }

  // ✅ حماية كاملة من undefined
  if (
    updateData.category &&
    product.category &&
    updateData.category.toString() !== product.category.toString()
  ) {
    await decrementCategoryProductCount(product.category.toString());
    await incrementCategoryProductCount(updateData.category.toString());
  }

  // ✅ لا تمسح الصورة لو مش مبعوتة
  if (!updateData.image) {
    delete updateData.image;
  }

  Object.assign(product, updateData);


  await product.save();

  return product;
};

// Get Products
export const getProducts = async (query: any) => {
  const filters: any = { isActive: true };

  if (query.category) {
    filters.category = query.category;
  }

  if (query.search) {
    filters.name = { $regex: query.search, $options: "i" };
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const skip = (page - 1) * limit;

  const products = await Product.find(filters)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return products;
};

// Get Product By ID
export const getProductById = async (id: string) => {
  const product = await Product.findById(id).populate("category");

  if (!product) {
    throw new Error("المنتج غير موجود");
  }

  return product;
};