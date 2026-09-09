"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Pause, Play, ArrowUpRight } from "lucide-react";

export function DesktopPreview() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const visible = useInView(ref);
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const angle = useTransform(scrollYProgress, [0, 0.5, 1], [-14, -8, 0]);
  const still = reduce || paused;
  return (
    <figure
      ref={ref}
      className="desktop-preview"
      aria-label="Jarvis masaüstü uygulamasının gerçek ekran görüntüsü"
    >
      <div className="desktop-preview-heading">
        <span className="eyebrow">
          <span className="status-dot" /> JARVIS, MASAÜSTÜNDE.
        </span>
        <button
          className="preview-motion"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          disabled={!!reduce}
        >
          {still ? <Play size={14} /> : <Pause size={14} />}
          {reduce ? "Hareket azaltıldı" : paused ? "Animasyonu aç" : "Animasyonu duraklat"}
        </button>
      </div>
      <div className="desktop-perspective">
        <motion.div
          className="desktop-angle"
          style={{ rotateY: still ? 0 : angle, rotateX: still ? 0 : 5 }}
        >
          <a
            className="desktop-screen"
            href="/images/jarvis-desktop.png"
            target="_blank"
            rel="noreferrer"
            style={{ animationPlayState: still || !visible ? "paused" : "running" }}
            aria-label="Gerçek ekran görüntüsünü tam boyutta aç"
          >
            <Image
              src="/images/jarvis-desktop.png"
              width={1061}
              height={760}
              sizes="(max-width: 760px) 92vw, 1000px"
              alt="Jarvis’in mint ve grafit arayüzü: animasyonlu reaktör, sistem bilgileri ve Türkçe sohbet ekranı."
            />
          </a>
        </motion.div>
      </div>
      <figcaption>
        <span>Gerçek uygulama. Tanıdık masaüstün.</span>
        <a href="/images/jarvis-desktop.png" target="_blank" rel="noreferrer">
          Tam boyutta incele <ArrowUpRight size={14} />
        </a>
      </figcaption>
    </figure>
  );
}
