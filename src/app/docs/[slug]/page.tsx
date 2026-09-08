import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, Clock, FileText } from "lucide-react";
import { docs, getDoc } from "@/lib/docs";
import { DocsNav } from "@/components/docs-nav";
import { CopyCode } from "@/components/copy-code";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return docs.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = getDoc((await params).slug);
  return doc ? { title: doc.title, description: doc.description } : { title: "Belge bulunamadı" };
}
export default async function DocPage({ params }: Props) {
  const doc = getDoc((await params).slug);
  if (!doc) notFound();
  const index = docs.indexOf(doc);
  const previous = docs[index - 1];
  const next = docs[index + 1];
  return (
    <main id="main" className="docs-layout">
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
            <FileText size={12} /> Geliştirme sürümü rehberi
          </span>
        </div>
        {doc.sections.map((section) => (
          <section className="doc-section" id={section.id} key={section.id}>
            <h2>
              <a href={`#${section.id}`}>{section.title}</a>
            </h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.note && <aside className="notice">{section.note}</aside>}
            {section.code && (
              <CopyCode
                code={section.code}
                label={
                  doc.slug === "saglayicilar"
                    ? ".ENV ÖRNEĞİ"
                    : doc.slug === "komutlar" || doc.slug === "baslangic"
                      ? "ÖRNEK KOMUTLAR"
                      : "POWERSHELL"
                }
              />
            )}
          </section>
        ))}
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
          Bu rehber mevcut kaynak koduna dayanır. Halka açık paket için kurulum ve sürüm bilgileri
          yayınla birlikte güncellenecektir.
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
