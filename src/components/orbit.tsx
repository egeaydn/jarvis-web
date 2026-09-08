"use client";
import { motion, useReducedMotion } from "motion/react";
import { BrandMark } from "./brand";
export function Orbit() {
  const reduce = useReducedMotion();
  return (
    <div className="orbit-scene" aria-hidden="true">
      <div className="orbit-haze" />
      <motion.div
        className="orbital-rings"
        initial={{ rotate: reduce ? 0 : -32, scale: reduce ? 1 : 0.91 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: reduce ? 0 : 1.8, ease: "easeOut" }}
      >
        <svg viewBox="0 0 460 460" fill="none">
          <circle cx="230" cy="230" r="209" stroke="currentColor" strokeOpacity=".12" />
          <circle
            cx="230"
            cy="230"
            r="179"
            stroke="currentColor"
            strokeOpacity=".18"
            strokeDasharray="2 8"
          />
          <circle cx="230" cy="230" r="151" stroke="currentColor" strokeOpacity=".17" />
          <circle cx="230" cy="230" r="112" stroke="currentColor" strokeOpacity=".24" />
          <path d="M59 109a209 209 0 0 1 342 0" stroke="currentColor" strokeOpacity=".6" />
          <path d="M128 341a151 151 0 0 0 204-1" stroke="currentColor" strokeOpacity=".7" />
          <circle cx="56" cy="114" r="5" fill="currentColor" />
          <circle cx="371" cy="356" r="3" fill="currentColor" />
          <path
            d="M221 12h18M230 3v18M221 448h18M230 439v18M3 230h18M12 221v18M439 230h18M448 221v18"
            stroke="currentColor"
            strokeOpacity=".45"
          />
        </svg>
      </motion.div>
      <div className="orbit-core">
        <BrandMark />
      </div>
      <div className="orbit-label orbit-label-top">
        <span className="status-dot" /> HAZIR OLDUĞUNDA.
      </div>
      <div className="orbit-label orbit-label-bottom">
        SEN SÖYLE.
        <br />
        <span>JARVIS HALLETSİN.</span>
      </div>
      <span className="orbit-coordinate">VOICE / TEXT / ACTION</span>
    </div>
  );
}
