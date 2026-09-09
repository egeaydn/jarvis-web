# Jarvis Web

Jarvis masaüstü asistanı için Türkçe tanıtım, indirme ve dokümantasyon sitesi.

## Teknolojiler

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Motion **12.43.0**, Three.js, MDX, Lucide ve yerel sunulan Manrope/JetBrains Mono fontları. Bağımlılıklar package-lock.json ile kilitli.

## Başlatma

Node.js 24 LTS önerilir. Node 22 kullanıyorsanız en az 22.13 sürümünü kullanın.

```powershell
npm ci
npm run dev
```

Yerel adres: http://localhost:3000

```powershell
npm run lint
npm run typecheck
npm run build
npm test
```

Testler Windows'ta kurulu Microsoft Edge'i kullanır. Başka bir ortamda playwright.config.ts içindeki `channel` seçimini değiştirip Playwright Chromium kurabilirsiniz. Test yapılandırması 3000 portunda üretim sunucusu açar veya mevcut sunucuyu kullanır.

## v0.2 kapsamı

## v0.3 — gerçek masaüstü ve beta indirme

Gerçek uygulama ekranı ana sayfada perspektif, kaydırma ve duraklatılabilir hareketle gösterilir. Azaltılmış hareket tercihinde sabittir. Etkileşimli örnek komut demosu korunmuştur.

Site sürümü 0.3.0, masaüstü paket etiketi 0.1.0-beta.1’dir. `public/downloads` içinde yalnız sürümlü EXE, SHA-256 dosyası ve yayın manifesti vardır. Kişisel ayarlar, anahtarlar ve sohbet kayıtları kopyalanmaz. Mevcut paket imzasız betadır; temiz Windows ve farklı cihaz doğrulaması henüz tamamlanmadı.

Yeni EXE hazırlamak için `npm run release:prepare -- <EXE-yolu> <masaüstü-sürümü>` kullanılır. Betik dosyanın x64 PE olduğunu kontrol eder, kopyanın SHA-256 değerini doğrular ve manifesti üretir. Farklı içerikle mevcut bir sürümün üzerine yazmaz. Kod imzası ve temiz Windows testi ayrıca yürütülmelidir; betik bu kontrolleri yapmış sayılmaz.

`JARVIS_RELEASE_PUBLISHED` tanımlı değilse hazırlanan yerel paket kullanılır. `false` indirmeyi kapatır; `true` aşağıdaki HTTPS yayın yapılandırmasını seçer. Sitedeki dosyaları barındırmadan manifesti tek başına dağıtmayın. 128 MiB üzerindeki EXE için genel yayında büyük dosya destekleyen bir dağıtım alanı kullanın ve HTTPS yayın alanlarını güncelleyin.

Alan adı, halka açık barındırma, kod imzası, temiz Windows testi ve gerçek tanıtım videosu sonraki yayın adımlarıdır. Bu çalışma yerel önizlemeyi hazırlar; internete yayın yapmaz.

### v0.2’den korunanlar

- Kaydırmayla ayrılıp yeniden birleşen gerçek 3D reaktör; talep üzerine render, sınırlı piksel oranı, görünürlük takibi ve kaynak temizliği. Three.js sahne yaklaştığında yüklenir.
- Sade görünüm, azaltılmış hareket ve WebGL bağlam kaybında SVG yedek.
- On örnek komut: Türkçe arama, kategori filtresi, kopyalama ve ilgili belge bağlantısı.
- Sekiz MDX rehberi, yerel saklanan açık/koyu okuma tercihi.
- egeaydin.dev@gmail.com adresine doldurulabilir e-posta taslağı; sunucu üzerinden mesaj gönderilmez.
- Ücretsiz beta + kullanıcının kendi API anahtarı modeli. Gerçek indirme, alan adı ve video sonraki aşamada.
- Windows üzerinde lint/build/typecheck/Playwright çalıştıran GitHub Actions dosyası. Henüz uzak depoda çalıştırılmadı.

### Korunan temel işlevler

- Motion ile giriş animasyonları, senaryo geçişleri ve SSS akordeonu.
- Azaltılmış hareket tercihi; JavaScript kapalıyken temel içerik ve gezinme.
- Masaüstü/mobil menüler, klavye ile arama, sekiz gerçek Türkçe belge.
- İndirme merkezi, yayın durumu, destek şablonu, 404, sitemap ve robots.
- Gerçek indirmeyi ancak eksiksiz yayın kaydıyla açan release doğrulaması.

Demo açıkça arayüz konseptidir. Ses kaydetmez veya kullanıcının bilgisayarında işlem yapmaz. Site ve masaüstü sürümünün yayın numaraları ayrıdır.

## Yayın dosyasını bağlama

`.env.example` dosyasını `.env.local` olarak kopyalayın. JARVIS_* alanları sunucuda okunur; istemciye bir API anahtarı eklenmez. Yalnızca imza/kurulum doğrulaması yapılmış son dosyanın URL, sürüm, boyut, SHA-256, tarih, yayıncı ve platform bilgilerini doldurun. Son olarak `JARVIS_RELEASE_PUBLISHED=true` yapıp yeniden build/deploy alın.

v0.3 yerel beta dosyasıyla indirmeyi açar. Dosya imzasının doğrulanması bu web sitesinin yaptığı bir işlem değildir; yayın sürecinin sorumluluğudur. Başka CDN kullanılırsa `JARVIS_DOWNLOAD_HOSTS` izin listesine tam alan adını ekleyin.

İlk gerçek paket yayınında geliştirme sürümüne göre yazılmış kurulum, güncelleme ve başlangıç belgelerini de gözden geçirin.

## İçerik ve yapı

- `src/app`: sayfalar, metadata ve route dosyaları.
- `src/components`: arayüz, arama, demo, Motion bileşenleri.
- `src/content/docs/*.mdx`: rehberlerin tek içerik kaynağı.
- `src/content/docs/meta.json`: başlık, açıklama, grup, okuma süresi ve sıralama.
- `scripts/docs-index.mjs`: MDX bölümlerinden arama indeksi ve statik import kaydı üretir.
- `src/lib/docs.ts`: belge türleri ve Türkçe arama.
- `src/lib/release.ts`: indirme verisi doğrulaması.
- `src/app/globals.css`: tasarım tokenları ve responsive stiller.
- `tests`: gerçek kullanıcı akışları ve release sözleşmesi.

Yeni belge için MDX dosyası ve meta.json kaydı ekleyin. Her bölüm `<section className="doc-section" id="benzersiz-id">` içinde bir `## Başlık` içermeli; mevcut ID’leri koruyun. `npm run docs:index` aramayı ve kayıt dosyasını yeniler; dev/build başlangıcında otomatik çalışır. Geliştirme sırasında içerik düzenledikten sonra arama indeksini aynı komutla yenileyin. Üretilen docs-index.json ve registry.ts dosyalarını doğrudan düzenlemeyin. MDX yalnızca depodaki güvenilen yerel içerikten derlenir.

Reaktör geometrisi `src/components/reactor.tsx`, v0.2 stilleri `src/app/v2.css` içinde. Yeni komutlar `src/lib/commands.ts` dosyasına eklenebilir. Gerçek video geldiğinde içerik alanına eklenecek; şu anki demo açıkça simülasyondur. Aktif analitik veya veri toplayan destek formu yoktur.

## Production ayarları

### SEO ve GEO hazırlığı

Sayfa başlıkları, açıklamalar, canonical ve paylaşım metinleri `src/lib/seo.ts` üzerinden yönetilir. Canonical adresler yalnız geçerli bir HTTPS alan adı ayarlandığında üretilir. İndeksleme ayrıca `SITE_INDEXABLE=true` gerektirir; localhost, IP, yerel alan adı ve hatalı URL ile açılmaz. Yerel önizlemede noindex ve robots disallow korunur, sitemap boş kalır.

Ana sayfada WebSite, indirmede SoftwareApplication, belgelerde TechArticle ve alan adı bağlandığında BreadcrumbList JSON-LD bulunur. Şemalar puan, değerlendirme veya doğrulanmamış sertifika içermez. SSS yanıtları ilk HTML’de bulunur ve JavaScript olmadan açılır. Belge tarihleri `meta.json` içindeki gerçek editoryal güncelleme tarihleridir; her build sırasında ileri alınmaz.

Yayın sırası: gerçek HTTPS alan adını `NEXT_PUBLIC_SITE_URL` ile ayarla; Google Search Console ve Bing Webmaster Tools hesaplarından verilen doğrulama değerlerini `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` alanlarına ekle; önizleme yerine gerçek yayında `SITE_INDEXABLE=true` yapıp build al. HTTP/www varyantlarını hosting üzerinde tek HTTPS adrese yönlendir. robots, canonical ve sitemap adreslerini canlı yayında kontrol et, sitemap’i hesaplara gönder. Alan adı veya hesap doğrulaması bu yerel çalışmada yapılmadı.

`npm run test:seo` yerel önizleme modunda HTTP çıktısını denetler; tarayıcı açmaz. Alan adı ayarlanmamış, indekslemeye kapalı bir test sunucusu bekler. Canlı Core Web Vitals, arama sıralaması, indeks kapsamı ve AI atıfları bu testin ölçümü değildir. Yayın sonrasında Search Console ve Bing AI Performance üzerinden başlangıç verisi toplanmalıdır.

GEO için özel bir dosya veya görünürlük garantisi varsayılmaz. Kaynaklar: [Google AI özellikleri](https://developers.google.com/search/docs/appearance/ai-features), [Bing AI Performance](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview). Sonraki içerik geliştirmeleri gerçek kullanım örnekleri, kullanıcının sağlayacağı tanıtım videosu ve geri bildirimlerle belgelerin güncellenmesidir.

Gerçek alan adı için `NEXT_PUBLIC_SITE_URL` tanımlayın. Site yayımlanmaya hazır olduğunda `SITE_INDEXABLE=true` yapın. Önizlemelerde indeksleme kapalı tutulmalıdır. Alan adı varsayılanı localhost'tur; doğrudan bu ayarla production'a çıkmayın.

Kaynak masaüstü projesinde değişiklik yapılmamıştır. Görsel marka ve gösterilen arayüz, web sitesi için hazırlanmış ilk tasarım çalışmasıdır.
