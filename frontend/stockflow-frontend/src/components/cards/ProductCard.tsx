"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import clsx from "clsx";
import { useCartStore } from "@/src/store/cart.store";

interface Props {
  _id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  isNew?: boolean;
  description: string;
}

export default function ProductCard({
  _id,
  name,
  price,
  image,
  stock,
  description,
  isNew = false,
}: Props) {
  const outOfStock = stock <= 0;
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative bg-white rounded-2xl shadow-sm border border-border overflow-hidden"
    >
      {/* Badges */}
      {isNew && !outOfStock && (
        <span className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full z-10">
          جديد
        </span>
      )}

      {outOfStock && (
        <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-2 py-1 rounded-full z-10">
          نفد
        </span>
      )}

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-soft">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-textMain line-clamp-2">{name}</h3>

        <p className="text-primary font-bold text-lg">{price} جنيه</p>

        <p className="text-sm text-blue-400 text-muted line-clamp-2">
          {description}
        </p>

        <p className="text-sm text-muted">المتاح: {stock}</p>

        <button
          onClick={() =>
            addItem({
              id: String(_id),
              name,
              price,
              image,
              stock,
              quantity: 1,
            })
          }
          disabled={outOfStock}
          className={clsx(
            "w-full mt-3 py-2 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer",
            outOfStock
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-primary text-white hover:opacity-90 active:scale-[0.98] cursor-context-menu",
          )}
        >
          <ShoppingCart size={18} />
          {outOfStock ? "غير متوفر" : "أضف للسلة"}
        </button>
      </div>
    </motion.div>
  );
}
