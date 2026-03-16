import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import { Suspense } from "react";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<div />}>
        <Navbar />
      </Suspense>

      {children}

      <Footer />
    </>
  );
}
