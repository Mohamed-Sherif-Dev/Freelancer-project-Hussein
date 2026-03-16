

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { getCategories } from "@/src/services/category.service";

interface Category {
  _id: string;
  name: string;
  image: { url: string }[];
  productCount: number;
  isActive: boolean;
}

interface Props {
  activeId?: string;
  onSelect: (id: string) => void;
}

export default function CategorySidebar({ activeId, onSelect }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data.filter((c: Category) => c.isActive));
    });
  }, []);

  return (
    <aside className="bg-white rounded-xl border md:sticky md:overflow-hidden p-4 w-full sticky top-24">
      <h3 className="font-semibold mb-4">الأقسام</h3>

      <div className="flex gap-4  max-h-[420px] overflow-y-auto pr-1">
        {categories.map((cat) => {
          const image = cat.image?.[0]?.url;

          return (
            <motion.div
              key={cat._id}
              whileHover={{ scale: 1.03 }}
              onClick={() => onSelect(cat._id)}
              className={clsx(
                "relative rounded-xl overflow-hidden w-[220px] h-[130px] flex-shrink-0 cursor-pointer border transition",
                activeId === cat._id
                  ? "ring-2 ring-primary"
                  : "hover:shadow-md"
              )}
            >
              <img
                src={image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-between px-3">
                <span className="text-white font-medium">
                  {cat.name}
                </span>

                <span className="text-white text-xs opacity-80">
                  {cat.productCount} منتج
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </aside>
  );
}