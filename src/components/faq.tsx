import { Plus } from "lucide-react";
const questions = [
  [
    "Jarvis’i Merhaba diyerek nasıl açarım?",
    "Masaüstü uygulamasında Ayarlar ve AI bağlantısı bölümünden arka plan dinlemesini aç. MERHABA DE · DİNLİYOR yazısını gördüğünde pencereyi tepsiye gizle ve merhaba de. Uyandırma için uygulamanın arka planda çalışması, mikrofon erişimi ve STT akışında internet gerekir.",
  ],
  [
    "Jarvis ücretli mi?",
    "Beta uygulaması ücretsizdir. Kendi AI sağlayıcının API anahtarını kullanırsın; sağlayıcının kullanım ücretleri ve kotaları kendi hesabına bağlıdır.",
  ],
  [
    "Jarvis hangi bilgisayarlarda çalışıyor?",
    "Mevcut beta Windows x64 içindir. Açılış geliştirme bilgisayarında doğrulandı; temiz Windows kurulumu ve farklı cihaz testleri henüz tamamlanmadı. macOS ve Linux paketi sunulmuyor.",
  ],
  [
    "Kullanmak için API anahtarı gerekiyor mu?",
    "Evet. Varsayılan sağlayıcı Groq’tur; NVIDIA ve Gemini de seçilebilir. Anahtarını masaüstü uygulamasındaki Ayarlar ve AI bağlantısı bölümüne girersin. Sağlayıcı ücretleri ve limitleri hesabına bağlıdır. Ekran analizi ayrıca Gemini bağlantısı gerektirir.",
  ],
  [
    "Jarvis tamamen çevrimdışı çalışıyor mu?",
    "Hayır. Model yanıtları, konuşma tanıma ve ekran analizi dış servislere ihtiyaç duyabiliyor. Hangi verilerin gönderildiğini Gizlilik ve kontrol belgesinde okuyabilirsin.",
  ],
  [
    "Bilgisayarımda izinsiz işlem yapar mı?",
    "Jarvis isteklerine göre araçları çalıştırır. Dosya silme, terminal ve bazı sistem işlemlerinde onay katmanı vardır. Gösterilen işlemi kontrol et; özellikle önemli dosyalarla çalışırken sonuçları doğrula.",
  ],
  [
    "Uygulamayı şimdi indirebilir miyim?",
    "İndirme merkezinde güncel beta dosyasının bulunabilirliğini, boyutunu, sürümünü ve SHA-256 bilgisini görebilirsin. EXE’yi açtıktan sonra kendi API anahtarını masaüstü uygulamasına ekle.",
  ],
];
export function FAQ() {
  return (
    <div className="faq-list">
      {questions.map(([question, answer]) => (
        <details className="faq-item" name="jarvis-faq" key={question}>
          <summary>
            {question}
            <Plus size={20} aria-hidden="true" />
          </summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
