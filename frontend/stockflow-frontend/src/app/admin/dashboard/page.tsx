"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/src/services/dashboard.service";


export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError("غير مصرح — سجل الدخول مرة أخرى");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <p className="p-6">جاري التحميل...</p>;

  if (error) return <p className="p-6 text-red-500">{error}</p>;

  if (!stats) return null;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">📊 لوحة التحكم</h1>
        <p className="text-gray-500">نظرة سريعة على أداء المتجر</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <StatCard title="إجمالي المبيعات" value={`${stats.totalSales} ج`} />
        <StatCard title="عدد الطلبات" value={stats.totalOrders} />
        <StatCard title="طلبات قيد التنفيذ" value={stats.pendingOrders} />
        <StatCard title="منتجات منخفضة" value={stats.lowStockProducts} />
      </div>

      {/* Latest Orders */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold mb-4">آخر الطلبات</h2>

        <div className="space-y-3">
          {stats.latestOrders.map((order: any) => (
            <div
              key={order._id}
              className="flex justify-between border-b pb-2 text-sm"
            >
              <span>{order.customerName}</span>
              <span>{order.totalPrice} ج</span>
              <span className="text-orange-500">{order.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-1 hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}