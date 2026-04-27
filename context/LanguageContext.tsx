"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "ar";

const LanguageContext = createContext<any>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // 🔥 أول مرة: يحدد حسب الجهاز أو localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");

    if (savedLang) {
      setLang(savedLang as Lang);
    } else {
      const browserLang = navigator.language;

      if (browserLang.startsWith("ar")) {
        setLang("ar");
      } else {
        setLang("en");
      }
    }
  }, []);

  // 🔥 كل مرة اللغة تتغير نحفظها
  useEffect(() => {
    localStorage.setItem("lang", lang);

    // 💡 نخلي الاتجاه يتغير كمان
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);