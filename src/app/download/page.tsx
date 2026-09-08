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
export const metadata: Metadata = {
  title: "Windows için indir",
  description: "Jarvis Windows dağıtımı, sürüm bilgileri, gereksinimler ve kurulum rehberi.",
};
export default function DownloadPage() {
  const release = getRelease();
  return (
    <main id="main" className="container">
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
          <p>
            {release
              ? "Yayımlanmış sürümü indir. Başlamadan önce platform gereksinimlerini ve kurulum adımlarını incele."
              : "İlk herkese açık sürüm için son hazırlıklar. Kurulum ve dosya doğrulamaları tamamlandığında buradan indirebileceksin."}
          </p>
          {release ? (
            <a className="button button-primary" href={release.url}>
              <Download size={17} /> Windows için indir <ArrowUpRight size={17} />
            </a>
          ) : (
            <button className="button button-disabled" disabled>
              <Download size={17} /> İndirme yakında açılacak
            </button>
          )}
          <p className="download-note">
            {release
              ? "Dosya resmi dağıtım adresinden indirilir."
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
            </div>
          )}
        </Reveal>
        <Reveal className="download-aside" delay={0.1}>
          <h3>Başlamadan önce.</h3>
          {[
            {
              icon: Monitor,
              title: "Windows bilgisayar",
              text: "İlk dağıtım Windows için hazırlanıyor. Kesin sistem gereksinimleri paketle birlikte açıklanacak.",
            },
            {
              icon: KeyRound,
              title: "Bir AI bağlantısı",
              text: "NVIDIA, Groq veya Gemini hesabın ve API anahtarın. Kullanım limitleri sağlayıcına bağlı.",
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
        </Reveal>
      </div>
    </main>
  );
}
