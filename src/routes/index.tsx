import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, QrCode, CreditCard, PackageCheck, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { products, MIN_ORDER, brl } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Baby Atacarejo · Roupas infantis no atacado" },
      { name: "description", content: "Kits de conjuntos infantis no atacado do bebê aos 12 anos. Pedido mínimo R$ 100, 5% OFF no PIX." },
      { property: "og:title", content: "Baby Atacarejo · Roupas infantis no atacado" },
      { property: "og:description", content: "Kits de conjuntos infantis para revenda. PIX com desconto e cartão em até 6x." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.slice(0, 3);
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-ice">
          <img src={hero} alt="Crianças vestindo conjuntos Baby Atacarejo" width={1600} height={1008} className="h-[560px] w-full object-cover object-right md:h-[640px]" />
          <div className="absolute inset-0 flex items-end p-6 md:items-center md:p-14">
            <div className="glass rise max-w-lg rounded-3xl p-7 md:bg-transparent md:p-0 md:backdrop-blur-none">
              <p className="text-xs uppercase tracking-[0.25em] text-sage">Coleção Verão 2027</p>
              <h1 className="mt-4 text-5xl font-light leading-[1.02] md:text-7xl">
                Moda infantil <em className="text-sage">no atacado</em>, com cara de marca.
              </h1>
              <p className="mt-5 max-w-md text-muted-foreground">
                Kits de conjuntos prontos para revenda, do bebê aos 12 anos. Pedido mínimo de {brl(MIN_ORDER)}.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/catalogo" search={{ c: undefined }} className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:gap-3">
                  Ver modelos <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm">
                  <QrCode className="h-4 w-4 text-pix" /> 5% OFF no PIX
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 grid max-w-7xl grid-cols-2 gap-3 px-5 md:grid-cols-4">
        {[
          { i: PackageCheck, t: `Mínimo ${brl(MIN_ORDER)}`, d: "Monte seu pedido livre" },
          { i: QrCode, t: "PIX com 5% OFF", d: "Aprovação imediata" },
          { i: CreditCard, t: "Até 6x no cartão", d: "Todas as bandeiras" },
          { i: Truck, t: "Envio nacional", d: "Despacho em 48h" },
        ].map(({ i: I, t, d }) => (
          <div key={t} className="rounded-2xl border border-border bg-card p-5">
            <I className="h-5 w-5 text-sage" />
            <p className="mt-3 text-sm font-semibold">{t}</p>
            <p className="text-xs text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-sage">Mais vendidos</p>
            <h2 className="mt-3 text-4xl font-light md:text-5xl">Os kits que mais giram</h2>
          </div>
          <Link to="/catalogo" search={{ c: undefined }} className="hidden items-center gap-2 text-sm md:inline-flex">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section className="mx-auto mt-24 grid max-w-7xl gap-4 px-5 md:grid-cols-3">
        {([
          ["menino", "Menino", products[2].image],
          ["menina", "Menina", products[3].image],
          ["bebe", "Bebê", products[5].image],
        ] as const).map(([c, label, img]) => (
          <Link key={c} to="/catalogo" search={{ c }} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl">
            <img src={img} alt={label} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="glass absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl px-5 py-4">
              <span className="font-display text-2xl">{label}</span>
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-5">
        <div className="grid gap-10 rounded-[2rem] bg-sage-soft p-8 md:grid-cols-[1.2fr_1fr] md:p-14">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground">Para lojistas</p>
            <h2 className="mt-3 text-4xl font-light leading-tight md:text-5xl">
              Compre a partir de {brl(MIN_ORDER)} e revenda com margem de até 3x.
            </h2>
          </div>
          <ol className="space-y-5 text-sm">
            {["Escolha os kits e tamanhos", "Feche no PIX, cartão ou WhatsApp", "Receba em casa pronto para vender"].map((s, i) => (
              <li key={s} className="flex items-center gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-card font-display text-lg">{i + 1}</span>
                <span className="text-base">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-5">
        <h2 className="text-center text-4xl font-light">Quem revende, recomenda</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Juliana, Curitiba", "Qualidade de loja de shopping com preço de atacado. Vendi o kit de 10 em dois dias."],
            ["Marcos, Recife", "Pagamento no PIX rápido e chegou tudo certinho, bem embalado."],
            ["Patrícia, Goiânia", "As estampas são lindas e discretas, as mães amam."],
          ].map(([n, t]) => (
            <figure key={n} className="rounded-3xl border border-border bg-card p-7">
              <div className="flex gap-0.5 text-sand">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-4 font-display text-xl font-light leading-snug">"{t}"</blockquote>
              <figcaption className="mt-5 text-sm text-muted-foreground">{n}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
