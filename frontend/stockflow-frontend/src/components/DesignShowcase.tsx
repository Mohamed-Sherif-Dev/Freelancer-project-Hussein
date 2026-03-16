"use client";
import { motion } from "framer-motion";

export default function DesignShocase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="relative group overflow-hidden rounded-3xl shadow-xl"
        >
          <img
            src="/Kahrba.jpeg"
            alt="Kahrba"
            className="w-full h-[420px] object-cover group-hover:scale-105 transition"
          />

          <div className="absolute inset-0 bg-black/30 flex items-center p-6">
            <h3 className="text-white text-center text-2xl font-bold">
              مستلزمات الكهرباء الحديثة
            </h3>
          </div>
        </motion.div>
        {/* Electric */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative group overflow-hidden rounded-3xl shadow-xl"
        >
          <img
            src="/sbacko.jpeg"
            alt="Kahrba"
            className="w-full h-[420px] object-cover group-hover:scale-105 transition"
          />

          <div className="absolute inset-0 bg-black/30 flex items-center p-6">
            <h3 className="text-white text-2xl font-bold">
              أدوات السباكة الاحترافية
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}