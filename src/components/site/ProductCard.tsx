import { Link } from "@tanstack/react-router";
import { brl, categoryLabel, type Product } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  const off = Math.round((1 - p.price / p.oldPrice) * 100);
  return (
    <Link
      to="/produto/$slug"
      params={{ slug: p.slug }}
      className="group block rounded-3xl bg-card p-2 shadow-soft transition duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ice">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={1024}
          height={1280}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {p.tag && (
            <span className="glass rounded-full px-3 py-1 text-[11px] font-medium">{p.tag}</span>
          )}
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-sage px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
          -{off}%
        </span>
      </div>
      <div className="px-3 pb-3 pt-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {categoryLabel[p.category]} · {p.pieces} conjuntos
        </p>
        <h3 className="mt-1 font-sans text-base font-semibold tracking-normal">{p.name}</h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-semibold">{brl(p.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{brl(p.oldPrice)}</span>
        </div>
        <p className="mt-1 text-xs text-pix">
          {brl(p.price * 0.95)} no PIX · {brl(p.price / p.pieces)} por conjunto
        </p>
      </div>
    </Link>
  );
}
