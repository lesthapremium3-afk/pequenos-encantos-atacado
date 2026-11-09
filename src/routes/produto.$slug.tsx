import { createFileRoute, notFound, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, QrCode, CreditCard, Truck } from "lucide-react";
import { toast } from "sonner";
import { getProduct, brl, categoryLabel, MIN_ORDER, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} · Baby Atacarejo` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.name} · Baby Atacarejo` },
          { property: "og:description", content: loaderData.description },
        ]
      : [{ title: "Produto indisponível · Baby Atacarejo" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { add } = useCart();
  const nav = useNavigate();
  const [size, setSize] = useState(p.sizes[0]);
  const [qty, setQty] = useState(Math.ceil(MIN_ORDER / p.price));

  const total = qty * p.price;
  const addToCart = (go: boolean) => {
    add(p.slug, size, qty);
    toast.success(`${qty}x ${p.name} (tam. ${size}) adicionado`);
    if (go) nav({ to: "/carrinho" });
  };

  return (
    <section className="mx-auto max-w-7xl px-5 pt-10">
      <Link to="/catalogo" search={{ c: p.category }} className="text-sm text-muted-foreground hover:text-foreground">
        ← {categoryLabel[p.category]}
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="overflow-hidden rounded-[2rem] bg-ice">
          <img src={p.image} alt={p.name} width={1024} height={1280} className="h-full w-full object-cover" />
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          {p.tag && <span className="rounded-full bg-sage-soft px-3 py-1 text-xs text-accent-foreground">{p.tag}</span>}
          <h1 className="mt-4 text-4xl font-light md:text-5xl">{p.name}</h1>
          <p className="mt-4 text-muted-foreground">{p.description}</p>

          <div className="mt-8 rounded-3xl border border-border bg-card p-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold">{brl(p.price)}</span>
              <span className="text-muted-foreground line-through">{brl(p.oldPrice)}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{p.pieces} conjuntos · {brl(p.price / p.pieces)} cada</p>
            <div className="mt-4 grid gap-2 text-sm">
              <p className="flex items-center gap-2"><QrCode className="h-4 w-4 text-pix" /> <b>{brl(p.price * 0.95)}</b> no PIX</p>
              <p className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-sage" /> ou 6x de {brl(p.price / 6)} no cartão</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium">Tamanho</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-11 min-w-11 rounded-full border px-4 text-sm transition ${
                    size === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-foreground/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex h-12 items-center rounded-full border border-border bg-card">
              <button aria-label="Diminuir" className="grid h-12 w-12 place-items-center" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button aria-label="Aumentar" className="grid h-12 w-12 place-items-center" onClick={() => setQty((q) => q + 1)}><Plus className="h-4 w-4" /></button>
            </div>
            <p className="text-sm text-muted-foreground">Total: <b className="text-foreground">{brl(total)}</b></p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button onClick={() => addToCart(false)} className="h-13 rounded-full border border-primary py-4 text-sm font-medium transition hover:bg-muted">
              Adicionar ao carrinho
            </button>
            <button onClick={() => addToCart(true)} className="rounded-full bg-primary py-4 text-sm font-medium text-primary-foreground transition hover:opacity-90">
              Comprar agora
            </button>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
            <div><dt className="text-muted-foreground">Material</dt><dd>{p.material}</dd></div>
            <div><dt className="text-muted-foreground">Idade</dt><dd>{p.sizes[0]} a {p.sizes[p.sizes.length - 1]}</dd></div>
            <div className="col-span-2 flex items-center gap-2 text-muted-foreground"><Truck className="h-4 w-4" /> Despacho em até 48h úteis</div>
          </dl>
        </div>
      </div>

      <h2 className="mt-24 text-3xl font-light">Você também pode gostar</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.filter((x) => x.slug !== p.slug).slice(0, 3).map((x) => <ProductCard key={x.slug} p={x} />)}
      </div>
    </section>
  );
}
