# Jarvis Web

Jarvis masaüstü asistanı için Türkçe tanıtım, indirme ve dokümantasyon sitesi.

## Teknolojiler

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Motion **12.43.0**, Lucide ve yerel sunulan Manrope/JetBrains Mono fontları. Bağımlılıklar package-lock.json ile kilitli.

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

## İlk sürümün kapsamı

- Motion ile giriş animasyonları, senaryo geçişleri ve SSS akordeonu.
- Azaltılmış hareket tercihi; JavaScript kapalıyken temel içerik ve gezinme.
- Masaüstü/mobil menüler, klavye ile arama, sekiz gerçek Türkçe belge.
- İndirme merkezi, yayın durumu, destek şablonu, 404, sitemap ve robots.
- Gerçek indirmeyi ancak eksiksiz yayın kaydıyla açan release doğrulaması.

Demo açıkça arayüz konseptidir. Ses kaydetmez veya kullanıcının bilgisayarında işlem yapmaz. Site ve masaüstü sürümünün yayın numaraları ayrıdır.

## Yayın dosyasını bağlama

`.env.example` dosyasını `.env.local` olarak kopyalayın. JARVIS_* alanları sunucuda okunur; istemciye bir API anahtarı eklenmez. Yalnızca imza/kurulum doğrulaması yapılmış son dosyanın URL, sürüm, boyut, SHA-256, tarih, yayıncı ve platform bilgilerini doldurun. Son olarak `JARVIS_RELEASE_PUBLISHED=true` yapıp yeniden build/deploy alın.

İndirme varsayılan olarak kapalıdır. Mevcut ege-assistant/dist/Jarvis.exe otomatik olarak kopyalanmadı veya yayımlanmadı. Dosya imzasının doğrulanması bu web sitesinin yaptığı bir işlem değildir; release alanlarını dolduran yayın sürecinin sorumluluğudur. Başka CDN kullanılırsa `JARVIS_DOWNLOAD_HOSTS` izin listesine tam alan adını ekleyin.

İlk gerçek paket yayınında geliştirme sürümüne göre yazılmış kurulum, güncelleme ve başlangıç belgelerini de gözden geçirin.

## İçerik ve yapı

- `src/app`: sayfalar, metadata ve route dosyaları.
- `src/components`: arayüz, arama, demo, Motion bileşenleri.
- `src/lib/docs.ts`: tür güvenli belge içeriği ve Türkçe arama.
- `src/lib/release.ts`: indirme verisi doğrulaması.
- `src/app/globals.css`: tasarım tokenları ve responsive stiller.
- `tests`: gerçek kullanıcı akışları ve release sözleşmesi.

Başlangıç sürümü belge içeriğini TypeScript veri yapısında tutar. MDX/Fumadocs, dil seçenekleri, otomatik güncelleme, gerçek yayın notları ve destek backend'i sonraki iş paketleridir. Aktif analitik veya veri toplayan destek formu yoktur.

## Production ayarları

Gerçek alan adı için `NEXT_PUBLIC_SITE_URL` tanımlayın. Site yayımlanmaya hazır olduğunda `SITE_INDEXABLE=true` yapın. Önizlemelerde indeksleme kapalı tutulmalıdır. Alan adı varsayılanı localhost'tur; doğrudan bu ayarla production'a çıkmayın.

Kaynak masaüstü projesinde değişiklik yapılmamıştır. Görsel marka ve gösterilen arayüz, web sitesi için hazırlanmış ilk tasarım çalışmasıdır.
