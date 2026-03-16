"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addProduct } from "@/src/services/product.service";
import api from "@/src/services/api";

interface Category {
  _id: string;
  name: string;
}

export default function NewProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    costPrice: "",
    stock: "",
    category: "",
  });

  /* ================= FETCH CATEGORIES ================= */

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await api.get("/categories");
      setCategories(res.data.data);
    };

    fetchCategories();
  }, []);

  /* ================= HANDLERS ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category) {
      alert("املأ البيانات الأساسية");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", form.name);
      data.append("slug", generateSlug(form.name));
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("costPrice", form.costPrice);
      data.append("stock", form.stock);
      data.append("category", form.category);

      if (image) data.append("image", image);

      await addProduct(data);

      alert("تم إضافة المنتج بنجاح");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("فشل إضافة المنتج");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <div>
        <h1 className="text-3xl font-bold">➕ إضافة منتج جديد</h1>
        <p className="text-gray-500 text-sm">املأ البيانات بدقة</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 bg-white p-10 rounded-3xl border">

        {/* IMAGE */}

        <label className="cursor-pointer block">
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />

          <div className="border-2 border-dashed rounded-2xl h-72 flex items-center justify-center overflow-hidden hover:border-black transition">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 text-center">
                اضغط لرفع صورة المنتج
              </div>
            )}
          </div>
        </label>

        {/* FORM */}

        <div className="space-y-4">

          <input
            name="name"
            placeholder="اسم المنتج"
            className="input"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="وصف المنتج"
            className="input h-28"
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <input name="price" type="number" placeholder="سعر البيع" className="input" onChange={handleChange} />
            <input name="costPrice" type="number" placeholder="سعر التكلفة" className="input" onChange={handleChange} />
          </div>

          <input
            name="stock"
            type="number"
            placeholder="الكمية"
            className="input"
            onChange={handleChange}
          />

          {/* CATEGORY SELECT */}

          <select
            name="category"
            className="input"
            onChange={handleChange}
          >
            <option value="">اختر التصنيف</option>

            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white w-full py-4 rounded-2xl hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "جاري الحفظ..." : "حفظ المنتج"}
          </button>
        </div>
      </div>
    </div>
  );
}