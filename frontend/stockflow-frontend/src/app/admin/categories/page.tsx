"use client";

import { useEffect, useState } from "react";
import {
  getCategories,
  deleteCategory,
  toggleCategory,
} from "@/src/services/category.service";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type Category = {
  _id: string;
  name: string;
  slug: string;
  productCount: number;
  isActive: boolean;
  image:{
    url: string;
    public_id: string;
  }[]
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      toast.error("فشل تحميل التصنيفات");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف التصنيف؟")) return;

    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(c => c._id !== id));
      toast.success("تم حذف التصنيف بنجاح");
    } catch {
      toast.error("لا يمكن حذف التصنيف");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const updated = await toggleCategory(id);
      setCategories(prev =>
        prev.map(c => (c._id === id ? updated : c))
      );
      toast.success("تم تحديث الحالة");
    } catch {
      toast.error("فشل تحديث الحالة");
    }
  };



  if (loading)
    return <div className="py-20 text-center text-gray-500">جارِ التحميل...</div>;

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">📂 التصنيفات</h1>
          <p className="text-gray-500 text-sm">إدارة تصنيفات المتجر</p>
        </div>

        <button
          onClick={() => router.push("/admin/categories/new")}
          className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90"
        >
          + إضافة تصنيف
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div
            key={cat._id}
            className="bg-white rounded-2xl shadow-sm border overflow-hidden"
          >
            <div className="h-40 bg-gray-100">
              {cat.image?.[0]?.url  && (
                <img
                  src={cat.image[0].url}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-semibold">{cat.name}</h3>
              <p className="text-xs text-gray-500">{cat.slug}</p>
              <p className="text-sm">
                المنتجات: {cat.productCount}
              </p>

              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => handleToggle(cat._id)}
                  className={`px-3 py-1 text-xs rounded-full ${
                    cat.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {cat.isActive ? "مفعل" : "غير مفعل"}
                </button>

                <div className="flex gap-2 text-sm">
                  <button
                    onClick={() =>
                      router.push(`/admin/categories/${cat._id}`)
                    }
                    className="border px-3 py-1 rounded-lg hover:bg-gray-100"
                  >
                    تعديل
                  </button>

                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="text-gray-400 col-span-full text-center py-20">
            لا يوجد تصنيفات بعد
          </div>
        )}
      </div>
    </div>
  );
}
