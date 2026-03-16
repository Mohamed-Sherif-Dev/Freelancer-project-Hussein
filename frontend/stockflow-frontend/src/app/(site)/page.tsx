"use client";

import HeroSection from "@/src/components/layout/HeroSection";
import CategorySwiper from "@/src/components/CategorySwiper";
import DesignShocase from "@/src/components/DesignShowcase";
import FeaturedProducts from "@/src/components/sections/FeaturedProducts";
import OfferBranner from "@/src/components/sections/OfferBanner";
import WhyChooseUs from "@/src/components/sections/WhyChooseUs";
import SearchSection from "@/src/components/sections/SearchSection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <CategorySwiper />
      <DesignShocase />
      <FeaturedProducts />
      <OfferBranner />
      <WhyChooseUs />
    </div>
  );
}
