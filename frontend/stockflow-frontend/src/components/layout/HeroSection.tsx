"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="bg-soft py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            كل مستلزمات الكهرباء والسباكة
            <span className="text-primary">في مكان واحد</span>
          </h1>

          <p className="text-gray-600 text-lg">
            اختار المنتج بسهولة، اطلبه فورًا، واستلم بأسرع وقت
          </p>

          <button className="bg-primary text-white px-6 py-3 rounded-xl text-lg hover:opacity-90 transition">
            تصفح المنتجات
          </button>
        </motion.div>

        {/* Image */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          src="/HeroSection.jpeg"
          loading="lazy"

          height={500}
          className="rounded-2xl shadow-lg"
          alt="tools"
        />
      </div>
    </section>
  );
}
