// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import api from "@/src/services/api";

// export default function EditProductPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: "",
//   });

//   useEffect(() => {
//     loadProduct();
//   }, []);

//   const loadProduct = async () => {
//     const res = await api.get(`/products/${id}`);
//     const p = res.data.data;

//     setForm({
//       name: p.name,
//       description: p.description,
//       price: p.price,
//       stock: p.stock,
//     });

//     if (p.image?.[0]?.url) {
//       setPreview(p.image[0].url);
//     }
//   };

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImage = (e: any) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async () => {
//     const data = new FormData();

//     data.append("name", form.name);
//     data.append("description", form.description);
//     data.append("price", form.price);
//     data.append("stock", form.stock);

//     if (image) data.append("image", image);

//     await api.put(`/products/${id}`, data);

//     router.push("/admin/products");
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">

//       <h1 className="text-2xl font-bold">✏️ تعديل المنتج</h1>

//       <label className="block cursor-pointer">
//         <input type="file" hidden onChange={handleImage} />
//         <div className="border-dashed border-2 h-64 rounded-2xl overflow-hidden flex items-center justify-center">
//           {preview ? (
//             <img src={preview} className="w-full h-full object-cover" />
//           ) : (
//             "رفع صورة جديدة"
//           )}
//         </div>
//       </label>

//       <input name="name" value={form.name} onChange={handleChange} className="input" />
//       <textarea name="description" value={form.description} onChange={handleChange} className="input h-28" />
//       <input name="price" value={form.price} onChange={handleChange} className="input" />
//       <input name="stock" value={form.stock} onChange={handleChange} className="input" />

//       <button
//         onClick={handleSubmit}
//         className="bg-black text-white py-3 rounded-xl w-full"
//       >
//         حفظ التعديل
//       </button>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/src/services/api";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      const p = res.data.data;

      setForm({
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock,
      });

      if (p.image?.[0]?.url) {
        setPreview(p.image[0].url);
      }
    } catch {
      toast.error("فشل تحميل بيانات المنتج");
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("stock", form.stock);

      if (image) data.append("image", image);

      await api.put(`/products/${id}`, data);

      toast.success("✅ تم تعديل المنتج بنجاح");

      setTimeout(() => {
        router.push("/admin/products");
      }, 800);

    } catch (error) {
      toast.error("❌ فشل تعديل المنتج");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">✏️ تعديل المنتج</h1>

      <label className="block cursor-pointer">
        <input type="file" hidden onChange={handleImage} />
        <div className="border-dashed border-2 h-64 rounded-2xl overflow-hidden flex items-center justify-center">
          {preview ? (
            <img src={preview} className="w-full h-full object-cover" />
          ) : (
            "رفع صورة جديدة"
          )}
        </div>
      </label>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="input"
        placeholder="اسم المنتج"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="input h-28"
        placeholder="وصف المنتج"
      />

      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        className="input"
        placeholder="السعر"
      />

      <input
        name="stock"
        value={form.stock}
        onChange={handleChange}
        className="input"
        placeholder="الكمية"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white py-3 rounded-xl w-full disabled:opacity-50"
      >
        {loading ? "جاري الحفظ..." : "حفظ التعديل"}
      </button>
    </div>
  );
}