
"use client";

import { useEffect, useState } from "react";
import { getFeaturedProducts } from "@/src/services/product.service";
import ProductCard from "@/src/components/cards/ProductCard";
import ProductSkeleton from "@/src/components/loaders/ProductSkeleton";
import Link from "next/link";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">منتجات مميزة</h2>

        <Link
          href="/shop"
          className="text-primary font-medium hover:underline"
        >
          عرض الكل
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          : products.map((p) => (
            <ProductCard
              key={p._id}
              _id={p._id}
              name={p.name}
              price={p.price}
              stock={p.stock}
              image={p.image?.[0]?.url}
              description={p.description}
            />
            ))}
      </div>
    </section>
  );
}
