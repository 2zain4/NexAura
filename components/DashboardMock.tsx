"use client";
import { motion } from "framer-motion";

export default function DashboardMock({ lang }: { lang: string }) {
  const t = {
    en: { title: "Dashboard", revenue: "Revenue", orders: "Orders", customers: "Customers", sales: "Sales Overview", live: "Live" },
    ar: { title: "لوحة التحكم", revenue: "الإيرادات", orders: "الطلبات", customers: "العملاء", sales: "نظرة عامة", live: "مباشر" },
  };

  const text = t[lang as "en" | "ar"];

  return (
    <div className="bg-[#121826] rounded-2xl p-6 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <h2>{text.title}</h2>
        <span className="text-green-400">{text.live}</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[text.revenue, text.orders, text.customers].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0B0F19] p-4 rounded">
            <p className="text-gray-400">{item}</p>
            <h3>{Math.floor(Math.random() * 1000)}+</h3>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#0B0F19] p-4 rounded">
        <p className="text-gray-400 mb-2">{text.sales}</p>
        <div className="flex gap-2 h-24 items-end">
          {[40, 60, 80, 50, 90].map((h, i) => (
            <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} className="bg-blue-500 w-4" />
          ))}
        </div>
      </div>
    </div>
  );
}