"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Copy, Printer } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const invoiceToken = searchParams.get("token");
  const [copied, setCopied] = useState(false);

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white max-w-lg w-full rounded-2xl shadow-lg p-8 text-center space-y-6"
        >
          <h1 className="text-2xl font-bold mb-1">حدث خطاء</h1>
          <p className="text-gray-500">لا يمكن استخدام هذا الطلب</p>
          <Link
            href="/shop"
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            العودة للمتجر
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleCopy = () => {
    if (!orderId) return;

    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintInvoice = () => {
    if (!orderId) return;
    window.open(`/orders/${orderId}/invoice?token=${invoiceToken}`, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white max-w-lg w-full rounded-2xl shadow-lg p-8 text-center space-y-6"
      >
        <CheckCircle size={70} className="text-green-500 mx-auto" />

        <div>
          <h1 className="text-2xl font-bold mb-1">تم إنشاء الطلب بنجاح 🎉</h1>
          <p className="text-gray-500">
            شكراً لثقتك بنا، سيتم التواصل معك قريباً
          </p>
        </div>

        {orderId && (
          <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
            <span className="font-mono font-semibold text-lg">{orderId}</span>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-primary hover:opacity-80 transition"
            >
              <Copy size={18} />
              {copied ? "تم النسخ" : "نسخ"}
            </button>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={handlePrintInvoice}
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            <Printer size={18} />
            طباعة الفاتورة
          </button>

          <Link
            href="/shop"
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            العودة للمتجر
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}