


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getInvoice, openInvoicePDF } from "@/src/services/invoice.service";
import { Download, Printer } from "lucide-react";

export default function InvoicePage() {
  const { id } = useParams();
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        const url = await getInvoice(id as string);
        setInvoiceUrl(url);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadInvoice();
  }, [id]);

  // const handleDownload = async () => {
  //   const blob = await openInvoicePDF(id as string);
  //   const url = window.URL.createObjectURL(blob);

  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = `invoice-${id}.pdf`;
  //   a.click();
  // };

const handleDownload = () => {
  const url = openInvoicePDF(id as string);

  const a = document.createElement("a");
  a.href = url;
  a.download = `invoice-${id}.pdf`;
  a.click();
};

  const handlePrint = () => {
    if (invoiceUrl) {
      window.open(invoiceUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b bg-white">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">الفاتورة</h1>
            <p className="text-gray-500 mt-1">
              طلب رقم <span className="font-semibold">#{id}</span>
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 border px-5 py-2.5 rounded-xl hover:bg-gray-100 transition"
            >
              <Printer size={18} />
              طباعة
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition"
            >
              <Download size={18} />
              تحميل PDF
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="p-6 bg-gray-50">
          {loading ? (
            <div className="flex items-center justify-center h-[70vh] text-gray-500">
              جاري تحميل الفاتورة...
            </div>
          ) : invoiceUrl ? (
            <iframe
              src={invoiceUrl}
              className="w-full h-[80vh] rounded-2xl border bg-white shadow-inner"
            />
          ) : (
            <div className="text-center text-red-500">
              حدث خطأ أثناء تحميل الفاتورة
            </div>
          )}
        </div>

      </div>
    </div>
  );
}