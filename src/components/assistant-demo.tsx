"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUp,
  AudioLines,
  Check,
  ChevronRight,
  Command,
  FolderOpen,
  MessageSquare,
  Monitor,
  NotebookPen,
  Sparkles,
} from "lucide-react";
import { BrandMark } from "./brand";
const scenarios = [
  {
    title: "Güne başla",
    icon: Monitor,
    prompt: "Jarvis, çalışma ortamımı hazırla.",
    response: "Birlikte başlayalım. İstediğin uygulamalar hazır.",
    items: ["Tarayıcı açıldı", "Not defteri açıldı", "Sistem bilgileri kontrol edildi"],
    hint: "UYGULAMA KONTROLÜ",
  },
  {
    title: "Dosyalarını bul",
    icon: FolderOpen,
    prompt: "İndirilenler klasöründeki PDF dosyalarını göster.",
    response: "Dosyaların burada. Hangisiyle devam edelim?",
    items: ["proje-sunumu.pdf", "tasarim-notlari.pdf", "haftalik-plan.pdf"],
    hint: "DOSYA YÖNETİMİ",
  },
  {
    title: "Aklındakini kaydet",
    icon: NotebookPen,
    prompt: "Bir not al: yarın yeni projenin tasarımına başla.",
    response: "Notunu kaydettim. İstediğin zaman tekrar bulabiliriz.",
    items: [
      "Yarın yeni projenin tasarımına başla",
      "Notlar koleksiyonuna eklendi",
      "“Notlarımı göster” diyerek ulaşabilirsin",
    ],
    hint: "GÜNLÜK ÜRETKENLİK",
  },
];
export function AssistantDemo() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const scenario = scenarios[active];
  return (
    <div className="demo-wrap" id="demo">
      <div className="demo-caption">
        <span>
          <span className="status-dot" /> ETKİLEŞİMLİ ÖNİZLEME
        </span>
        <span>Bir senaryo seç. Olasılıkları keşfet.</span>
      </div>
      <div className="assistant-window">
        <div className="window-top">
          <span className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>JARVIS / WORKSPACE</span>
          <span className="window-preview">ARAYÜZ KONSEPTİ</span>
        </div>
        <div className="window-body">
          <aside className="demo-sidebar">
            <div className="demo-brand">
              <BrandMark />
              <span>jarvis.</span>
            </div>
            <div className="demo-menu-item selected">
              <MessageSquare size={15} /> Asistan <ChevronRight size={12} />
            </div>
            <div className="demo-menu-item">
              <Command size={15} /> Yetenekler
            </div>
            <div className="demo-menu-item">
              <NotebookPen size={15} /> Notlar
            </div>
            <div className="demo-side-bottom">
              <span className="mini-orbit">
                <BrandMark />
              </span>
              <span>
                Seninle aynı frekansta.<small>SESLİ + YAZILI</small>
              </span>
            </div>
          </aside>
          <div className="demo-chat">
            <div className="demo-chat-heading">
              <span>
                <span className="status-dot" /> Birlikte, daha fazlası.
              </span>
              <AudioLines size={17} />
            </div>
            <div className="demo-conversation" aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="user-message">
                    <span className="message-person">SEN</span>
                    <p>{scenario.prompt}</p>
                  </div>
                  <div className="assistant-message">
                    <span className="assistant-avatar">
                      <BrandMark />
                    </span>
                    <div>
                      <span className="message-person">JARVIS</span>
                      <p>{scenario.response}</p>
                      <div className="demo-results">
                        {scenario.items.map((item, index) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: reduce ? 0 : index * 0.09 + 0.1 }}
                          >
                            <Check size={13} />
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="demo-input" aria-hidden="true">
              <span>Bir sonraki adımın ne?</span>
              <span className="demo-input-icons">
                <AudioLines size={17} />
                <span>
                  <ArrowUp size={17} />
                </span>
              </span>
            </div>
            <p className="demo-disclaimer">
              Örnek senaryo. Bu önizleme bilgisayarında işlem yapmaz.
            </p>
          </div>
        </div>
      </div>
      <div className="scenario-selector" aria-label="Önizleme senaryoları">
        {scenarios.map((item, index) => (
          <button
            key={item.title}
            className={index === active ? "scenario active" : "scenario"}
            onClick={() => setActive(index)}
            aria-pressed={index === active}
          >
            {index === active && (
              <motion.span
                className="scenario-background"
                layoutId="scenario"
                transition={{ type: "spring", stiffness: 350, damping: 32 }}
              />
            )}
            <item.icon size={16} />
            <span>{item.title}</span>
            <span className="scenario-number">0{index + 1}</span>
          </button>
        ))}
      </div>
      <span className="demo-bottom-note">
        <Sparkles size={12} /> Doğal dil. Gerçek masaüstü araçları.
      </span>
    </div>
  );
}
