"use client";

import { useLang } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

type Section = "home" | "about" | "services" | "projects" | "contact";
type Lang = "en" | "ar";

export default function Navbar() {
  const { lang, setLang } = useLang() as {
    lang: Lang;
    setLang: (lang: Lang) => void;
  };

  const [active, setActive] = useState<Section>("home");
  const [open, setOpen] = useState(false);

  const text: Record<Lang, Record<Section, string>> = {
    en: {
      home: "Home",
      about: "About",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
    },
    ar: {
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      projects: "الأعمال",
      contact: "تواصل",
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections: Section[] = ["home", "about", "services", "projects", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let current: Section = "home";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        if (scrollPosition >= el.offsetTop) {
          current = id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: Section) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.offsetTop - 80;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setOpen(false);
  };

  const style = (id: Section) =>
    `cursor-pointer transition px-2 py-1 ${
      active === id
        ? "text-cyan-400 font-bold border-b-2 border-cyan-400"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="fixed top-0 w-full bg-[#020617]/80 backdrop-blur z-50 px-6 py-4 border-b border-white/5"
    >
      {/* TOP BAR */}
      <div className="flex justify-between items-center">

        {/* LOGO */}
        <h1 className="font-bold text-lg">NexAura</h1>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* 🌐 LANGUAGE BUTTON */}
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-lg text-sm hover:bg-cyan-500/20 transition"
          >
            {lang === "en" ? "AR" : "EN"}
          </button>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex gap-6 items-center">

            <button onClick={() => scrollTo("home")} className={style("home")}>
              {text[lang].home}
            </button>

            <button onClick={() => scrollTo("about")} className={style("about")}>
              {text[lang].about}
            </button>

            <button onClick={() => scrollTo("services")} className={style("services")}>
              {text[lang].services}
            </button>

            <button onClick={() => scrollTo("projects")} className={style("projects")}>
              {text[lang].projects}
            </button>

            <button onClick={() => scrollTo("contact")} className={style("contact")}>
              {text[lang].contact}
            </button>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-center bg-[#020617] border border-white/10 rounded-xl p-4 animate-fadeIn">

          <button onClick={() => scrollTo("home")} className={style("home")}>
            {text[lang].home}
          </button>

          <button onClick={() => scrollTo("about")} className={style("about")}>
            {text[lang].about}
          </button>

          <button onClick={() => scrollTo("services")} className={style("services")}>
            {text[lang].services}
          </button>

          <button onClick={() => scrollTo("projects")} className={style("projects")}>
            {text[lang].projects}
          </button>

          <button onClick={() => scrollTo("contact")} className={style("contact")}>
            {text[lang].contact}
          </button>

        </div>
      )}
    </nav>
  );
}