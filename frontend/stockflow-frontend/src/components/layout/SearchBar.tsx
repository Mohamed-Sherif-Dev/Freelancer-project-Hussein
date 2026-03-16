

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("search") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    // اشتغل فقط لو المستخدم داخل صفحة الشوب
    if (pathname !== "/shop") return;

    const delay = setTimeout(() => {
      if (!query.trim()) {
        router.replace("/shop");
      } else {
        router.replace(`/shop?search=${encodeURIComponent(query)}`);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query, pathname, router]);

  return (
    <div className="relative w-full max-w-md">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ابحث عن منتج..."
        className="w-full border rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
      />
    </div>
  );
}