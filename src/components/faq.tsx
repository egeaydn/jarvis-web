"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
const questions = [
  [
    "Jarvis hangi bilgisayarlarda çalışıyor?",
    "Jarvis Windows için geliştiriliyor. Halka açık paketle birlikte doğrulanmış Windows sürümleri ve donanım gereksinimleri indirme merkezinde paylaşılacak. macOS ve Linux paketi şu anda sunulmuyor.",
  ],
  [
    "Kullanmak için API anahtarı gerekiyor mu?",
    "Mevcut uygulama kendi NVIDIA, Groq veya Gemini API anahtarınla çalışıyor. Sağlayıcı kullanım ücretleri ve limitleri hesabına bağlı. Ekran analizi için ayrıca Gemini bağlantısı gerekiyor.",
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
    "Halka açık dağıtım paketi hazırlanıyor. Doğrulanmış dosya yayımlandığında indirme merkezi üzerinden erişebileceksin. Kaynak koduna sahipsen geliştirme kurulumu belgelerini şimdiden okuyabilirsin.",
  ],
];
export function FAQ() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="faq-list">
      {questions.map(([question, answer], index) => (
        <div className={`faq-item ${active === index ? "open" : ""}`} key={question}>
          <h3>
            <button
              onClick={() => setActive(active === index ? null : index)}
              aria-expanded={active === index}
              aria-controls={active === index ? `faq-${index}` : undefined}
            >
              {question}
              <Plus size={20} />
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {active === index && (
              <motion.div
                id={`faq-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p>{answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
