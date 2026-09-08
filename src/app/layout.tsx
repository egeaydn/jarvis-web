import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Jarvis — Bilgisayarınla aynı dili konuş.", template: "%s · Jarvis" },
  description:
    "Windows için Türkçe yapay zekâ asistanı. Uygulamalarını aç, dosyalarını yönet, günlük işlerini sesinle veya yazarak başlat.",
  applicationName: "Jarvis",
  robots: {
    index: process.env.SITE_INDEXABLE === "true" && !!process.env.NEXT_PUBLIC_SITE_URL,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Jarvis",
    title: "Jarvis — Bilgisayarınla aynı dili konuş.",
    description:
      "Daha az tıkla. Daha fazlasını yap. Windows için Türkçe masaüstü asistanını keşfet.",
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <a href="#main" className="skip-link">
          İçeriğe geç
        </a>
        <MotionProvider>
          <Header />
          {children}
          <Footer />
        </MotionProvider>
        <noscript>
          <style>{"[data-reveal] { opacity: 1 !important; transform: none !important; }"}</style>
        </noscript>
      </body>
    </html>
  );
}
