"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FileText, Search, X } from "lucide-react";
import { searchDocs } from "@/lib/docs";
export function DocsSearch() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const results = searchDocs(query);
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (!dialog.current?.open) dialog.current?.showModal();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
  return (
    <>
      <button
        className="search-trigger"
        aria-label="Belgelerde ara"
        onClick={() => dialog.current?.showModal()}
      >
        <Search size={17} />
        <kbd>Ctrl K</kbd>
      </button>
      <dialog
        ref={dialog}
        className="search-dialog"
        aria-labelledby="search-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="search-surface">
          <div className="search-input-row">
            <Search size={20} />
            <label className="sr-only" id="search-title" htmlFor="docs-query">
              Belgelerde ara
            </label>
            <input
              id="docs-query"
              placeholder="Bir konu veya soru ara…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            <button
              className="icon-button"
              aria-label="Aramayı kapat"
              onClick={() => dialog.current?.close()}
            >
              <X size={19} />
            </button>
          </div>
          <div className="search-results">
            <p className="eyebrow">{query ? "ARAMA SONUÇLARI" : "BAŞLAMAK İÇİN"}</p>
            <span className="sr-only" aria-live="polite">
              {results.length} sonuç bulundu
            </span>
            {results.length ? (
              results.map((doc) => (
                <Link
                  href={`/docs/${doc.slug}`}
                  key={doc.slug}
                  onClick={() => dialog.current?.close()}
                  className="search-result"
                >
                  <FileText size={19} />
                  <span>
                    <strong>{doc.title}</strong>
                    <small>{doc.description}</small>
                  </span>
                  <ArrowUpRight size={17} />
                </Link>
              ))
            ) : (
              <p className="search-empty">
                Sonuç bulunamadı. “Mikrofon”, “API” veya “kurulum” ile tekrar deneyebilirsin.
              </p>
            )}
          </div>
          <div className="search-hint">
            <span>JARVIS DOKÜMANTASYONU</span>
            <span>
              <kbd>esc</kbd> kapat
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}
