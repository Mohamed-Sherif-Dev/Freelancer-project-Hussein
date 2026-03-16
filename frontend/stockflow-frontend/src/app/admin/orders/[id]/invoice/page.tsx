





// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { getInvoice } from "@/src/services/invoice.service";

// type Item = {
//   name: string;
//   price: number;
//   quantity: number;
//   total: number;
// };

// type Invoice = {
//   invoiceNumber: string;
//   customerName: string;
//   phone: string;
//   date: string;
//   items: Item[];
// };

// export default function InvoicePage() {
//   const { id } = useParams();
//   const [invoice, setInvoice] = useState<Invoice | null>(null);

//   useEffect(() => {
//     loadInvoice();
//   }, []);

//   const loadInvoice = async () => {
//     const res = await getInvoice(id as string);
//     setInvoice(res.data);
//   };

//   if (!invoice) return <p className="p-10">جاري تحميل الفاتورة...</p>;

//   const total = invoice.items.reduce((s, i) => s + i.total, 0);

//   return (
//     <div className="bg-gray-100 min-h-screen p-8 flex justify-center">

//       {/* ==== PRINT AREA ==== */}
//       <div
//         id="invoice-print"
//         className="bg-white w-full max-w-4xl rounded-xl shadow p-8 space-y-6"
//       >

//         {/* Header */}
//         <div className="flex justify-between border-b pb-4">
//           <div>
//             <h1 className="text-3xl font-bold text-blue-600">StockFlow</h1>
//             <p className="text-gray-500">متجرك الذكي</p>
//           </div>

//           <div className="text-sm space-y-1">
//             <p>رقم الفاتورة: {invoice.invoiceNumber}</p>
//             <p>التاريخ: {new Date(invoice.date).toLocaleDateString()}</p>
//           </div>
//         </div>

//         {/* Customer */}
//         <div className="grid grid-cols-2 gap-4 text-sm">
//           <p><strong>العميل:</strong> {invoice.customerName}</p>
//           <p><strong>الهاتف:</strong> {invoice.phone}</p>
//         </div>

//         {/* Items */}
//         <table className="w-full border text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2 text-right">المنتج</th>
//               <th className="border p-2">السعر</th>
//               <th className="border p-2">الكمية</th>
//               <th className="border p-2">الإجمالي</th>
//             </tr>
//           </thead>

//           <tbody>
//             {invoice.items.map((item, i) => (
//               <tr key={i}>
//                 <td className="border p-2">{item.name}</td>
//                 <td className="border p-2 text-center">{item.price} ج</td>
//                 <td className="border p-2 text-center">{item.quantity}</td>
//                 <td className="border p-2 text-center">{item.total} ج</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Total */}
//         <div className="text-right text-xl font-bold">
//           الإجمالي: {total} ج
//         </div>

//         <div className="text-center text-gray-400 text-sm pt-6">
//           شكراً لتعاملكم معنا 🤍
//         </div>
//       </div>

//       {/* ==== ACTIONS ==== */}
//       <div className="fixed bottom-6 right-6 flex gap-3 print:hidden">

//         <button
//           onClick={() => window.print()}
//           className="bg-green-600 text-white px-6 py-3 rounded-lg shadow"
//         >
//           🖨 طباعة
//         </button>

//         <button
//           onClick={() =>
//             window.open(
//               `http://localhost:5000/api/orders/${id}/invoice/pdf`,
//               "_blank"
//             )
//           }
//           className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow"
//         >
//           📄 تحميل PDF
//         </button>

//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getInvoice , openInvoicePDF } from "@/src/services/invoice.service";

type Item = {
  name: string;
  price: number;
  quantity: number;
  total: number;
};

type Invoice = {
  invoiceNumber: string;
  customerName: string;
  phone: string;
  date: string;
  items: Item[];
};

export default function InvoicePage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    loadInvoice();
  }, []);

  const loadInvoice = async () => {
    const res = await getInvoice(id as string);
    setInvoice(res.data);
  };

  if (!invoice)
    return <p className="p-10 text-gray-500">جاري تحميل الفاتورة...</p>;

  const total = invoice.items?.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const formattedDate = new Date(invoice.date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-6">

      {/* ===== INVOICE ===== */}
      <div
        id="invoice-print"
        className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-10 space-y-8 print:shadow-none print:p-0"
      >

        {/* Header */}
        <div className="flex justify-between items-start border-b pb-6">

          <div>
            <h1 className="text-4xl font-bold text-blue-600">
              StockFlow
            </h1>
            <p className="text-gray-500 text-sm">
              متجرك الذكي لإدارة المبيعات
            </p>
          </div>

          <div className="text-sm space-y-1 text-right">
            <p>
              <strong>رقم الفاتورة:</strong> #{invoice.invoiceNumber}
            </p>
            <p>
              <strong>التاريخ:</strong> {formattedDate}
            </p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <p>
            <strong>العميل:</strong> {invoice.customerName}
          </p>
          <p>
            <strong>الهاتف:</strong> {invoice.phone}
          </p>
        </div>

        {/* Items Table */}
        <div className="overflow-hidden rounded-lg border">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-right border">المنتج</th>
                <th className="p-3 border">السعر</th>
                <th className="p-3 border">الكمية</th>
                <th className="p-3 border">الإجمالي</th>
              </tr>
            </thead>

            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">

                  <td className="p-3 border">
                    {item.name}
                  </td>

                  <td className="p-3 border text-center">
                    {item.price} ج
                  </td>

                  <td className="p-3 border text-center">
                    {item.quantity}
                  </td>

                  <td className="p-3 border text-center font-semibold">
                    {item.total} ج
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

        {/* Total */}
        <div className="flex justify-end text-2xl font-bold border-t pt-4">
          الإجمالي الكلي: {total} ج
        </div>

        <div className="text-center text-gray-400 text-sm pt-6">
          شكراً لتعاملكم مع StockFlow 🤍
        </div>

      </div>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 print:hidden">

        <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-xl shadow-lg"
        >
          🖨 طباعة الفاتورة
        </button>

        <button
          onClick={() => openInvoicePDF(id as string)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl shadow-lg"
        >
          📄 تحميل PDF
        </button>

      </div>

      {/* ===== PRINT CSS ===== */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
          }

          #invoice-print {
            width: 100%;
            max-width: none;
          }

          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

    </div>
  );
}