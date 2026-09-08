"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandMark } from "./brand";
import { DocsSearch } from "./docs-search";
const links = [
  { href: "/#ozellikler", label: "Yetenekler" },
  { href: "/#nasil-calisir", label: "Nasıl çalışır?" },
  { href: "/docs/baslangic", label: "Dokümantasyon" },
];
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="Jarvis ana sayfa"
          onClick={() => setOpen(false)}
        >
          <BrandMark />
          <span>
            jarvis<span className="brand-dot">.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Ana menü">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname.startsWith("/docs") && link.href.startsWith("/docs") ? "active" : ""
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <DocsSearch />
          <Link href="/download" className="button button-small button-light header-download">
            Jarvis’i indir <ArrowUpRight size={15} />
          </Link>
          <button
            className="icon-button mobile-toggle"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            aria-controls={open ? "mobile-navigation" : undefined}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobil menü"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
                <ArrowUpRight size={16} />
              </Link>
            ))}
            <Link href="/download" onClick={() => setOpen(false)}>
              İndirme merkezi
              <ArrowUpRight size={16} />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
