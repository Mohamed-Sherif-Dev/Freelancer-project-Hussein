import mongoose, { Schema, Document } from "mongoose";

// Category Intrface
export interface ICategory extends Document {
  name: string;
  slug: string;
  image: { url: string; public_id: string }[];
  productCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Category Schema
const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "اسم الكاتيجوري مطلوب"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      localStorage: true,
    },
    image: [
      {
        url: {
          type: String,
          required: [true, "رابط الصورة مطلوب"],
        },
        public_id: {
          type: String,
          required: [true, "معرف الصورة مطلوب"],
        },
      },
    ],
    productCount: {
      type: Number,
      default: 0,
      min: 0,
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
CategorySchema.index({ name: 1 });
CategorySchema.index({ slug: 1 });

export default mongoose.model<ICategory>("Category", CategorySchema);
