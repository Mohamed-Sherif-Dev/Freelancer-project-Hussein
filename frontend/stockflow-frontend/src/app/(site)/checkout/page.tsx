

"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useCartStore } from "@/src/store/cart.store";
import { useRouter } from "next/navigation";
import { createOrder } from "@/src/services/order.service";

export default function CheckoutPage() {
  const { items } = useCartStore();
  const clearCart = useCartStore((state) => state.clear);
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = items.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );

  const handeleSubmit = async () => {
    if (!customerName || !customerPhone || !customerAddress) {
      setError("من فضلك ادخل البيانات اللازمة");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await createOrder({
        customerName,
        phone: customerPhone,
        items: items.map((i) => ({
          product: i.id,
          quantity: i.quantity,
        })),
      });

      const orderNumber = res.data.invoiceNumber;
      const invoiceToken = res.data.invoiceToken;

      clearCart();
      router.push(`/order-success?order=${orderNumber}&token=${invoiceToken}`);

    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
        "حدث خطأ أثناء إنشاء الطلب"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
      
      {/* Form */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="text-xl font-bold mb-4">بيانات العميل</h2>

        <input
          placeholder="الاسم بالكامل"
          className="w-full border rounded-lg p-3 mb-3 focus:ring-2 focus:ring-primary outline-none"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <input
          placeholder="رقم الهاتف"
          className="w-full border rounded-lg p-3 mb-3 focus:ring-2 focus:ring-primary outline-none"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
        />

        <textarea
          placeholder="العنوان"
          className="w-full border rounded-lg p-3 mb-3 focus:ring-2 focus:ring-primary outline-none"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          onClick={handeleSubmit}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "جاري التأكيد..." : "تأكيد الطلب"}
        </button>
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>

        {items.map((item) => (
          <div key={item.id} className="flex justify-between mb-4">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span className="font-semibold">
              {item.price * item.quantity} جنيه
            </span>
          </div>
        ))}

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-lg">
          <span>المجموع</span>
          <span>{totalPrice} جنيه</span>
        </div>
      </div>
    </div>
  );
}