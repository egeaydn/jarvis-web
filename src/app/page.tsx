import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  BookOpen,
  Check,
  ChevronRight,
  FolderOpen,
  Globe,
  Mic,
  Monitor,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Orbit } from "@/components/orbit";
import { AssistantDemo } from "@/components/assistant-demo";
import { FAQ } from "@/components/faq";

const features = [
  {
    n: "01",
    icon: Mic,
    title: "Aklından geçeni söyle.",
    description:
      "Yazmak istemediğinde konuş. Türkçe sesli komutlarla bilgisayarınla doğal bir diyalog kur.",
    tag: "SESLİ ETKİLEŞİM",
    href: "/docs/sesli-kullanim",
  },
  {
    n: "02",
    icon: FolderOpen,
    title: "Her şey, elinin altında.",
    description:
      "Dosyalarını bul, klasörlerini listele. Aradığın şeye ulaşmak için menüler arasında kaybolma.",
    tag: "DOSYA YÖNETİMİ",
    href: "/docs/komutlar#dosyalar",
  },
  {
    n: "03",
    icon: Monitor,
    title: "Masaüstün, senin ritminde.",
    description:
      "Uygulamalarını aç, pencerelerini yönet. Günlük tekrarlarını birkaç kelimeye indir.",
    tag: "BİLGİSAYAR KONTROLÜ",
    href: "/docs/komutlar#uygulamalar",
  },
  {
    n: "04",
    icon: Sparkles,
    title: "Ekranına bir de birlikte bak.",
    description:
      "Bir hata mesajı veya karmaşık bir ekran. Gördüklerini anlamlandırmak için yardım iste.",
    tag: "EKRAN ANALİZİ",
    href: "/docs/komutlar#ekran",
  },
  {
    n: "05",
    icon: NotebookPen,
    title: "İyi fikirleri kaçırma.",
    description:
      "Aklına geleni not al. Bir hatırlatıcı kur. Zihninde yer aç, yaptığın işe odaklan.",
    tag: "NOTLAR VE HATIRLATICILAR",
    href: "/docs/komutlar#notlar",
  },
  {
    n: "06",
    icon: Globe,
    title: "Merak ettiğin yerden başla.",
    description: "Tarayıcını aç, web'de bir konu ara. Bir sorudan bir sonraki adımına kolayca geç.",
    tag: "WEB VE TARAYICI",
    href: "/docs/komutlar#uygulamalar",
  },
];
export default function Home() {
  return (
    <main id="main">
      <section className="hero container">
        <div className="hero-main">
          <Reveal className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="status-dot" /> BİLGİSAYARINLA AYNI DİLİ KONUŞ
            </div>
            <h1>
              Daha az tıkla.
              <br />
              <span>Daha fazlasını</span>
              <br />
              <em>yap.</em>
            </h1>
            <p className="hero-description">
              Bilgisayarın için yeni bir alışkanlık.
              <br />
              Uygulamalarını aç, dosyalarına ulaş, aklındakini söyle.
              <br className="desktop-break" /> Gerisini Jarvis’le birlikte hallet.
            </p>
            <div className="hero-buttons">
              <Link className="button button-primary" href="/download">
                <Monitor size={18} /> Windows için indir <ArrowUpRight size={18} />
              </Link>
              <Link className="button button-ghost" href="/docs/baslangic">
                Jarvis’i tanı <ArrowRight size={17} />
              </Link>
            </div>
            <div className="hero-meta">
              <span>WINDOWS İÇİN</span>
              <i />
              <span>TÜRKÇE</span>
              <i />
              <span>KENDİ API ANAHTARINLA</span>
            </div>
          </Reveal>
          <Orbit />
        </div>
        <Reveal delay={0.15}>
          <AssistantDemo />
        </Reveal>
        <div className="hero-bottom">
          <span>BİR ASİSTANDAN DAHA FAZLASI. YENİ BİR ÇALIŞMA BİÇİMİ.</span>
          <a href="#ozellikler" aria-label="Yetenekleri keşfet">
            <ArrowDown size={16} />
          </a>
        </div>
      </section>
      <section className="features-section section" id="ozellikler">
        <div className="container">
          <Reveal>
            <div className="section-topline">
              <span className="eyebrow">01 / YETENEKLER</span>
              <span className="tiny-label">DAHA AZ UĞRAŞ. DAHA ÇOK ODAK.</span>
            </div>
            <div className="section-heading">
              <h2>
                Bir cümleyle başlayan
                <br />
                <span>bir sürü olasılık.</span>
              </h2>
              <p>
                Küçük işleri kolaylaştıran araçlar.
                <br />
                Asıl yapmak istediklerine daha çok alan.
              </p>
            </div>
          </Reveal>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <Reveal key={feature.n} delay={(index % 3) * 0.06}>
                <Link className="feature-card" href={feature.href}>
                  <div className="feature-top">
                    <feature.icon size={25} strokeWidth={1.4} />
                    <span>{feature.n}</span>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="feature-bottom">
                    <span>{feature.tag}</span>
                    <ArrowUpRight size={17} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="workflow-section section" id="nasil-calisir">
        <div className="container">
          <Reveal>
            <div className="section-topline">
              <span className="eyebrow">02 / NASIL ÇALIŞIR?</span>
              <AudioLines size={24} />
            </div>
            <div className="section-heading">
              <h2>
                Karmaşık işler.
                <br />
                <span>Doğal bir başlangıç.</span>
              </h2>
              <p>
                Yeni komutlar ezberleme.
                <br />
                Ne istediğini kendi kelimelerinle anlat.
              </p>
            </div>
          </Reveal>
          <div className="workflow-grid">
            {[
              {
                n: "01",
                icon: Monitor,
                title: "Jarvis’e yer aç.",
                text: "Windows sürümünü kur. Masaüstündeki yeni yardımcınla tanış.",
              },
              {
                n: "02",
                icon: Terminal,
                title: "Bağlantını kur.",
                text: "AI sağlayıcını seç, kendi API anahtarını ekle. İstersen mikrofonunu hazırla.",
              },
              {
                n: "03",
                icon: AudioLines,
                title: "Söyle, başlayalım.",
                text: "Bir komut yaz veya seslen. Jarvis’in adımlarını takip et, gerektiğinde onay ver.",
              },
            ].map((step, index) => (
              <Reveal key={step.n} delay={index * 0.1}>
                <div className="workflow-step">
                  <span className="step-number">{step.n}</span>
                  <step.icon size={26} strokeWidth={1.3} />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Link className="text-link" href="/docs/kurulum">
            Kurulum rehberine göz at <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="trust-section container">
        <Reveal className="trust-panel">
          <div className="trust-visual" aria-hidden="true">
            <div className="shield-rings" />
            <ShieldCheck size={74} strokeWidth={1} />
            <span>SON SÖZ SENİN.</span>
          </div>
          <div className="trust-copy">
            <span className="eyebrow">03 / GÜVEN VE KONTROL</span>
            <h2>
              Yardımcı olan bir AI.
              <br />
              <span>Karar veren sensin.</span>
            </h2>
            <p>
              Jarvis isteklerinle hareket eder. Önemli dosya ve sistem işlemlerinde onay ister.
              Hangi verinin nerede işlendiğini bilerek kullan.
            </p>
            <div className="trust-points">
              <span>
                <Check size={15} /> İşlem öncesi onay
              </span>
              <span>
                <Check size={15} /> Kendi sağlayıcı hesabın
              </span>
            </div>
            <Link className="text-link" href="/docs/gizlilik">
              Veri ve gizlilik yaklaşımını oku <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
      <section className="docs-teaser section container">
        <Reveal>
          <span className="eyebrow">04 / KEŞFETMEYE DEVAM ET</span>
          <div className="section-heading">
            <h2>
              İlk “merhaba”dan
              <br />
              <span>ileri adımlara.</span>
            </h2>
            <Link className="text-link" href="/docs/baslangic">
              Tüm belgeler <ArrowUpRight size={17} />
            </Link>
          </div>
        </Reveal>
        <div className="guide-grid">
          {[
            {
              href: "/docs/baslangic",
              icon: BookOpen,
              tag: "BAŞLANGIÇ",
              title: "Jarvis ile tanış",
              text: "İlk komutuna giden en kısa yol.",
              time: "3 dk",
            },
            {
              href: "/docs/komutlar",
              icon: CommandIcon,
              tag: "İLHAM AL",
              title: "Neler söyleyebilirsin?",
              text: "Günlük işlerin için örnek komutlar.",
              time: "4 dk",
            },
            {
              href: "/docs/saglayicilar",
              icon: Terminal,
              tag: "YAPILANDIRMA",
              title: "Bağlantını kendin seç",
              text: "AI sağlayıcını adım adım bağla.",
              time: "4 dk",
            },
          ].map((guide) => (
            <Link className="guide-card" href={guide.href} key={guide.href}>
              <div className="guide-top">
                <guide.icon size={23} strokeWidth={1.4} />
                <ArrowUpRight size={17} />
              </div>
              <span className="eyebrow">{guide.tag}</span>
              <h3>{guide.title}</h3>
              <p>{guide.text}</p>
              <span className="guide-time">
                {guide.time} okuma <ChevronRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="faq-section section container">
        <Reveal>
          <span className="eyebrow">05 / AKLINDAKİLER</span>
          <h2>Birkaç iyi soru.</h2>
          <p>Başlamadan önce bilmek isteyebileceklerin.</p>
          <Link className="text-link" href="/support">
            Yardım merkezi <ArrowUpRight size={16} />
          </Link>
        </Reveal>
        <FAQ />
      </section>
      <section className="final-cta container">
        <Reveal>
          <div className="eyebrow">
            <span className="status-dot" /> BİR SONRAKİ ADIMIN
          </div>
          <h2>
            Birlikte, <em>daha fazlası.</em>
          </h2>
          <p>Masaüstünle yeni bir diyalog başlat.</p>
          <Link className="button button-primary" href="/download">
            Jarvis’i keşfet <ArrowUpRight size={18} />
          </Link>
          <span className="cta-note">Windows için geliştiriliyor · İlk dağıtım hazırlanıyor</span>
        </Reveal>
      </section>
    </main>
  );
}
function CommandIcon({ size, strokeWidth }: { size?: number; strokeWidth?: number }) {
  return <Terminal size={size} strokeWidth={strokeWidth} />;
}
