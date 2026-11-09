import { createFileRoute, Link } from "@tanstack/react-router";
import { products, categoryLabel, type Category } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

type Search = { c?: Category | undefined };

export const Route = createFileRoute("/catalogo")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const v = s["c"];
    return { c: v === "menino" || v === "menina" || v === "bebe" ? v : undefined };
  },
  head: () => ({
    meta: [
      { title: "Catálogo de kits infantis · Baby Atacarejo" },
      { name: "description", content: "Todos os kits de conjuntos infantis no atacado: menino, menina e bebê." },
      { property: "og:title", content: "Catálogo · Baby Atacarejo" },
      { property: "og:description", content: "Kits de conjuntos infantis no atacado para revenda." },
    ],
  }),
  component: Catalogo,
});

function Catalogo() {
  const { c } = Route.useSearch();
  const list = c ? products.filter((p) => p.category === c) : products;
  const tabs: (Category | undefined)[] = [undefined, "menino", "menina", "bebe"];
  return (
    <section className="mx-auto max-w-7xl px-5 pt-14">
      <p className="text-xs uppercase tracking-[0.25em] text-sage">Catálogo</p>
      <h1 className="mt-3 text-5xl font-light md:text-6xl">{c ? categoryLabel[c] : "Todos os kits"}</h1>
      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Link
            key={t ?? "all"}
            to="/catalogo"
            search={{ c: t }}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              c === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-foreground/30"
            }`}
          >
            {t ? categoryLabel[t] : "Todos"}
          </Link>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
    </section>
  );
}
