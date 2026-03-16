"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useCartStore } from "@/src/store/cart.store";
import { Trash2, Plus, Minus } from "lucide-react"; 
import Link from "next/link";

function CartContent() {
  const { items, removeItem, updateQuantity, clear } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold mb-3">السلة فارغة</h2>
        <p className="text-muted">ابدأ بإضافة منتجات</p>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">سلة التسوق</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Products */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white border rounded-xl p-4 shadow-sm"
            >
              <img
                src={item.image}
                className="w-24 h-24 object-cover rounded-lg"
                alt={item.name}
              />

              <div className="flex-1 space-y-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-primary font-bold">
                  {item.price} جنيه
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                    className="p-1 border rounded hover:bg-soft"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="px-3 font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="p-1 border rounded hover:bg-soft"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:opacity-70"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white border rounded-xl p-6 shadow-sm h-fit space-y-4">
          <h2 className="text-xl font-semibold">ملخص الطلب</h2>

          <div className="flex justify-between text-lg font-bold p-3">
            <span>الإجمالي</span>
            <span>{total.toFixed(2)} جنيه</span>
          </div>

          <Link
            href="/checkout"
            className="w-full bg-primary text-white text-center p-3 rounded-xl hover:opacity-90 transition mt-3"
          >
            إكمال الشراء
          </Link>

          <button
            onClick={clear}
            className="w-full text-red-500 text-sm hover:underline mt-8"
          >
            إفراغ السلة
          </button>
        </div>
      </div>
    </section>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartContent />
    </Suspense>
  );
}