import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Download,
  KeyRound,
  Mic,
  Monitor,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getRelease } from "@/lib/release";
import { JsonLd } from "@/components/json-ld";
import { absoluteSiteUrl, pageMetadata, siteDescription } from "@/lib/seo";
export const metadata: Metadata = pageMetadata(
  "/download",
  "Jarvis indir — Windows x64 beta",
  "Jarvis Windows x64 beta EXE’sini indir. Dosya boyutu, SHA-256 doğrulaması, API anahtarı gereksinimleri ve kurulum rehberi.",
);
export default function DownloadPage() {
  const release = getRelease();
  return (
    <main id="main" className="container">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Jarvis",
          alternateName: "Ege Assistant",
          description: siteDescription,
          operatingSystem: "Windows x64",
          applicationCategory: "UtilitiesApplication",
          inLanguage: "tr-TR",
          isAccessibleForFree: true,
          author: { "@type": "Person", name: "Ege Aydın" },
          url: absoluteSiteUrl("/download"),
          ...(release
            ? {
                softwareVersion: release.version,
                fileSize: `${release.sizeBytes} bytes`,
                downloadUrl: release.url.startsWith("/")
                  ? absoluteSiteUrl(release.url)
                  : release.url,
              }
            : {}),
        }}
      />
      <Reveal className="page-intro centered">
        <span className="eyebrow">YENİ BİR ÇALIŞMA BİÇİMİ</span>
        <h1>
          Masaüstünde
          <br />
          <em>biraz daha olasılık.</em>
        </h1>
        <p>
          Jarvis’i Windows bilgisayarına getir.
          <br />
          İlk adımdan itibaren belgeler yanında.
        </p>
      </Reveal>
      <div className="download-layout">
        <Reveal className="download-card">
          <div className="download-card-head">
            <span className="windows-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="status-label">
              <span className="status-dot" />
              {release ? `v${release.version}` : "Yayına hazırlanıyor"}
            </span>
          </div>
          <h2>Jarvis for Windows</h2>
          <p className="status-label">ÜCRETSİZ BETA · KENDİ API ANAHTARINLA</p>
          <p>
            {release
              ? "Tek dosyalık beta uygulamasını indir; Python kurmadan başla. AI kullanım limitleri ve ücretleri kendi sağlayıcı hesabına bağlıdır."
              : "Önce web deneyimini geliştiriyoruz. Ücretsiz beta paketi hazır olup doğrulandığında buradan indirebileceksin. AI sağlayıcının ücretleri ve kotaları kendi hesabına bağlıdır."}
          </p>
          {release ? (
            <a
              className="button button-primary"
              href={release.url}
              download={release.url.startsWith("/")}
            >
              <Download size={17} /> Windows için indir <ArrowUpRight size={17} />
            </a>
          ) : (
            <button className="button button-disabled" disabled>
              <Download size={17} /> İndirme yakında açılacak
            </button>
          )}
          <p className="download-note">
            {release
              ? "İndirdikten sonra EXE’yi aç ve Ayarlar ve AI bağlantısı bölümünden kendi anahtarını ekle."
              : "Henüz doğrulanmış bir dağıtım paketi yayımlanmadı."}
          </p>
          <dl className="download-facts">
            <div>
              <dt>Platform</dt>
              <dd>{release?.platform || "Windows · Gereksinimler doğrulanıyor"}</dd>
            </div>
            <div>
              <dt>AI bağlantısı</dt>
              <dd>Kendi sağlayıcı anahtarın</dd>
            </div>
            <div>
              <dt>Etkileşim</dt>
              <dd>Türkçe · Sesli ve yazılı</dd>
            </div>
            {release && (
              <>
                <div>
                  <dt>Dosya boyutu</dt>
                  <dd>{(release.sizeBytes / 1024 / 1024).toFixed(1)} MB</dd>
                </div>
                <div>
                  <dt>Yayın tarihi</dt>
                  <dd>
                    {new Intl.DateTimeFormat("tr-TR", {
                      dateStyle: "long",
                      timeZone: "UTC",
                    }).format(new Date(release.publishedAt))}
                  </dd>
                </div>
                <div>
                  <dt>Yayıncı</dt>
                  <dd>{release.publisher}</dd>
                </div>
              </>
            )}
          </dl>
          {release && (
            <div className="notice">
              <strong>SHA-256</strong>
              <p className="hash-code">{release.sha256}</p>
              {release.url.startsWith("/downloads/") && (
                <div className="release-links">
                  <a className="text-link" href={`${release.url}.sha256`} download>
                    Doğrulama dosyasını indir
                  </a>
                  <Link className="text-link" href="/docs/guncellemeler#dogrulama">
                    Nasıl doğrulanır?
                  </Link>
                </div>
              )}
            </div>
          )}
        </Reveal>
        <Reveal className="download-aside" delay={0.1}>
          <h3>Başlamadan önce.</h3>
          {[
            {
              icon: Monitor,
              title: "Windows bilgisayar",
              text: "64 bit Windows için beta. Açılış mevcut geliştirme bilgisayarında doğrulandı; temiz Windows kurulumu ve farklı cihaz testleri henüz tamamlanmadı.",
            },
            {
              icon: KeyRound,
              title: "Bir AI bağlantısı",
              text: "Varsayılan Groq; NVIDIA ve Gemini de seçilebilir. Anahtarını masaüstü uygulamasına gir; siteye gönderilmez.",
            },
            {
              icon: Mic,
              title: "Konuşmak istersen mikrofon",
              text: "Sesli kullanım için mikrofon ve internet bağlantısı. Yazarak da devam edebilirsin.",
            },
          ].map((item) => (
            <div key={item.title} className="requirement">
              <item.icon size={18} />
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
          <Link className="text-link" href="/docs/kurulum">
            <BookOpen size={15} /> Kurulum rehberini oku <ArrowRight size={15} />
          </Link>
          <div className="notice">
            <ShieldCheck size={19} />
            <p>
              Yayımlanan dosyanın sürüm ve yayıncı bilgisini kontrol et. Veri akışını öğrenmek için{" "}
              <Link className="text-link" href="/docs/gizlilik">
                gizlilik rehberini
              </Link>{" "}
              inceleyebilirsin.
            </p>
          </div>
          {release?.url.startsWith("/downloads/") && (
            <div className="notice">
              <strong>Kod imzası bulunmayan beta</strong>
              <p>
                Bu EXE henüz dijital olarak imzalanmadı. Windows yayıncıyı doğrulayamayabilir.
                SHA-256 yalnızca dosya bütünlüğünü kontrol eder; kod imzasının yerini tutmaz.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </main>
  );
}
