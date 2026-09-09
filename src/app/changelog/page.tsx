import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Circle, Check } from "lucide-react";
import { getRelease } from "@/lib/release";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata(
  "/changelog",
  "Sürüm notları ve beta güncellemeleri",
  "Jarvis masaüstü beta ve web sitesi sürüm notları. Yeni özellikleri, düzeltmeleri ve Windows dağıtımının güncel durumunu takip et.",
);
export default function ChangelogPage() {
  const release = getRelease();
  return (
    <main id="main" className="container">
      <div className="page-intro">
        <span className="eyebrow">ÜRÜN GÜNLÜĞÜ</span>
        <h1>
          Her adımda
          <br />
          <em>biraz daha Jarvis.</em>
        </h1>
        <p>
          Yeni sürümler, düzeltmeler ve önemli değişiklikler.
          <br />
          Ürünün gelişimini buradan takip et.
        </p>
      </div>
      <div className="release-timeline">
        <article className="release-entry">
          <span className="status-label">WEB v0.3 · 09 EYLÜL 2026</span>
          <h2>Şimdi gerçek masaüstünle tanış.</h2>
          <p>
            Gerçek uygulama ekranı, kaydırmaya tepki veren perspektif ve duraklatılabilir hareket.
            İndirme merkezi artık sürüm, dosya boyutu ve SHA-256 bilgileriyle beta EXE’sini
            sunabiliyor.
          </p>
          <p>
            Kurulum ve gizlilik belgeleri yeni masaüstü arayüzüne uyarlandı. Groq varsayılan
            bağlantı; “Merhaba” ile uyandırma uygulamanın ayarlarından açılabiliyor. Web sürümü ve
            masaüstü paket sürümü ayrı numaralandırılır.
          </p>
          <Link className="text-link" href="/download">
            Beta paketini incele <ArrowUpRight size={15} />
          </Link>
        </article>
        <article className="release-entry">
          <span className="status-label">WEB v0.2 · 09 EYLÜL 2026</span>
          <h2>Jarvis’in katmanlarını keşfet.</h2>
          <p>
            Kaydırmayla açılan 3D reaktör, aranabilir komut kataloğu, MDX belgeleri ve açık okuma
            teması. Destek merkezi artık e-posta taslağı açabiliyor.
          </p>
          <p>
            Bu güncelleme web sitesine aittir. Masaüstü uygulamasının halka açık paketi henüz
            yayımlanmadı.
          </p>
          <Link className="text-link" href="/commands">
            Komutları keşfet <ArrowUpRight size={15} />
          </Link>
        </article>
        <article className="release-entry">
          <span className="status-label">
            <span className="status-dot" />
            {release ? `v${release.version}` : "Dağıtım hazırlığı"}
          </span>
          <h2>{release ? "Windows dağıtımı" : "İlk herkese açık sürüme doğru."}</h2>
          <p>
            {release
              ? `${release.publishedAt} tarihli Windows paketi indirme merkezinde. Platform ve dosya doğrulama bilgilerini indirmeden önce incele.`
              : "Masaüstü uygulaması geliştirme aşamasında. Bu sitede henüz doğrulanmış bir genel kullanım paketi yayımlanmadı. Yayından önce kurulum, kullanıcı verileri ve dağıtım dosyaları kontrol ediliyor."}
          </p>
          <ul>
            <li>
              <Check size={14} /> Tanıtım sitesi ve başlangıç belgeleri
            </li>
            <li>
              <Check size={14} /> Komut senaryoları ve sağlayıcı rehberleri
            </li>
            {!release && (
              <>
                <li>
                  <Circle size={12} /> Temiz Windows üzerinde dağıtım doğrulaması
                </li>
                <li>
                  <Circle size={12} /> İlk genel kullanım paketinin yayımlanması
                </li>
              </>
            )}
          </ul>
          <Link href="/download" className="text-link">
            İndirme merkezine git <ArrowUpRight size={15} />
          </Link>
        </article>
      </div>
    </main>
  );
}
