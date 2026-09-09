import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, Clock, FileText } from "lucide-react";
import { docs, getDoc } from "@/lib/docs";
import { DocsNav } from "@/components/docs-nav";
import { docContent } from "@/content/docs/registry";
import { DocsTheme } from "@/components/docs-theme";
import { JsonLd } from "@/components/json-ld";
import { absoluteSiteUrl, breadcrumbSchema, pageMetadata } from "@/lib/seo";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return docs.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = getDoc((await params).slug);
  return doc
    ? pageMetadata(`/docs/${doc.slug}`, doc.title, doc.description)
    : { title: "Belge bulunamadı", robots: { index: false } };
}
export default async function DocPage({ params }: Props) {
  const doc = getDoc((await params).slug);
  if (!doc) notFound();
  const Content = docContent[doc.slug];
  const index = docs.indexOf(doc);
  const previous = docs[index - 1];
  const next = docs[index + 1];
  return (
    <main id="main" className="docs-layout">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: doc.title,
          description: doc.description,
          inLanguage: "tr-TR",
          dateModified: doc.updatedAt,
          url: absoluteSiteUrl(`/docs/${doc.slug}`),
          about: {
            "@type": "SoftwareApplication",
            name: "Jarvis",
            operatingSystem: "Windows x64",
            applicationCategory: "UtilitiesApplication",
          },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Jarvis", path: "/" },
          ...(doc.slug === "baslangic" ? [] : [{ name: "Dokümantasyon", path: "/docs/baslangic" }]),
          { name: doc.title, path: `/docs/${doc.slug}` },
        ])}
      />
      <DocsNav />
      <article className="docs-article">
        <div className="doc-breadcrumb">
          <Link href="/">Jarvis</Link>
          <ChevronRight size={11} />
          <Link href="/docs/baslangic">Dokümantasyon</Link>
          <ChevronRight size={11} />
          <span>{doc.group}</span>
        </div>
        <h1 className="doc-title">{doc.title}</h1>
        <p className="doc-description">{doc.description}</p>
        <div className="doc-meta">
          <span>
            <Clock size={12} />
            {doc.time} okuma
          </span>
          <span>
            <FileText size={12} /> Beta kullanım rehberi
          </span>
          <span>
            Son güncelleme:{" "}
            <time dateTime={doc.updatedAt}>
              {new Intl.DateTimeFormat("tr-TR", { dateStyle: "long", timeZone: "UTC" }).format(
                new Date(doc.updatedAt),
              )}
            </time>
          </span>
        </div>
        <DocsTheme />
        <Content />
        <div className="doc-pagination">
          {previous && (
            <Link href={`/docs/${previous.slug}`}>
              <small>Önceki belge</small>
              <strong>
                <ArrowLeft size={13} />
                {previous.title}
              </strong>
            </Link>
          )}
          {next && (
            <Link href={`/docs/${next.slug}`}>
              <small>Sonraki belge</small>
              <strong>
                {next.title}
                <ArrowRight size={13} />
              </strong>
            </Link>
          )}
        </div>
        <p className="doc-end-note">
          Bu rehber mevcut masaüstü beta sürümüne dayanır. Paket durumunu{" "}
          <Link href="/download">indirme merkezinden</Link>, değişiklikleri{" "}
          <Link href="/changelog">sürüm notlarından</Link> kontrol et.
        </p>
      </article>
      <aside className="doc-toc">
        <p>BU SAYFADA</p>
        <nav aria-label="Sayfa içindekiler">
          {doc.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>
        <div className="toc-help">
          <span>Bir yerde takıldın mı?</span>
          <Link href="/support">
            Yardım merkezi <ArrowUpRight size={12} />
          </Link>
        </div>
      </aside>
    </main>
  );
}
