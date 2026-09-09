"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { motion } from "motion/react";
import { commands } from "@/lib/commands";
import { normalizeSearch } from "@/lib/docs";
import { CopyCode } from "./copy-code";
const categories = ["Tümü", ...new Set(commands.map((item) => item.category))];
export function CommandCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tümü");
  const results = useMemo(
    () =>
      commands.filter(
        (item) =>
          (category === "Tümü" || item.category === category) &&
          normalizeSearch(query)
            .trim()
            .split(/\s+/)
            .every((word) =>
              normalizeSearch(
                `${item.command} ${item.result} ${item.requirement} ${item.category}`,
              ).includes(word),
            ),
      ),
    [query, category],
  );
  return (
    <div className="command-catalog">
      <label className="catalog-search">
        <Search size={20} />
        <input
          type="search"
          aria-label="Komutlarda ara"
          placeholder="Bir iş düşün: dosya bul, not al, ekran…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="catalog-filters" role="group" aria-label="Komut kategorisi">
        {categories.map((name) => (
          <button key={name} aria-pressed={category === name} onClick={() => setCategory(name)}>
            {name}
          </button>
        ))}
      </div>
      <p className="catalog-count" aria-live="polite">
        {results.length} örnek komut · Kopyala ve masaüstü uygulamasında dene.
      </p>
      <div className="command-grid">
        {results.map((item) => (
          <motion.article
            className="command-card"
            key={item.command}
            data-reveal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="eyebrow">{item.category}</span>
            <h2>{item.command}</h2>
            <p>{item.result}</p>
            <CopyCode code={item.command} label="ÖRNEK İSTEK" />
            <p className="command-requirement">
              <strong>Gerekenler</strong>
              {item.requirement}
            </p>
            <Link className="text-link" href={`/docs/komutlar#${item.anchor}`}>
              İlgili rehber <ArrowUpRight size={14} />
            </Link>
          </motion.article>
        ))}
      </div>
      {results.length === 0 && (
        <div className="catalog-empty">
          <h2>Bu aramada bir komut bulamadık.</h2>
          <p>Daha kısa bir kelime dene veya filtreleri sıfırla.</p>
          <button
            className="button button-light"
            onClick={() => {
              setQuery("");
              setCategory("Tümü");
            }}
          >
            Filtreleri sıfırla
          </button>
        </div>
      )}
    </div>
  );
}
