"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCategoryById, updateCategory } from "@/src/services/category.service";
import { toast } from "react-hot-toast";

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const cat = await getCategoryById(id as string);

      setName(cat.name);
      setSlug(cat.slug);
      setPreview(cat.image?.[0]?.url || null);
    } catch {
      toast.error("فشل تحميل التصنيف");
    } finally {
      setLoading(false);
    }
  };

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("name", name);
      data.append("slug", slug);
      if (image) data.append("image", image);

      await updateCategory(id as string, data);

      toast.success("تم تحديث التصنيف بنجاح");
      router.push("/admin/categories");
    } catch {
      toast.error("فشل تحديث التصنيف");
    }
  };

  if (loading) return <div className="py-20 text-center">جاري التحميل...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">✏️ تعديل التصنيف</h1>

      <label className="block cursor-pointer">
        <input type="file" hidden onChange={handleImage} />
        <div className="border-dashed border-2 h-56 rounded-xl flex items-center justify-center overflow-hidden">
          {preview ? (
            <img src={preview} className="w-full h-full object-cover" />
          ) : (
            "اختر صورة"
          )}
        </div>
      </label>

      <input
        className="input"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="اسم التصنيف"
      />

      <input
        className="input"
        value={slug}
        onChange={e => setSlug(e.target.value)}
        placeholder="Slug"
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white py-3 rounded-xl w-full"
      >
        حفظ التعديل
      </button>
    </div>
  );
}