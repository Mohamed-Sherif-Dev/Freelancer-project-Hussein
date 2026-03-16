"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/src/services/product.service";
import ProductCard from "@/src/components/cards/ProductCard";
import ProductSkeleton from "@/src/components/loaders/ProductSkeleton";

function ShopContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getProducts({ search }).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [search]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-8">
        {search ? `نتائج البحث عن: "${search}"` : "جميع المنتجات"}
      </h1>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
        ) : products.length > 0 ? (
          products.map((p) => (
            <ProductCard
              key={p._id}
              _id={p._id}
              name={p.name}
              price={p.price}
              stock={p.stock}
              image={p.image?.[0]?.url}
              description={p.description}
            />
          ))
        ) : (
          <p className="text-muted col-span-full text-center">
            لا توجد منتجات مطابقة لبحثك
          </p>
        )}
      </div>
    </section>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}