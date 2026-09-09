import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, KeyRound, Mic, Monitor } from "lucide-react";
import { CopyCode } from "@/components/copy-code";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata(
  "/support",
  "Yardım merkezi",
  "Jarvis açılmıyor, mikrofon algılanmıyor veya API bağlantısı kurulamıyor mu? Kurulum rehberlerine ulaş ve destek için hata bildirimini hazırla.",
);
const template =
  "Uygulama sürümü:\nWindows sürümü:\nAI sağlayıcısı (anahtar paylaşma):\n\nNe yapmak istiyordum?\n\nTekrarlama adımları:\n1.\n2.\n\nBeklediğim sonuç:\nGerçekleşen sonuç:\nHata mesajı (kişisel bilgileri temizle):";
export default function SupportPage() {
  return (
    <main id="main" className="container">
      <div className="page-intro">
        <span className="eyebrow">YARDIM MERKEZİ</span>
        <h1>
          Bir yerde
          <br />
          <em>takıldın mı?</em>
        </h1>
        <p>
          Önce birlikte birkaç şeyi kontrol edelim.
          <br />
          En sık karşılaşılan konuların rehberleri burada.
        </p>
      </div>
      <div className="support-grid">
        {[
          {
            icon: Monitor,
            title: "Kurulum ve açılış",
            text: "Ortam, bağımlılıklar ve uygulamanın başlatılması.",
            href: "/docs/kurulum",
          },
          {
            icon: Mic,
            title: "Mikrofon ve ses",
            text: "İzinler, cihaz seçimi ve sesli etkileşim.",
            href: "/docs/sesli-kullanim",
          },
          {
            icon: KeyRound,
            title: "Model bağlantısı",
            text: "API anahtarları, sağlayıcı seçimi ve kota hataları.",
            href: "/docs/saglayicilar",
          },
        ].map((item) => (
          <Link href={item.href} key={item.href} className="guide-card">
            <div className="guide-top">
              <item.icon size={23} />
              <ArrowUpRight size={17} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <span className="guide-time">
              Rehbere git <ArrowUpRight size={13} />
            </span>
          </Link>
        ))}
      </div>
      <section className="support-template">
        <h2>Sorununu anlaşılır hale getir.</h2>
        <p>
          Bu şablon, bir hatayı tekrar inceleyebilmek için gerekli bilgileri toplamana yardımcı
          olur. Şablonu doldurup e-posta ile gönderebilirsin. Aşağıdaki bağlantı e-posta uygulamanda
          bir taslak açar; gönderme işlemini sen tamamlarsın.
        </p>
        <a
          className="button button-light"
          href={`mailto:egeaydin.dev@gmail.com?subject=${encodeURIComponent("Jarvis — Destek talebi")}&body=${encodeURIComponent(template)}`}
        >
          E-posta taslağını aç <ArrowUpRight size={16} />
        </a>
        <p>
          <a className="text-link" href="mailto:egeaydin.dev@gmail.com">
            egeaydin.dev@gmail.com
          </a>
        </p>
        <CopyCode code={template} label="HATA BİLDİRİM ŞABLONU" />
        <aside className="notice">
          API anahtarını, özel konuşmalarını veya pano içeriğini paylaşma. Ekran görüntüsü ve
          günlüklerdeki kişisel bilgileri temizle.
        </aside>
        <Link href="/docs/sorun-giderme" className="text-link">
          Tüm sorun giderme adımları <ArrowUpRight size={16} />
        </Link>
      </section>
    </main>
  );
}
