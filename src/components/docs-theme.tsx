"use client";
import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";
export function DocsTheme() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem("jarvis-docs-theme") === "light";
      document.documentElement.dataset.docsTheme = saved ? "light" : "dark";
    } catch {}
    return () => {
      delete document.documentElement.dataset.docsTheme;
    };
  }, []);
  const toggle = () => {
    const next = document.documentElement.dataset.docsTheme !== "light";
    document.documentElement.dataset.docsTheme = next ? "light" : "dark";
    try {
      localStorage.setItem("jarvis-docs-theme", next ? "light" : "dark");
    } catch {}
  };
  return (
    <button className="docs-theme-toggle text-link" onClick={toggle}>
      <span className="theme-sun">
        <Sun size={14} />
      </span>
      <span className="theme-moon">
        <Moon size={14} />
      </span>
      <span>Okuma temasını değiştir</span>
    </button>
  );
}
