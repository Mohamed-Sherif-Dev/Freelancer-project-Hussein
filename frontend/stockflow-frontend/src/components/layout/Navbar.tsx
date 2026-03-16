"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { useCartStore } from "@/src/store/cart.store";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { items } = useCartStore();

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          StockFlow
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <SearchBar />
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-textMain font-medium">
          <Link href="/">الرئيسية</Link>
          <Link href="/shop">المتجر</Link>
          <Link href="/about">عنّا</Link>
          <Link href="/contact">تواصل</Link>
        </div>

        {/* Cart */}
        <Link href="/cart" className="relative cursor-pointer">
          <ShoppingCart  className="w-6 h-6 text-textMain" />
          <span className="absolute -top-2 -left-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {count}
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-4"
        >
          <Link href="/">الرئيسية</Link>
          <Link href="/shop">المتجر</Link>
          <Link href="/about">عنّا</Link>
          <Link href="/contact">تواصل</Link>
        </motion.div>
      )}
    </nav>
  );
}
