import index from "./docs-index.json";
export type DocSection = {
  id: string;
  title: string;
  body: string[];
  code?: string;
  note?: string;
};
export type Doc = {
  slug: string;
  title: string;
  description: string;
  group: string;
  time: string;
  updatedAt: string;
  sections: DocSection[];
};
export const docs: Doc[] = index;
export const docGroups = ["Başlarken", "Kullanım", "Yardım"];
export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}
export function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i");
}
export function searchDocs(query: string) {
  const terms = normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return docs.slice(0, 5);
  return docs.filter((doc) => {
    const text = normalizeSearch(
      [doc.title, doc.description, ...doc.sections.flatMap((s) => [s.title, ...s.body])].join(" "),
    );
    return terms.every((term) => text.includes(term));
  });
}
