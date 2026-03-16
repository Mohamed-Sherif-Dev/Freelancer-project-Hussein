"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="space-y-24">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center py-24">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold text-textMain leading-tight">
            من نحن في StockFlow
          </h1>

          <p className="text-muted text-lg leading-relaxed">
            نحن منصة متخصصة في توفير مستلزمات الكهرباء والسباكة بأفضل جودة وأسعار تنافسية،
            مع تجربة شراء سهلة وسريعة تناسب الجميع.
          </p>

          <p className="text-muted">
            هدفنا هو تسهيل وصول المنتجات الاحترافية للتجار والعملاء في مكان واحد موثوق.
          </p>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          src="https://images.unsplash.com/photo-1770736158887-9a0f3702416e?q=80&w=1170&auto=format&fit=crop"
          className="rounded-3xl shadow-lg object-cover"
          alt="warehouse"
        />
      </section>

      {/* Stats */}
      <section className="bg-[#f6f7f8] py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "منتج", value: "500+" },
            { label: "عميل سعيد", value: "2K+" },
            { label: "قسم", value: "30+" },
            { label: "سنوات خبرة", value: "5+" },
          ].map((item) => (
            <div key={item.label} className="space-y-2">
              <p className="text-3xl font-bold text-primary">{item.value}</p>
              <p className="text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          whileHover={{ scale: 1.03 }}
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
          className="rounded-3xl shadow-lg object-cover"
          alt="tools"
        />

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">
            مهمتنا
          </h2>

          <p className="text-muted leading-relaxed">
            تقديم منتجات موثوقة بجودة عالية مع دعم فني حقيقي وتجربة شراء احترافية
            تليق بالسوق الحديث.
          </p>

          <ul className="space-y-3 text-muted">
            <li>✔ منتجات أصلية</li>
            <li>✔ سرعة توصيل</li>
            <li>✔ أسعار عادلة</li>
            <li>✔ دعم مستمر</li>
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 text-center space-y-12">
        <h2 className="text-3xl font-bold">فريق العمل</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
          ].map((img) => (
            <motion.div
              key={img}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <img
                src={`${img}?auto=format&fit=crop&w=600&q=80`}
                className="h-64 w-full object-cover"
                alt="team"
              />

              <div className="p-4">
                <p className="font-semibold">عضو الفريق</p>
                <p className="text-muted text-sm">إدارة & تشغيل</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}