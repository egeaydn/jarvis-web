export type DocSection = {
  id: string;
  title: string;
  body: string[];
  code?: string;
  note?: string;
};
export type Doc = {
  slug: string;
  title: string;
  description: string;
  group: string;
  time: string;
  sections: DocSection[];
};
export const docs: Doc[] = [
  {
    slug: "baslangic",
    title: "Jarvis ile tanış",
    description: "Masaüstü asistanını tanı. İlk komutuna buradan başla.",
    group: "Başlarken",
    time: "3 dk",
    sections: [
      {
        id: "nedir",
        title: "Bilgisayarınla konuşmanın başka bir yolu",
        body: [
          "Jarvis, Windows için geliştirilen Türkçe bir masaüstü yapay zekâ asistanıdır. Bir isteği yazabilir veya mikrofonla söyleyebilirsin. Jarvis uygun araçları seçerek uygulama açma, dosya bulma ve not alma gibi işlemleri gerçekleştirir.",
          "Bu sitedeki etkileşimli önizleme örnek senaryolar gösterir; bilgisayarında işlem yapmaz.",
        ],
      },
      {
        id: "gerekenler",
        title: "Başlamadan önce",
        body: [
          "Windows bilgisayar, internet bağlantısı ve desteklenen model sağlayıcılarından birine ait API anahtarı gerekir. Sesli kullanım için mikrofon gerekir; yazılı kullanım da mevcuttur.",
          "Halka açık dağıtım paketi hazırlık aşamasındadır. Doğrulanmış sistem gereksinimleri ve sürüm bilgileri indirme merkezinde yayımlanacaktır.",
        ],
      },
      {
        id: "ilk-komut",
        title: "Küçük bir istekle başla",
        body: [
          "Kolayca doğrulayabileceğin bir komut dene. Sonucu uygulamanın yanıtından ve bilgisayarındaki değişiklikten kontrol et.",
        ],
        code: "Sistem bilgilerimi göster.\nBir not al: yarın proje taslağını gözden geçir.\nHesap makinesini aç.",
      },
      {
        id: "kontrol",
        title: "Kontrol sende",
        body: [
          "Dosya silme, terminal komutu ve bazı sistem işlemleri için onay mekanizması vardır. Gösterilen işlemi kontrol ederek karar ver. Karmaşık istekleri küçük adımlara ayırmak sonucu takip etmeyi kolaylaştırır.",
        ],
      },
    ],
  },
  {
    slug: "kurulum",
    title: "Windows kurulumu",
    description: "Dağıtım durumu ve kaynak koddan geliştirme kurulumu.",
    group: "Başlarken",
    time: "5 dk",
    sections: [
      {
        id: "paket",
        title: "İndirilebilir sürüm",
        body: [
          "Genel kullanıma yönelik paket bu sitede henüz yayımlanmadı. Dosya doğrulaması tamamlandığında indirme merkezinde yer alacak.",
        ],
        note: "Aşağıdaki adımlar ege-assistant kaynak koduna sahip geliştiriciler içindir. Son kullanıcı kurulum paketiyle aynı süreç değildir.",
      },
      {
        id: "ortam",
        title: "Geliştirme ortamını hazırla",
        body: [
          "Python 3.12 veya üzerini kur. Windows terminalinde ege-assistant proje klasörüne geç. Komutları bu klasörde çalıştır.",
        ],
        code: "python -m venv .venv\n.\\.venv\\Scripts\\python.exe -m pip install -r requirements.txt",
      },
      {
        id: "ayarlar",
        title: "Model bağlantısını yapılandır",
        body: [
          ".env.example dosyasını .env olarak kopyala. Seçtiğin sağlayıcının anahtarını kendi bilgisayarında ekle; kaynak kod deposuna koyma.",
          "Mevcut uygulama başlangıçta model bağlantısını oluşturur. Yapılandırma olmadığında arayüz açılmadan hata verebilir.",
        ],
        code: "Copy-Item .env.example .env",
      },
      {
        id: "calistir",
        title: "Uygulamayı başlat",
        body: [
          "Grafik arayüz için ilk komutu kullan. Terminalde yazılı veya sesli etkileşim için alternatif modlar bulunur.",
        ],
        code: ".\\.venv\\Scripts\\python.exe main.py\n.\\.venv\\Scripts\\python.exe main.py --text\n.\\.venv\\Scripts\\python.exe main.py --voice",
      },
    ],
  },
  {
    slug: "saglayicilar",
    title: "AI sağlayıcıları",
    description: "NVIDIA, Groq ve Gemini bağlantını yapılandır.",
    group: "Başlarken",
    time: "4 dk",
    sections: [
      {
        id: "secim",
        title: "Kendi sağlayıcını seç",
        body: [
          "NVIDIA, Groq ve Gemini seçenekleri LLM_PROVIDER ile seçilir. Kullanım limitleri ve olası ücretler sağlayıcı hesabına bağlıdır. Site anahtarını istemez; mevcut geliştirme kurulumunda bilgisayarındaki .env dosyasına girilir.",
        ],
      },
      {
        id: "degiskenler",
        title: "Ortam değişkenleri",
        body: [
          "Aşağıdaki değerler örnektir, gerçek anahtar içermez. Ana sağlayıcı için nvidia, groq veya gemini seç.",
        ],
        code: "LLM_PROVIDER=nvidia\nNVIDIA_API_KEY=kendi_anahtarin\n\n# İlgili sağlayıcıyı kullanacaksan:\nGROQ_API_KEY=kendi_anahtarin\nGEMINI_API_KEY=kendi_anahtarin",
      },
      {
        id: "gorsel",
        title: "Ekran analizi",
        body: [
          "Ekran analizi Gemini bağlantısını kullanır. Ana sohbet sağlayıcın farklı olsa da ilgili Gemini yapılandırması gerekir. Ekran görüntüsü alma ile görüntüyü modele gönderme farklı işlemlerdir.",
        ],
      },
      {
        id: "hatalar",
        title: "Bağlantı kontrolü",
        body: [
          "Anahtar hatasında değişken adını, kota hatasında hesap limitlerini, ağ hatasında internet erişimini kontrol et. Yapılandırmayı değiştirdikten sonra uygulamayı yeniden başlat.",
        ],
      },
    ],
  },
  {
    slug: "sesli-kullanim",
    title: "Sesli kullanım",
    description: "Mikrofon, uyandırma kelimesi ve sesli yanıtlar.",
    group: "Kullanım",
    time: "4 dk",
    sections: [
      {
        id: "mikrofon",
        title: "Mikrofonunu hazırla",
        body: [
          "Windows ses ayarlarından giriş cihazını ve masaüstü uygulamalarının mikrofon erişimini kontrol et. Cihazı kullanan başka bir uygulama varsa kapatıp tekrar dene.",
        ],
      },
      {
        id: "dinleme",
        title: "Yazarak veya konuşarak",
        body: [
          "Arayüzün mikrofon kontrolünü kullan. Terminalde --voice modu Enter ile dinlemeyi başlatır. Net ve kısa bir komut söyle. Sesli yanıt için sistem seslendirmesi kullanılır; ses düzeyini ve çıkış cihazını kontrol et.",
        ],
      },
      {
        id: "uyandirma",
        title: "Hey Jarvis",
        body: [
          "İsteğe bağlı Porcupine ve STT tabanlı alternatif uyandırma akışı bulunur. Porcupine uygun erişim anahtarı ve kelime dosyası gerektirir.",
          "Yerel kelime doğrulaması bütün ses zincirinin yerel olduğu anlamına gelmez. Mevcut STT ve alternatif uyandırma akışında Google üzerinden tanıma yapılabilir.",
        ],
      },
      {
        id: "ipuclari",
        title: "Daha iyi sonuç almak için",
        body: [
          "İlk kalibrasyonda sessiz kal. Doğal konuş ve önceki yanıtın bitmesini bekle. Ses sorunu yaşarsan yazılı komutla devam edebilirsin.",
        ],
      },
    ],
  },
  {
    slug: "komutlar",
    title: "Komut rehberi",
    description: "Günlük işlerine uyarlayabileceğin örnek istekler.",
    group: "Kullanım",
    time: "4 dk",
    sections: [
      {
        id: "uygulamalar",
        title: "Uygulamalar ve tarayıcı",
        body: [
          "İsteğini doğal Türkçeyle yaz. Uygulama bilgisayarında kurulu olmalı; web araması tarayıcıda açılır.",
        ],
        code: "Hesap makinesini aç.\nWeb'de Python dokümantasyonunu ara.\nÇalışan uygulamaları göster.",
      },
      {
        id: "dosyalar",
        title: "Dosyalarına ulaş",
        body: [
          "Dosya adını veya yolu açıkça belirt. Taşıma ve silme isteklerinde kaynağı ve hedefi kontrol et.",
        ],
        code: "İndirilenler klasörünü listele.\nrapor.pdf dosyasını bul.\nMasaüstünde Proje Notları adlı bir klasör oluştur.",
      },
      {
        id: "notlar",
        title: "Aklındakileri kaydet",
        body: [
          "Not tutabilir, notlarını arayabilir veya zamanı belirterek hatırlatıcı isteyebilirsin. Hatırlatıcı için uygulama açık olmalı.",
        ],
        code: "Bir not al: tasarım için açık yeşil vurgu kullan.\nTasarım hakkındaki notlarımı bul.\n10 dakika sonra mola vermemi hatırlat.",
      },
      {
        id: "ekran",
        title: "Ekran hakkında yardım al",
        body: [
          "Analiz için ekran görüntüsü dış sağlayıcıya gönderilir. Paylaşmak istemediğin içerikleri önceden kapat.",
        ],
        code: "Ekrandaki hata mesajını açıkla.",
      },
    ],
  },
  {
    slug: "gizlilik",
    title: "Gizlilik ve kontrol",
    description: "Hangi veri nerede işlenir? Kontrollerini tanı.",
    group: "Kullanım",
    time: "5 dk",
    sections: [
      {
        id: "veri",
        title: "Model bağlantısı",
        body: [
          "Sohbet istekleri ve araç sonuçları seçili sağlayıcıya gönderilebilir. Sonuçlarda dosya adları, yollar veya içerik bulunabilir. Jarvis'in bütün işlevleri çevrimdışı çalışmaz.",
        ],
      },
      {
        id: "ses",
        title: "Ses ve ekran",
        body: [
          "Konuşma tanıma Google üzerinden, ekran analizi Gemini üzerinden çalışır. STT tabanlı uyandırmada da ses dış servise gönderilebilir.",
          "Web sitesindeki demo ses kaydetmez, ekranını okumaz ve bilgisayarında komut yürütmez.",
        ],
      },
      {
        id: "yerel",
        title: "Yerel kayıtlar",
        body: [
          "Geliştirme sürümü sohbet, araç, not, hatırlatıcı ve pano geçmişini data dizininde saklayabilir. Mevcut başlangıç pano dinleyicisini başlatır.",
          "Halka açık paket öncesinde pano tercihi, veri silme ve kalıcı dizin davranışlarının doğrulanması planlanıyor. Bu kontrollerin tamamlandığı varsayılmamalı.",
        ],
      },
      {
        id: "onay",
        title: "İşlem onayları",
        body: [
          "Dosya silme, terminal, kayıt defteri ve bazı sistem işlemlerinde onay katmanı bulunur. Gösterilen işlemi incele. Reddedilen bir işlemin yürütülmesi hata olarak ele alınmalıdır.",
        ],
      },
    ],
  },
  {
    slug: "sorun-giderme",
    title: "Sorun giderme",
    description: "Bağlantı, açılış ve ses sorunları için kontrol adımları.",
    group: "Yardım",
    time: "5 dk",
    sections: [
      {
        id: "acilis",
        title: "Uygulama açılmıyor",
        body: [
          "Terminalden başlatıp hata çıktısını oku. .env dosyasının konumunu, LLM_PROVIDER değerini ve anahtarı kontrol et. Bağımlılıkların aynı sanal ortamda kurulu olduğunu doğrula.",
        ],
      },
      {
        id: "ses",
        title: "Mikrofon algılanmıyor",
        body: [
          "Windows giriş cihazını ve izinleri kontrol et. Cihazı kullanan uygulamaları kapat. Yeniden başlatıp yazılı modla sorunun yalnızca seste olup olmadığını ayırt et.",
        ],
      },
      {
        id: "kota",
        title: "Yanıt veya kota hatası",
        body: [
          "İnternet bağlantısını, hesap kullanım limitlerini ve model erişimini incele. Kota sınırı model sağlayıcısının hesabına bağlıdır.",
        ],
      },
      {
        id: "bildirim",
        title: "Sorunu kaydet",
        body: [
          "Uygulama/Windows sürümünü, sağlayıcı adını, tekrarlama adımlarını ve beklenen/gerçek sonucu not al. API anahtarı, pano veya özel konuşma paylaşma. Destek sayfasındaki şablonu kullanabilirsin.",
        ],
      },
    ],
  },
  {
    slug: "guncellemeler",
    title: "Sürümler ve güncelleme",
    description: "Yayın durumunu ve güncelleme yaklaşımını takip et.",
    group: "Yardım",
    time: "2 dk",
    sections: [
      {
        id: "durum",
        title: "İlk dağıtım hazırlanıyor",
        body: [
          "Doğrulanmış genel kullanım paketi henüz yayımlanmadı. Yeni sürümler indirme merkezi ve sürüm notlarında duyurulacak. Örnek arayüz bir sürüm yayımlandığı anlamına gelmez.",
        ],
      },
      {
        id: "dogrulama",
        title: "Doğru dosyayı seç",
        body: [
          "Sürüm, platform ve yayıncı bilgilerini incele. SHA-256 dosya bütünlüğünü kontrol eder; yayıncı kimliğini doğrulayan kod imzasından farklıdır.",
        ],
      },
      {
        id: "yukseltme",
        title: "Güncellemeden önce",
        body: [
          "Sürüm notlarını ve veri taşıma adımlarını oku. Otomatik güncelleme bu sitede sunulmaz. Paket yayımlandığında geçiş adımları burada açıklanacak.",
        ],
      },
    ],
  },
];
export const docGroups = ["Başlarken", "Kullanım", "Yardım"];
export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}
export function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i");
}
export function searchDocs(query: string) {
  const terms = normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return docs.slice(0, 5);
  return docs.filter((doc) => {
    const text = normalizeSearch(
      [doc.title, doc.description, ...doc.sections.flatMap((s) => [s.title, ...s.body])].join(" "),
    );
    return terms.every((term) => text.includes(term));
  });
}
