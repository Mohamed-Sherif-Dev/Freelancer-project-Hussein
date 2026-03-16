"use client";

import { useEffect, useState } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  getSalesTimeline,
  getProfitRatio,
} from "@/src/services/reports.service";

/* ================= TYPES ================= */

type TimelineItem = {
  date: string;
  totalSales: number;
};

type ProfitRatio = {
  totalProfit: number;
  totalOrders: number;
  avgProfitPerOrder: number;
};

/* ================= COMPONENT ================= */

export default function ReportsPage() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [ratio, setRatio] = useState<ProfitRatio | null>(null);
  const [range, setRange] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [loading, setLoading] = useState(false);

  /* ================= LOAD DATA ================= */

  const load = async () => {
    try {
      setLoading(true);

      const timelineData = await getSalesTimeline(range);
      const ratioData = await getProfitRatio();

      setTimeline(timelineData.data);
      setRatio(ratioData);
    } catch (err) {
      console.error("Reports error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [range]);

  /* ================= UI ================= */

  return (
    <div className="space-y-8">

      {/* ===== KPIs ===== */}
      <div className="grid md:grid-cols-3 gap-6">

        <Stat title="إجمالي الأرباح" value={`${ratio?.totalProfit || 0} ج`} />

        <Stat title="عدد الطلبات" value={ratio?.totalOrders || 0} />

        <Stat
          title="متوسط الربح للطلب"
          value={`${ratio?.avgProfitPerOrder || 0} ج`}
        />

      </div>

      {/* ===== SALES CHART ===== */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">

        <div className="flex justify-between items-center">

          <h2 className="font-bold text-lg">📊 حركة المبيعات</h2>

          <div className="flex gap-2">
            {(["daily", "weekly", "monthly"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-4 py-1 rounded-lg text-sm transition
                  ${
                    range === r
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {r === "daily" && "يومي"}
                {r === "weekly" && "أسبوعي"}
                {r === "monthly" && "شهري"}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-center py-10 text-gray-500">جاري التحميل...</p>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={timeline}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="totalSales"
                stroke="#4f46e5"
                strokeWidth={3}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */

function Stat({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 text-center space-y-2">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}