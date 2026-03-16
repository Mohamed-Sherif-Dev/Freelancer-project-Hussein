"use client";

import Link from "next/link";
import { Facebook, Instagram, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo + About */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-primary">
            StockFlow
          </h3>
          <p className="text-sm text-muted">
            منصة متكاملة لبيع أدوات السباكة والكهرباء
            بأفضل جودة وأسعار تنافسية.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-3">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/">الرئيسية</Link></li>
            <li><Link href="/shop">المتجر</Link></li>
            <li><Link href="/about">من نحن</Link></li>
            <li><Link href="/contact">تواصل معنا</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-3">الأقسام</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>سباكة</li>
            <li>كهرباء</li>
            <li>أدوات</li>
            <li>صيانة</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h4 className="font-semibold mb-3">تواصل معنا</h4>

          <div className="flex items-center gap-2 text-sm text-muted">
            <Phone size={16} />
            <span>01000000000</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin size={16} />
            <span>القاهرة – مصر</span>
          </div>

          <div className="flex gap-3 mt-4">
            <a href="#" className="text-muted hover:text-primary">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-muted hover:text-primary">
              <Instagram size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-border py-4 text-center text-sm text-muted">
        © {new Date().getFullYear()} StockFlow – جميع الحقوق محفوظة
      </div>
    </footer>
  );
}