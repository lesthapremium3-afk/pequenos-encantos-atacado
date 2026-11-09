import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { MIN_ORDER, brl } from "@/lib/products";

export function Header() {
  const { count } = useCart();
  return (
    <>
      <div className="overflow-hidden bg-primary py-2 text-xs text-primary-foreground">
        <div className="marquee flex w-max gap-12 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12">
              <span>Pedido mínimo {brl(MIN_ORDER)}</span>
              <span>5% OFF no PIX</span>
              <span>Até 6x no cartão</span>
              <span>Envio para todo o Brasil</span>
              <span>Atendimento pelo WhatsApp</span>
              <span>Pedido mínimo {brl(MIN_ORDER)}</span>
              <span>5% OFF no PIX</span>
            </div>
          ))}
        </div>
      </div>
      <header className="glass sticky top-0 z-40 border-b border-border/60">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:grid-cols-[1fr_auto_1fr]">
          <Link to="/" className="min-w-0 truncate font-display text-2xl font-medium tracking-tight">
            Baby <span className="italic text-sage">Atacarejo</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <Link to="/catalogo" search={{ c: undefined }} className="hover:text-foreground">Catálogo</Link>
            <Link to="/catalogo" search={{ c: "menino" }} className="hover:text-foreground">Menino</Link>
            <Link to="/catalogo" search={{ c: "menina" }} className="hover:text-foreground">Menina</Link>
            <Link to="/catalogo" search={{ c: "bebe" }} className="hover:text-foreground">Bebê</Link>
          </nav>
          <div className="flex justify-end">
            <Link
              to="/carrinho"
              className="relative inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium shadow-soft transition hover:-translate-y-0.5"
            >
              <ShoppingBag className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Carrinho</span>
              {count > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-sage px-1.5 text-[11px] text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-ice">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Baby <span className="italic text-sage">Atacarejo</span></p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Moda infantil no atacado para lojistas e revendedoras. Do bebê aos 12 anos.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="mb-3 font-medium text-foreground">Pagamento</p>
          <p>PIX com 5% de desconto</p>
          <p>Cartão de crédito em até 6x</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="mb-3 font-medium text-foreground">Atacado</p>
          <p>Pedido mínimo de {brl(MIN_ORDER)}</p>
          <p>Envio para todo o Brasil</p>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted-foreground">© 2026 Baby Atacarejo</p>
    </footer>
  );
}
