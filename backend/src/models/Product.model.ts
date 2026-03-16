import mongoose, { Document, Schema } from "mongoose";

// Product Interface
export interface IProduct extends Document {
  name: string;
  slug: string;
  price: number;
  category: mongoose.Types.ObjectId;
  costPrice: number;
  stock: number;
  image: { url: string; public_id: string }[];
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Product Schema
const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "اسم المنتج مطلوب"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "وصف المنتج مطلوب"],
    },
    price: {
      type: Number,
      required: [true, "سعر المنتج مطلوب"],
      min: [0, "سعر المنتج يجب أن يكون أكبر من أو يساوي صفر"],
    },
    costPrice: {
      type: Number,
      required: [true, "سعر المنتج مطلوب"],
      min: [0, "سعر المنتج يجب أن يكون أكبر من أو يساوي صفر"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "كمية المنتج يجب أن تكون أكبر من أو تساوي صفر"],
    },
    image: {
      type: [
        {
          url: String,
          public_id: String,
        },
      ],
      default: [],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "التصنيف مطلوب"],
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
ProductSchema.index({ name: 1 });
ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ isActive: 1 });

export default mongoose.model<IProduct>("Product", ProductSchema);
