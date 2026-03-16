// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getProducts, deleteProduct } from "@/src/services/product.service";

// type Product = {
//   _id: string;
//   name: string;
//   price: number;
//   stock: number;
//   image?: { url: string; public_id: string }[];
//   description: string;
//   createdAt: string;
// };

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       const data = await getProducts({ limit: 100 });
//       setProducts(data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("هل انت متأكد من حذف المنتج؟")) return;
//     await deleteProduct(id);
//     setProducts(prev => prev.filter(p => p._id !== id));
//   };

//   const stockStyle = (stock: number) => {
//     if (stock === 0) return "bg-red-100 text-red-700";
//     if (stock <= 10) return "bg-yellow-100 text-yellow-700";
//     return "bg-green-100 text-green-700";
//   };

//   if (loading)
//     return <div className="py-20 text-center text-gray-500">جاري التحميل...</div>;

//   return (
//     <div className="space-y-6">

//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold">📦 المنتجات</h1>
//           <p className="text-gray-500 text-sm">إدارة جميع منتجات المتجر</p>
//         </div>

//         <button
//           onClick={() => router.push("/admin/products/new")}
//           className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90"
//         >
//           + إضافة منتج جديد
//         </button>
//       </div>

//       <div className="bg-white rounded-2xl shadow overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-gray-600">
//             <tr>
//               <th className="p-4 text-right">الصورة</th>
//               <th className="p-4 text-right">الاسم</th>
//               <th className="p-4 text-right">السعر</th>
//               <th className="p-4 text-right">الكمية</th>
//               <th className="p-4 text-right">الحالة</th>
//               <th className="p-4 text-right">الإجراءات</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map(p => (
//               <tr key={p._id} className="border-t hover:bg-gray-50">

//                 <td className="p-4">
//                   {p.image ? (
//                     <img
//                       src={p.image?[0]?.url}
//                       className="w-12 h-12 rounded-xl object-cover"
//                     />
//                   ) : (
//                     <div className="w-12 h-12 bg-gray-200 rounded-xl" />
//                   )}
//                 </td>

//                 <td className="p-4 font-medium">{p.name}</td>
//                 <td className="p-4">{p.price} ج</td>
//                 <td className="p-4">{p.stock}</td>

//                 <td className="p-4">
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stockStyle(p.stock)}`}>
//                     {p.stock === 0 ? "نفد" : p.stock <= 10 ? "قليل" : "متوفر"}
//                   </span>
//                 </td>

//                 <td className="p-4 flex gap-2">
//                   <button className="border px-3 py-1 rounded-lg hover:bg-gray-100">
//                     تعديل
//                   </button>

//                   <button
//                     onClick={() => handleDelete(p._id)}
//                     className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200"
//                   >
//                     حذف
//                   </button>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {products.length === 0 && (
//           <div className="py-20 text-center text-gray-400">
//             لا توجد منتجات بعد
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProducts, deleteProduct } from "@/src/services/product.service";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  createdAt: string;
  image?: {
    url: string;
    public_id: string;
  }[];
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts({ limit: 100 });
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل انت متأكد من حذف المنتج؟")) return;
    await deleteProduct(id);
    setProducts(prev => prev.filter(p => p._id !== id));
  };

  const stockStyle = (stock: number) => {
    if (stock === 0) return "bg-red-100 text-red-700";
    if (stock <= 10) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        جاري التحميل...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">📦 المنتجات</h1>
          <p className="text-gray-500 text-sm">
            إدارة جميع منتجات المتجر
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/products/new")}
          className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90"
        >
          + إضافة منتج جديد
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4 text-right">الصورة</th>
              <th className="p-4 text-right">الاسم</th>
              <th className="p-4 text-right">السعر</th>
              <th className="p-4 text-right">الكمية</th>
              <th className="p-4 text-right">الحالة</th>
              <th className="p-4 text-right">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-t hover:bg-gray-50">

                {/* IMAGE */}

                <td className="p-4">
                  {p.image?.[0]?.url ? (
                    <img
                      src={p.image[0].url}
                      alt={p.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                  )}
                </td>

                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4">{p.price} ج</td>
                <td className="p-4">{p.stock}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${stockStyle(
                      p.stock
                    )}`}
                  >
                    {p.stock === 0
                      ? "نفد"
                      : p.stock <= 10
                      ? "قليل"
                      : "متوفر"}
                  </span>
                </td>

                <td className="p-4 flex gap-2">
                  <button onClick={() => router.push(`/admin/products/${p._id}/edit`)} className="border px-3 py-1 rounded-lg hover:bg-gray-100">
                    تعديل
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200"
                  >
                    حذف
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            لا توجد منتجات بعد
          </div>
        )}
      </div>
    </div>
  );
}