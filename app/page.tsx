"use client";

import { useLang } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import FadeIn from "@/components/FadeIn";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import emailjs from "@emailjs/browser";
type Lang = "en" | "ar";

export default function Home() {
  const { lang } = useLang() as { lang: Lang };

  const text: Record<Lang, any> = {
    en: {
      title: "We build smart business systems",
      desc: "CRM, E-commerce, Dashboards & Automation tools",
      btn: "Start Project",
      about: "Who We Are",
      services: "Our Services",
      contactTitle: "Let's Connect",
      contactDesc:
        "We help businesses grow using smart digital solutions.",
      send: "Send",
    },
    ar: {
      title: "نحن نبني أنظمة ذكية للأعمال",
      desc: "أنظمة إدارة، متاجر إلكترونية، ولوحات تحكم",
      btn: "ابدأ مشروعك",
      about: "من نحن",
      services: "خدماتنا",
      contactTitle: "خلينا نتواصل",
      contactDesc:
        "بنساعد البيزنس يكبر باستخدام حلول رقمية ذكية.",
      send: "إرسال",
    },
  };

  const [form, setForm] = useState({
  name: "",
  phone: "",
  email: "",
  message: "", // 👈 جديد
});

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

  const sendForm = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    await emailjs.send(
      "service_espfrqu", // 🔥 حط Service ID بتاعك
      "template_rcdvog4",  // 🔥 حط Template ID
      {
        name: form.name,
        phone: form.phone,
        email: form.email,
        message: form.message,
      },
      "3T5NPWWc3Whxu-5Io" // 🔥 حط Public Key
    );

    setMsg(lang === "en" ? "Sent successfully ✅" : "تم الإرسال بنجاح ✅");

    setForm({
      name: "",
      phone: "",
      email: "",
      message: "", // 👈 يرجع الرسالة كمان
    });

  } catch (error) {
    setMsg(lang === "en" ? "Error ❌" : "في مشكلة ❌");
  }

  setLoading(false);
};

  return (
    <main className="bg-[#020617] text-white">

      {/* 🔥 INTRO */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-[#020617] z-[999]"
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <img src="/logo2.png" className="w-24 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-cyan-400">NexAura</h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <FadeIn>
        <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-6">

         <img src="/logo2.png" className="w-40 md:w-56 mb-4" />

{/* 🔥 اسم البراند */}
<h2 className="text-xl md:text-2xl font-semibold text-cyan-400 mb-2 tracking-wide">
  NexAura
</h2>

{/* 🔥 التايتل */}
<h1 className="text-4xl md:text-6xl font-bold mb-4">
  {text[lang].title}
</h1>

          <motion.p
            className="text-gray-400 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {text[lang].desc}
          </motion.p>

          <div className="flex gap-4 justify-center flex-wrap">

  {/* 🔥 Start Project */}
  <motion.a
    href="#contact"
    className="bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 rounded-xl font-semibold"
    whileHover={{ scale: 1.05 }}
  >
    {text[lang].btn}
  </motion.a>

  {/* 🔥 Live Demo */}
  <motion.a
    href="#projects"
    className="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-xl font-semibold hover:bg-cyan-400/10 transition"
    whileHover={{ scale: 1.05 }}
  >
    {lang === "en" ? "Live Demo" : "جرب الديمو"}
  </motion.a>

</div>

        </section>
      </FadeIn>

      {/* ABOUT */}
      <FadeIn>
        <section id="about" className="py-24 px-6 max-w-5xl mx-auto text-center">

          <h2 className="text-3xl font-bold text-cyan-400 mb-6">
            {text[lang].about}
          </h2>

         <p className="text-gray-400 text-center max-w-3xl mx-auto leading-relaxed">
  {lang === "en"
    ? "NexAura is a digital solutions company specialized in building smart business systems. We create CRM platforms, e-commerce websites, and data dashboards that help businesses automate operations, improve performance, and scale faster. Our goal is to turn your ideas into powerful digital products that drive real results."
    : "NexAura هي شركة حلول رقمية متخصصة في بناء أنظمة ذكية للأعمال. نقوم بتطوير أنظمة إدارة العملاء (CRM)، والمتاجر الإلكترونية، ولوحات التحكم التي تساعد الشركات على أتمتة العمليات وتحسين الأداء والنمو بشكل أسرع. هدفنا هو تحويل أفكارك إلى منتجات رقمية قوية تحقق نتائج حقيقية."}
</p>

        </section>
      </FadeIn>

      {/* SERVICES */}
      <FadeIn>
        <section id="services" className="py-24 px-6 max-w-6xl mx-auto scroll-mt-24">

  <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center text-cyan-400">
    {lang === "en" ? "Our Services" : "خدماتنا"}
  </h2>

  <div className="grid md:grid-cols-2 gap-8">

    {/* CRM */}
    <div className="bg-[#0B1220] p-6 rounded-2xl border border-white/5 hover:border-cyan-400/30 transition">
      <h3 className="font-bold text-xl mb-2">
        {lang === "en" ? "CRM Systems" : "أنظمة إدارة العملاء"}
      </h3>

      <p className="text-gray-400 mb-3">
        {lang === "en"
          ? "Manage your customers, track sales, and improve your workflow."
          : "إدارة العملاء، متابعة المبيعات، وتحسين سير العمل"}
      </p>

      <ul className="text-sm text-gray-500 space-y-1">
        <li>• {lang === "en" ? "Customer database" : "قاعدة بيانات العملاء"}</li>
        <li>• {lang === "en" ? "Sales tracking" : "متابعة المبيعات"}</li>
        <li>• {lang === "en" ? "Automation tools" : "أدوات أتمتة"}</li>
      </ul>
    </div>

    {/* Automation */}
    <div className="bg-[#0B1220] p-6 rounded-2xl border border-white/5 hover:border-blue-400/30 transition">
      <h3 className="font-bold text-xl mb-2">
        {lang === "en" ? "Automation" : "الأتمتة"}
      </h3>

      <p className="text-gray-400 mb-3">
        {lang === "en"
          ? "Automate tasks and save time with smart workflows."
          : "أتمتة المهام وتوفير الوقت باستخدام حلول ذكية"}
      </p>

      <ul className="text-sm text-gray-500 space-y-1">
        <li>• {lang === "en" ? "Task automation" : "أتمتة المهام"}</li>
        <li>• {lang === "en" ? "Workflow optimization" : "تحسين سير العمل"}</li>
        <li>• {lang === "en" ? "Notifications" : "إشعارات ذكية"}</li>
      </ul>
    </div>

    {/* Analytics */}
    <div className="bg-[#0B1220] p-6 rounded-2xl border border-white/5 hover:border-purple-400/30 transition">
      <h3 className="font-bold text-xl mb-2">
        {lang === "en" ? "Analytics" : "تحليل البيانات"}
      </h3>

      <p className="text-gray-400 mb-3">
        {lang === "en"
          ? "Track performance and understand your business data."
          : "تحليل الأداء وفهم بيانات مشروعك بشكل أفضل"}
      </p>

      <ul className="text-sm text-gray-500 space-y-1">
        <li>• {lang === "en" ? "Live dashboards" : "لوحات تحكم مباشرة"}</li>
        <li>• {lang === "en" ? "Reports" : "تقارير مفصلة"}</li>
        <li>• {lang === "en" ? "Insights" : "تحليلات ذكية"}</li>
      </ul>
    </div>

    {/* E-commerce */}
    <div className="bg-[#0B1220] p-6 rounded-2xl border border-white/5 hover:border-green-400/30 transition">
      <h3 className="font-bold text-xl mb-2">
        {lang === "en" ? "E-commerce Websites" : "متاجر إلكترونية"}
      </h3>

      <p className="text-gray-400 mb-3">
        {lang === "en"
          ? "Build full online stores to sell your products بسهولة."
          : "إنشاء متاجر إلكترونية متكاملة لبيع منتجاتك بسهولة"}
      </p>

      <ul className="text-sm text-gray-500 space-y-1">
        <li>• {lang === "en" ? "Online payments" : "بوابات دفع"}</li>
        <li>• {lang === "en" ? "Order management" : "إدارة الطلبات"}</li>
        <li>• {lang === "en" ? "Mobile responsive" : "متجاوب مع الموبايل"}</li>
      </ul>
    </div>

  </div>
</section>
      </FadeIn>

  <FadeIn>  
      <section id="projects" className="section">
  <h2 className="text-3xl font-bold mb-6 text-center">
    {lang === "en" ? "Featured Work" : "أعمالي"}
  </h2>

  <div className="grid md:grid-cols-2 gap-6">
    {/* كارت */}
    <div className="bg-[#0B1220] p-4 rounded-xl border border-white/5 hover:border-cyan-400/30 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition">

  <img src="/p1.png" className="rounded mb-3" />

  <p className="text-cyan-400 text-xs mb-2">
    {lang === "en" ? "UI/UX Design" : "تصميم واجهات"}
  </p>

  <h3 className="text-xl font-semibold">
    {lang === "en" ? "Patisserie Management System" : "نظام إدارة محل حلويات"}
  </h3>

  <p className="text-gray-400 text-sm mb-4">
    {lang === "en"
      ? "A multi-branch dashboard to manage sales, inventory, and daily reports in real-time."
      : "داشبورد لإدارة الفروع، المبيعات، المخزون، والتقارير اليومية بشكل لحظي."}
  </p>

  <div className="flex gap-3">
    <a
      href="https://www.figma.com/make/lnuzjaFtakjFVmzmFeXMhF/Multi-Branch-Patisserie-Dashboard?p=f&t=V9hw318jqAqRtgW3-0&fullscreen=1"
      target="_blank"
      className="px-3 py-1 text-sm bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 transition"
    >
      {lang === "en" ? "Live Demo" : "عرض المشروع"}
    </a>
  </div>

</div>

<div className="bg-[#0B1220] p-4 rounded-xl border border-white/5 hover:border-cyan-400/30 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition">

  <img src="/p2.png" className="rounded mb-3" />

  <p className="text-cyan-400 text-xs mb-2">
    {lang === "en" ? "Dashboard System" : "نظام داشبورد"}
  </p>

  <h3 className="text-xl font-semibold">
    {lang === "en" ? "Inventory Management Dashboard" : "لوحة إدارة المخزون"}
  </h3>

  <p className="text-gray-400 text-sm mb-4">
    {lang === "en"
      ? "Track stock levels, manage products, and monitor inventory performance بسهولة."
      : "تابع المخزون، إدارة المنتجات، وتحليل الأداء بكل سهولة."}
  </p>

  <div className="flex gap-3">
    <a
      href="https://www.figma.com/make/5D49qQL4dyO3N2nbdzHKyq/Inventory-Management-Dashboard?p=f&t=SZQEaEe8G0qkGSyI-0&fullscreen=1"
      target="_blank"
      className="px-3 py-1 text-sm bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 transition"
    >
      {lang === "en" ? "Live Demo" : "عرض المشروع"}
    </a>
  </div>

</div>
    
  </div>
</section>
  </FadeIn>
      {/* CONTACT */}
      <FadeIn>
        <section id="contact" className="py-24 px-6 text-center max-w-xl mx-auto">

          
<h2 className="text-3xl md:text-4xl font-bold mb-4">
    {lang === "en" ? "Let's Connect" : "خلينا نتواصل"}
  </h2>
 {/* DESC */}
  <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
    {lang === "en"
      ? "We help businesses grow using smart digital solutions. Let's talk about your project."
      : "بنساعد البيزنس يكبر باستخدام حلول رقمية ذكية. خلينا نتكلم عن مشروعك."}
  </p>
          

        <form onSubmit={sendForm} className="space-y-4 bg-[#0B1220] p-6 rounded-xl mb-10">

  <input
    name="name"
    value={form.name}
    onChange={handleChange}
    placeholder={lang === "en" ? "Name" : "الاسم"}
    className="w-full p-3 bg-[#020617] rounded"
  />

  <input
    name="phone"
    value={form.phone}
    onChange={handleChange}
    placeholder={lang === "en" ? "Phone" : "رقم الهاتف"}
    className="w-full p-3 bg-[#020617] rounded"
  />

  <input
    name="email"
    value={form.email}
    onChange={handleChange}
    placeholder={lang === "en" ? "Email" : "البريد الإلكتروني"}
    className="w-full p-3 bg-[#020617] rounded"
  />

  {/* TEXTAREA */}
  <textarea
    name="message"
    value={form.message}
  onChange={handleChange}
    placeholder={lang === "en" ? "Message (optional)" : "رسالة (اختياري)"}
    className="w-full p-3 bg-[#020617] rounded resize-none h-32"
  />

  <button className="w-full bg-cyan-500 py-3 rounded">
    {loading
      ? lang === "en"
        ? "Sending..."
        : "جاري الإرسال..."
      : text[lang].send}
  </button>

</form>

          {msg && <p className="mt-4">{msg}</p>}

          {/* BUTTONS */}
  <div className="flex flex-wrap justify-center gap-4 mb-8">

   {/* FACEBOOK */}
<a
  href="https://www.facebook.com/share/1AjDWJqMuE/"
  target="_blank"
  className="group flex items-center gap-2 bg-[#0B1220] hover:bg-blue-500/10 border border-white/10 hover:border-blue-400 px-5 py-3 rounded-xl transition"
>
  <FaFacebook className="text-blue-500 group-hover:scale-110 transition" size={20} />
  Facebook
</a>

{/* INSTAGRAM */}
<a
  href="https://www.instagram.com/nexaura0101?igsh=ZGJub2gwbTVhZnZu"
  target="_blank"
  className="group flex items-center gap-2 bg-[#0B1220] hover:bg-pink-500/10 border border-white/10 hover:border-pink-400 px-5 py-3 rounded-xl transition"
>
  <FaInstagram className="text-pink-400 group-hover:scale-110 transition" size={20} />
  Instagram
</a>

{/* WHATSAPP */}
<a
  href="https://wa.me/201286114545"
  target="_blank"
  className="group flex items-center gap-2 bg-[#0B1220] hover:bg-green-500/10 border border-white/10 hover:border-green-400 px-5 py-3 rounded-xl transition"
>
  <FaWhatsapp className="text-[#25D366] group-hover:scale-110 transition" size={20} />
  WhatsApp
</a>
  </div>

  {/* LOCATION */}
  <p className="text-gray-500 text-sm">
    {lang === "en"
      ? "Based in Alexandria, Egypt • Available for projects"
      : "مقرنا في اسكندرية، مصر • متاحين للمشاريع"}
  </p>

        </section>
      </FadeIn>

    

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-400 border-t border-white/10">
        © {new Date().getFullYear()} NexAura — مصر
      </footer>

    </main>
  );
}