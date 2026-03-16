

"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useRouter } from "next/navigation";
import { getCategories } from "@/src/services/category.service";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: { url: string }[];
  productCount: number;
  isActive: boolean;
}

export default function CategorySwiper() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data.filter((c: Category) => c.isActive));
    });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">الأقسام</h3>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        navigation
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        spaceBetween={18}
        slidesPerView={2}
        breakpoints={{
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat._id}>
            <div
              onClick={() => router.push(`/category/${cat.slug}`)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition hover:shadow-lg"
            >
              <img
                src={cat.image[0]?.url}
                loading="lazy"
                alt={cat.name}
                className="w-full h-36 object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {cat.name}
                </span>
                <span className="text-white text-xs opacity-80">
                  {cat.productCount} منتج
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}