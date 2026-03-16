"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()){
      router.push("/shop");
      return;
    }

    router.push(`/shop?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-soft rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-4">
        <h2 className="text-xl md:text-2xl font-semibold text-textMain">
          ابحث عن المنتج الذي تحتاجه
        </h2>

        <div className="flex w-full md:max-w-xl gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="مثال: لمبة LED، خلاط مياه..."
            className="flex-1 rounded-xl border border-border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            onClick={handleSearch}
            className="bg-primary text-white px-6 rounded-xl hover:opacity-90 transition flex items-center gap-2"
          >
            <Search size={18} />
            ابحث
          </button>
        </div>
      </div>
    </section>
  );
}
