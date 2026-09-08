import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Circle, Check } from "lucide-react";
import { getRelease } from "@/lib/release";
export const metadata: Metadata = {
  title: "Sürüm notları",
  description: "Jarvis yayın durumunu, dağıtım bilgilerini ve güncelleme hazırlığını takip et.",
};
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
