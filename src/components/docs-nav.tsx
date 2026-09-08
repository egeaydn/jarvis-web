"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import { docs, docGroups } from "@/lib/docs";
export function DocsNav() {
  const path = usePathname();
  const details = useRef<HTMLDetailsElement>(null);
  function groups() {
    return docGroups.map((group) => (
      <div className="doc-group" key={group}>
        <p>{group.toLocaleUpperCase("tr-TR")}</p>
        {docs
          .filter((doc) => doc.group === group)
          .map((doc) => (
            <Link
              href={`/docs/${doc.slug}`}
              key={doc.slug}
              className={`doc-nav-link ${path === `/docs/${doc.slug}` ? "active" : ""}`}
              aria-current={path === `/docs/${doc.slug}` ? "page" : undefined}
              onClick={() => {
                if (details.current) details.current.open = false;
              }}
            >
              {doc.title}
            </Link>
          ))}
      </div>
    ));
  }
  return (
    <>
      <aside className="docs-sidebar">
        <div className="docs-sidebar-header">
          <BookOpen size={17} /> Dokümantasyon
        </div>
        <nav aria-label="Belge menüsü">{groups()}</nav>
      </aside>
      <details ref={details} className="doc-mobile-nav">
        <summary>
          Dokümantasyon menüsü
          <ChevronDown size={16} />
        </summary>
        <nav aria-label="Mobil belge menüsü">{groups()}</nav>
      </details>
    </>
  );
}
