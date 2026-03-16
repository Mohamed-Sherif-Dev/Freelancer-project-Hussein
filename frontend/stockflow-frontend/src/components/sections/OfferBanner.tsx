"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function OfferBranner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl  bg-[#111827] from-primary to-primary/80 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        {/* Text */}
        <div className="space-y-3 text-center md:text-right">
          <h2 className="text-2xl md:text-3xl font-bold">
            عروض خاصة علي ادوات الكهرباء والسباكة
          </h2>
          <p className=" opacity-90">
            اختار المنتج بسهولة، اطلبه فورًا، واستلم بأسرع وقت
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/shop"
          className="bg-black text-primary font-semibold px-6 py-3 rounded-full hover:bg-primary hover:text-white transition"
        >
          تصفح المتجر
        </Link>
      </motion.div>
    </section>
  );
}
