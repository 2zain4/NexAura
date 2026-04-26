import "./globals.css";
import Navbar from "@/components/Navbar";
import { LangProvider } from "@/context/LanguageContext";
import PageTransition from "@/components/PageTransition";

export const metadata = {
  title: "NexAura",
  description: "AI-powered business systems",
  icons: { icon: "/logo2.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white scroll-smooth">
        <LangProvider>
          <Navbar />
          <PageTransition>{children}</PageTransition>
        </LangProvider>
      </body>
    </html>
  );
}