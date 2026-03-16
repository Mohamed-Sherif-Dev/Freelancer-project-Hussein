"use client";

import { motion } from "framer-motion";

interface Props {
  name: string;
  image: string;
}

export default function CategoryCard({ name, image }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="relative rounded-2xl overflow-hidden shadow-sm cursor-pointer"
    >
      <img
        src={image}
        className="w-full h-48 object-cover"
        alt={name}
      />

      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <span className="text-white text-xl font-semibold">
          {name}
        </span>
      </div>
    </motion.div>
  );
}
