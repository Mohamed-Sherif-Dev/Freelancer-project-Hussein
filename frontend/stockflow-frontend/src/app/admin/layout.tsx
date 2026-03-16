


"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  BarChart3,
  LogOut,
  FileText,
  Menu,
  User,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  const handeleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("admin");

    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ===== Sidebar ===== */}
      <aside
        className={`
          bg-gray-900 text-white flex flex-col
          transition-all duration-300
          ${collapsed ? "w-16" : "w-64"}
          hidden md:flex
        `}
      >
        <div className="p-5 font-bold text-lg border-b border-gray-700">
          {collapsed ? "SF" : "حسين محمد العطار"}
        </div>

        <nav className="flex-1 p-3 space-y-2 text-sm">
          <SidebarItem icon={<User />} label="تسجيل الدخول" href="/admin/login" collapsed={collapsed} />
          <SidebarItem icon={<LayoutDashboard />} label="الرئيسية" href="/admin/dashboard" collapsed={collapsed} />
          <SidebarItem icon={<FileText />} label="الكاتيجوري" href="/admin/categories" collapsed={collapsed} />
          <SidebarItem icon={<ShoppingBag />} label="الطلبات" href="/admin/orders" collapsed={collapsed} />
          <SidebarItem icon={<Package />} label="المنتجات" href="/admin/products" collapsed={collapsed} />
          <SidebarItem icon={<BarChart3 />} label="التقارير" href="/admin/reports" collapsed={collapsed} />
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button onClick={handeleLogout} className="flex items-center cursor-pointer gap-2 text-red-400 text-sm">
            <LogOut size={18} />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside> 

      {/* ===== Main ===== */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-4">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-2 rounded hover:bg-gray-100"
            >
              <Menu />
            </button>

            <h1 className="font-semibold text-lg">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
              A
            </div>
            <span className="hidden sm:block">Admin</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  collapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}