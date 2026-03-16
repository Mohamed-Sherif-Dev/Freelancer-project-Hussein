"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, BadgeDollarSign, Headphones } from "lucide-react";

const items = [
  {
    id: 1,
    icon: <Truck size={40} />,
    title: "التوصيل سريع",
    description: "نقوم بتوصيل المنتجات في أسرع وقت ممكن",
  },
  {
    id: 2,
    icon: <ShieldCheck size={40} />,
    title: "الضمان",
    description: "منتجات اصليه من الشركه الصناعيه",
  },
  {
    id: 3,
    icon: <BadgeDollarSign size={40} />,
    title: "التخفيضات",
    description: "اسعار تنافسية للمنتجات",
  },
  {
    id: 4,
    icon: <Headphones size={40} />,
    title: "الدعم الفني",
    description: "استفساراتك سيتم الرد عليها في أسرع وقت ممكن",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-center mb-12">لماذا تختارنا؟</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-border rounded-2xl p-7 text-center space-y-4 hover:shadow-md transition"
            >
             <div className="text-primary flex items-center justify-center">
             {item.icon}
             </div>

              
              <h3 className="font-semibold text-lg">{item.title}</h3>

              <p className="text-black/20 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
