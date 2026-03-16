"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-textMain mb-3">
          تواصل معنا
        </h1>
        <p className="text-muted">
          يسعدنا الرد على جميع استفساراتك في أسرع وقت
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">

        {/* Info */}
        <div className="space-y-6">

          <InfoCard
            icon={<Phone />}
            title="الهاتف"
            value="+20 109 000 0000"
          />

          <InfoCard
            icon={<Mail />}
            title="البريد الإلكتروني"
            value="support@stockflow.com"
          />

          <InfoCard
            icon={<MapPin />}
            title="العنوان"
            value="القاهرة – مصر"
          />

          <div className="rounded-2xl overflow-hidden shadow-sm border h-60 bg-soft flex items-center justify-center text-muted">
            خريطة الموقع (يمكن إضافتها لاحقاً)
          </div>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border rounded-2xl p-8 space-y-5 shadow-sm"
        >
          <Input placeholder="الاسم الكامل" />
          <Input placeholder="البريد الإلكتروني" type="email" />
          <Input placeholder="رقم الهاتف" />

          <textarea
            placeholder="اكتب رسالتك..."
            className="w-full border rounded-xl px-4 py-3 h-32 focus:ring-2 focus:ring-primary outline-none resize-none"
          />

          <button
            className="w-full bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            إرسال الرسالة
            <Send size={18} />
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Input({ placeholder, type = "text" }: any) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
    />
  );
}

function InfoCard({ icon, title, value }: any) {
  return (
    <div className="flex items-center gap-4 bg-white border rounded-xl p-4 shadow-sm">
      <div className="bg-primary/10 text-primary p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-muted text-sm">{value}</p>
      </div>
    </div>
  );
}