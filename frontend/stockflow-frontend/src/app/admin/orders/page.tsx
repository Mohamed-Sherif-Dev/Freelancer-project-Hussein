
// "use client";

// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   getOrders,
//   updateOrderStatus,
// } from "../../../services/order.service";

// type Order = {
//   _id: string;
//   customerName: string;
//   totalPrice: number;
//   status: string;
//   createdAt: string;
// };

// const statusStyles: Record<string, string> = {
//   pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
//   processing: "bg-blue-100 text-blue-700 border-blue-300",
//   shipped: "bg-purple-100 text-purple-700 border-purple-300",
//   delivered: "bg-green-100 text-green-700 border-green-300",
//   canceled: "bg-red-100 text-red-700 border-red-300",
// };

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingId, setUpdatingId] = useState<string | null>(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const data = await getOrders();
//       const list = Array.isArray(data) ? data : data.orders;
//       setOrders(list || []);
//     } catch {
//       setError("حدث خطأ أثناء تحميل الطلبات");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (id: string, status: string) => {
//     try {
//       setUpdatingId(id);

//       await updateOrderStatus(id, status);

//       setOrders((prev) =>
//         prev.map((o) =>
//           o._id === id ? { ...o, status } : o
//         )
//       );

//       toast.success("تم تحديث الحالة بنجاح ✅");
//     } catch {
//       toast.error("فشل تحديث الحالة ❌");
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   if (loading)
//     return (
//       <div className="py-20 text-center text-gray-400 animate-pulse">
//         جارِ تحميل الطلبات...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="py-20 text-center text-red-500">
//         {error}
//       </div>
//     );

//   if (!orders.length)
//     return (
//       <div className="py-20 text-center text-gray-400">
//         لا توجد طلبات بعد
//       </div>
//     );

//   return (
//     <div className="space-y-6">

//       <Toaster position="top-right" />

//       <div>
//         <h1 className="text-2xl font-bold">📦 إدارة الطلبات</h1>
//         <p className="text-gray-500 text-sm">
//           تحكم كامل في جميع الطلبات والفواتير
//         </p>
//       </div>

//       <div className="bg-white rounded-2xl shadow overflow-hidden">

//         <table className="w-full text-sm">

//           <thead className="bg-gray-50 text-gray-600">
//             <tr>
//               <th className="p-4 text-right">العميل</th>
//               <th className="p-4 text-right">السعر</th>
//               <th className="p-4 text-right">الحالة</th>
//               <th className="p-4 text-right">التاريخ</th>
//               <th className="p-4 text-right">الإجراءات</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr
//                 key={order._id}
//                 className="border-t hover:bg-gray-50 transition"
//               >
//                 <td className="p-4 font-medium">
//                   {order.customerName}
//                 </td>

//                 <td className="p-4 font-semibold">
//                   {order.totalPrice} ج
//                 </td>

//                 <td className="p-4">
//                   <select
//                     value={order.status}
//                     disabled={updatingId === order._id}
//                     onChange={(e) =>
//                       handleStatusChange(
//                         order._id,
//                         e.target.value
//                       )
//                     }
//                     className={`px-3 py-1 rounded-full text-xs font-semibold border outline-none transition
//                       ${statusStyles[order.status]}
//                       ${updatingId === order._id && "opacity-60"}
//                     `}
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="processing">Processing</option>
//                     <option value="shipped">Shipped</option>
//                     <option value="delivered">Delivered</option>
//                     <option value="canceled">Canceled</option>
//                   </select>
//                 </td>

//                 <td className="p-4 text-gray-500">
//                   {new Date(order.createdAt).toLocaleDateString()}
//                 </td>

//                 <td className="p-4 flex gap-2">

//                   {/* صفحة الفاتورة */}
//                   <button
//                     onClick={() =>
//                       window.open(
//                         `/admin/orders/${order._id}/invoice`,
//                         "_blank"
//                       )
//                     }
//                     className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs hover:opacity-90 transition"
//                   >
//                     فاتورة
//                   </button>

//                   {/* PDF من السيرفر */}
//                   <button
//                     onClick={() =>
//                       window.open(
//                         `http://localhost:5000/api/orders/${order._id}/invoice/pdf`,
//                         "_blank"
//                       )
//                     }
//                     className="px-3 py-1 rounded-lg bg-gray-900 text-white text-xs hover:opacity-90 transition"
//                   >
//                     PDF
//                   </button>

//                 </td>
//               </tr>
//             ))}
//           </tbody>

//         </table>

//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  getOrders,
  updateOrderStatus,
} from "../../../services/order.service";

type Order = {
  _id: string;
  customerName: string;
  totalPrice: number;
  status: string;
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  processing: "bg-blue-100 text-blue-700 border-blue-300",
  shipped: "bg-purple-100 text-purple-700 border-purple-300",
  delivered: "bg-green-100 text-green-700 border-green-300",
  canceled: "bg-red-100 text-red-700 border-red-300",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      const list = Array.isArray(data) ? data : data.orders;
      setOrders(list || []);
    } catch {
      setError("حدث خطأ أثناء تحميل الطلبات");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      setUpdatingId(id);

      await updateOrderStatus(id, status);

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status } : o
        )
      );

      toast.success("تم تحديث الحالة بنجاح ✅");
    } catch {
      toast.error("فشل تحديث الحالة ❌");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return (
      <div className="py-20 text-center text-gray-400 animate-pulse">
        جارِ تحميل الطلبات...
      </div>
    );

  if (error)
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    );

  if (!orders.length)
    return (
      <div className="py-20 text-center text-gray-400">
        لا توجد طلبات بعد
      </div>
    );

  return (
    <div className="space-y-6">

      <Toaster position="top-right" />

      <div>
        <h1 className="text-2xl font-bold">📦 إدارة الطلبات</h1>
        <p className="text-gray-500 text-sm">
          تحكم كامل في جميع الطلبات والفواتير
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4 text-right">العميل</th>
              <th className="p-4 text-right">السعر</th>
              <th className="p-4 text-right">الحالة</th>
              <th className="p-4 text-right">التاريخ</th>
              <th className="p-4 text-right">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">
                  {order.customerName}
                </td>

                <td className="p-4 font-semibold">
                  {order.totalPrice} ج
                </td>

                <td className="p-4">
                  <select
                    value={order.status}
                    disabled={updatingId === order._id}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value
                      )
                    }
                    className={`px-3 py-1 rounded-full text-xs font-semibold border outline-none transition
                      ${statusStyles[order.status]}
                      ${updatingId === order._id && "opacity-60 cursor-not-allowed"}
                    `}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>

                <td className="p-4 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4 flex gap-2">

                  {/* صفحة الفاتورة داخل الموقع */}
                  <button
                    onClick={() =>
                      window.open(
                        `/admin/orders/${order._id}/invoice`,
                        "_blank"
                      )
                    }
                    className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs hover:opacity-90 transition"
                  >
                    عرض الفاتورة
                  </button>

                  {/* تحميل + طباعة PDF */}
                  <button
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/api/orders/${order._id}/invoice/pdf`,
                        "_blank"
                      )
                    }
                    className="px-3 py-1 rounded-lg bg-gray-900 text-white text-xs hover:opacity-90 transition"
                  >
                    PDF / طباعة
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}