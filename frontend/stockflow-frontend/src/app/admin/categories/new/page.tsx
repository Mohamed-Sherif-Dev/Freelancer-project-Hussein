"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { createCategory } from "@/src/services/category.service";
import { useRouter } from "next/navigation";

export default function NewCategoryPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handeleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handeleSubmit = async () => {
    if (!name || !slug || !image) {
      toast.error("من فضلك ادخل البيانات اللازمة");
      return;
    }
    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", name);
      data.append("slug", slug);
      data.append("image", image);

      await createCategory(data);
      toast.success("تم اضافة القسم بنجاح");
      router.push("/admin/categories");
    } catch (err) {
      toast.error("فشل اضافة القسم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">✏️ اضافة قسم جديد</h1>
        <p className="text-gray-500 text-sm">
          ادخل البيانات اللازمة لاضافة قسم جديد
        </p>
      </div>

      <label className="block cursor-pointer">
        <input type="file" hidden onChange={handeleImage} />

        <div className="border-2 border-dashed rounded-2xl h-64 flex items-center justify-center overflow-hidden hover:bg-gray-50 transition">
          {preview ? (
            <img
              src={preview}
              className="w-full h-full object-cover"
              alt="preview"
            />
          ) : (
            <span className="text-gray-400">اضغط لرفع صورة التصنيف</span>
          )}
        </div>
      </label>

      {/* Name */}
      <input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
        placeholder="اسم التصنيف (مثال : حمامات)"
      />

      {/* Slug */}
      <input
        name="slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="input"
        placeholder="اسم التصنيف (مثال : حمامات)"
      />

      {/* ِACTION */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={handeleSubmit}
          className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "جاري الاضافة..." : "اضافة القسم"}
        </button>

        <button
          onClick={() => router.back()}
          className="bg-white border border-gray-200 px-6 py-3 rounded-xl hover:opacity-90 disabled:opacity-50"
        >
          ألغاء
        </button>
      </div>
    </div>
  );
}
