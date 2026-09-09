import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import "./v2.css";
import "./v3.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { seoSettings, siteDescription } from "@/lib/seo";
const seo = seoSettings();
export const metadata: Metadata = {
  metadataBase: new URL(seo.origin || "http://localhost:3000"),
  title: { default: "Jarvis — Bilgisayarınla aynı dili konuş.", template: "%s · Jarvis" },
  description: siteDescription,
  applicationName: "Jarvis",
  robots: {
    index: seo.indexable,
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
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
          <style>
            {
              "[data-reveal] { opacity: 1 !important; transform: none !important; } .reactor-track { height: auto; } .reactor-sticky { position: relative; top: 0; } .reactor-copy button { display: none; }"
            }
          </style>
        </noscript>
      </body>
    </html>
  );
}
