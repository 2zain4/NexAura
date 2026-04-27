"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "ar";

const LanguageContext = createContext<any>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    // 🧠 نجيب لغة الجهاز
    const browserLang = navigator.language;

    if (browserLang.startsWith("ar")) {
      setLang("ar");
    } else {
      setLang("en");
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);