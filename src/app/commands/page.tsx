import type { Metadata } from "next";
import { CommandCatalog } from "@/components/command-catalog";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata(
  "/commands",
  "Türkçe sesli ve yazılı komut örnekleri",
  "Jarvis ile dosya bulma, uygulama açma, not alma ve ekran analizi için Türkçe komut örnekleri. Kategoriye göre ara, kopyala ve ilgili rehbere ulaş.",
);
export default function CommandsPage() {
  return (
    <main id="main" className="container">
      <div className="page-intro">
        <span className="eyebrow">KOMUT KATALOĞU / SÖZ SİZDE</span>
        <h1>
          Bir cümleyle
          <br />
          <em>başlayabilirsin.</em>
        </h1>
        <p>
          Ezberlenecek bir dil yok. Bu örnekleri kendi işine uyarla.
          <br />
          Her komutun ne yaptığını ve neye ihtiyaç duyduğunu gör.
        </p>
      </div>
      <aside className="notice">
        Örnekler mevcut geliştirme sürümüne dayanır. Sonuçlar seçtiğin model ve bilgisayar ortamına
        göre değişebilir. Bu sayfa bilgisayarında işlem yapmaz. Komut yorumlama için seçili AI
        sağlayıcısının API bağlantısı gerekir.
      </aside>
      <CommandCatalog />
    </main>
  );
}
