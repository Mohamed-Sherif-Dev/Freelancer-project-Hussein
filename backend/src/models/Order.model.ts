import mongoose, { Schema, Document } from "mongoose";

/* ========= Order Item ========= */
export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

/* ========= Order ========= */
export interface IOrder extends Document {
  customerName: string;
  phone: string;
  items: IOrderItem[];
  invoiceNumber: string;
  totalPrice: number;
  invoiceToken: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    customerName: {
      type: String,
      required: [true, "اسم العميل مطلوب"],
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    invoiceToken: {
      type: String,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);