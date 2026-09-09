import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "./brand";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link href="/" className="brand">
            <BrandMark />
            <span>
              jarvis<span className="brand-dot">.</span>
            </span>
          </Link>
          <p>
            Biraz daha az tık.
            <br />
            Biraz daha fazla olasılık.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span className="eyebrow">KEŞFET</span>
            <Link href="/#ozellikler">Yetenekler</Link>
            <Link href="/download">Jarvis’i indir</Link>
            <Link href="/changelog">Sürüm notları</Link>
          </div>
          <div>
            <span className="eyebrow">ÖĞREN</span>
            <Link href="/docs/baslangic">Dokümantasyon</Link>
            <Link href="/commands">Komut kataloğu</Link>
            <Link href="/support">
              Yardım merkezi <ArrowUpRight size={12} />
            </Link>
          </div>
          <div>
            <span className="eyebrow">KONTROL SENDE</span>
            <Link href="/docs/gizlilik">Veri ve gizlilik</Link>
            <Link href="/docs/saglayicilar">AI sağlayıcıları</Link>
            <Link href="/docs/guncellemeler">Yayın durumu</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Jarvis · Ege Aydın / Ege Assistant</span>
        <span className="footer-signoff">
          <i /> Türkçe düşün. Doğal konuş.
        </span>
      </div>
    </footer>
  );
}
