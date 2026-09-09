"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const chapters = [
  {
    time: 2.5,
    stamp: "00:03",
    title: "Uygulama açma",
    text: "Bir istek yaz. Jarvis’in işlem kaydını ve yanıtını gör.",
  },
  {
    time: 18.167,
    stamp: "00:18",
    title: "Sistem bilgileri",
    text: "İşlemci, bellek ve disk durumunu sohbetten öğren.",
  },
  {
    time: 38.833,
    stamp: "00:39",
    title: "Kendi tercihlerin",
    text: "AI sağlayıcısını, animasyonu ve dinleme seçeneklerini incele.",
  },
];

export function ProductVideo() {
  const player = useRef<HTMLVideoElement>(null);
  const pendingTime = useRef<number | null>(null);
  const [message, setMessage] = useState("");
  async function goTo(time: number) {
    const video = player.current;
    if (!video) return;
    setMessage("");
    if (video.readyState < 1) {
      pendingTime.current = time;
      video.load();
    } else video.currentTime = time;
    try {
      await video.play();
    } catch {
      setMessage("Videoyu başlatmak için oynat düğmesini kullanabilirsin.");
    }
  }
  return (
    <section
      id="kullanim-videosu"
      className="container product-video section"
      aria-labelledby="video-title"
    >
      <div className="section-topline">
        <span className="eyebrow">JARVIS İŞ BAŞINDA</span>
        <span className="tiny-label">60 SANİYE · GERÇEK EKRAN KAYDI</span>
      </div>
      <div className="section-heading">
        <h2 id="video-title">
          Birlikte neler
          <br />
          <span>yapabileceğinizi gör.</span>
        </h2>
        <p>
          İki gerçek kullanım kaydından kısa bir tur.
          <br />
          Uygulama aç, sistemini tanı, tercihlerini seç.
        </p>
      </div>
      <div className="video-layout">
        <div>
          <video
            ref={player}
            controls
            playsInline
            preload="none"
            width="1280"
            height="960"
            poster="/videos/jarvis-kullanim-poster.jpg"
            aria-label="Jarvis gerçek kullanım videosu"
            aria-describedby="video-note"
            onLoadedMetadata={() => {
              if (pendingTime.current !== null && player.current) {
                player.current.currentTime = pendingTime.current;
                pendingTime.current = null;
              }
            }}
            onError={() =>
              setMessage("Video yüklenemedi. Aşağıdaki MP4 bağlantısını kullanabilirsin.")
            }
          >
            <source src="/videos/jarvis-kullanim.mp4" type="video/mp4" />
            <track
              src="/videos/jarvis-kullanim.tr.vtt"
              kind="captions"
              srcLang="tr"
              label="Türkçe ekran açıklamaları"
            />
            Tarayıcın video oynatmayı desteklemiyor.{" "}
            <a href="/videos/jarvis-kullanim.mp4">MP4 dosyasını aç.</a>
          </video>
          <p id="video-note" className="video-note">
            Sessiz ekran kaydı. Yazma ve bekleme sürelerinin bazıları 2× veya 3× hızlandırıldı; hız
            ekranda belirtilir.
          </p>
          <p role="status">{message}</p>
        </div>
        <div className="video-chapters">
          <span className="eyebrow">BİR BÖLÜMDEN BAŞLA</span>
          {chapters.map((chapter) => (
            <button key={chapter.time} onClick={() => goTo(chapter.time)}>
              <span className="chapter-time">
                <Play size={13} />
                {chapter.stamp}
              </span>
              <strong>{chapter.title}</strong>
              <span>{chapter.text}</span>
            </button>
          ))}
          <Link href="/download" className="text-link">
            Windows beta sürümünü indir <ArrowRight size={15} />
          </Link>
          <a className="text-link" href="/videos/jarvis-kullanim.mp4" download>
            Videoyu indir · 2,6 MB
          </a>
        </div>
      </div>
      <details className="video-transcript">
        <summary>Videonun yazılı açıklamasını oku</summary>
        <p>
          Jarvis’e Microsoft Word’ü açması için yazılı bir istek gönderilir; uygulama işlem kaydını
          ve yanıtını gösterir. Ardından bilgisayarın sistem bilgileri istenir ve işlemci, bellek,
          disk kullanımı görüntülenir. İkinci kayıtta AI sağlayıcı menüsü, reaktör animasyonu ve
          arka planda dinleme seçenekleri incelenir. Ayarlar kaydedilerek sohbete dönülür. Videoda
          sesli komut gösterimi bulunmaz.
        </p>
      </details>
    </section>
  );
}
