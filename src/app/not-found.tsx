import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <span className="eyebrow">404 / BU SAYFA BURADA DEĞİL</span>
      <h1>Başka bir yol deneyelim.</h1>
      <p>Aradığın sayfa taşınmış olabilir. Buradan devam edebilirsin.</p>
      <Link href="/" className="button button-primary">
        <ArrowLeft size={16} /> Ana sayfa
      </Link>
      <Link href="/docs/baslangic" className="button button-outline">
        <Search size={16} /> Belgeleri keşfet
      </Link>
    </main>
  );
}
