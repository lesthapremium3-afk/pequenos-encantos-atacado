import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, QrCode, CreditCard, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { brl, MIN_ORDER, PIX_DISCOUNT, WHATSAPP_NUMBER } from "@/lib/products";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Seu carrinho · Baby Atacarejo" },
      { name: "description", content: "Finalize seu pedido de atacado no PIX, cartão ou WhatsApp." },
      { property: "og:title", content: "Carrinho · Baby Atacarejo" },
      { property: "og:description", content: "Finalize seu pedido de atacado." },
    ],
  }),
  component: Carrinho,
});

type Method = "pix" | "cartao" | "whatsapp";

function Carrinho() {
  const { lines, subtotal, setQty, remove } = useCart();
  const [method, setMethod] = useState<Method>("pix");
  const missing = Math.max(0, MIN_ORDER - subtotal);
  const pct = Math.min(100, (subtotal / MIN_ORDER) * 100);
  const total = method === "pix" ? subtotal * (1 - PIX_DISCOUNT) : subtotal;

  const checkout = () => {
    if (missing > 0) return;
    if (method === "whatsapp") {
      const msg = [
        "Olá! Quero fazer este pedido na Baby Atacarejo:",
        ...lines.map((l) => `• ${l.qty}x ${l.product.name} (tam. ${l.size}) — ${brl(l.qty * l.product.price)}`),
        `Total: ${brl(subtotal)}`,
      ].join("\n");
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
      return;
    }
    toast.info("O pagamento automático no site será ativado na próxima etapa.");
  };

  if (lines.length === 0)
    return (
      <section className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="text-5xl font-light">Seu carrinho está vazio</h1>
        <p className="mt-4 text-muted-foreground">Pedido mínimo de {brl(MIN_ORDER)}. Que tal começar pelos mais vendidos?</p>
        <Link to="/catalogo" search={{ c: undefined }} className="mt-8 inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm text-primary-foreground">Ver modelos</Link>
      </section>
    );

  return (
    <section className="mx-auto max-w-7xl px-5 pt-14">
      <h1 className="text-5xl font-light">Carrinho</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <ul className="space-y-4">
          {lines.map((l) => (
            <li key={l.slug + l.size} className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 rounded-3xl border border-border bg-card p-3 sm:grid-cols-[110px_minmax(0,1fr)_auto] sm:items-center">
              <img src={l.product.image} alt="" className="aspect-[4/5] w-full rounded-2xl object-cover" />
              <div className="min-w-0">
                <p className="truncate font-semibold">{l.product.name}</p>
                <p className="text-sm text-muted-foreground">Tamanho {l.size} · {brl(l.product.price)} / kit</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-10 items-center rounded-full border border-border">
                    <button aria-label="Diminuir" className="grid h-10 w-10 place-items-center" onClick={() => setQty(l.slug, l.size, l.qty - 1)}><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-6 text-center text-sm">{l.qty}</span>
                    <button aria-label="Aumentar" className="grid h-10 w-10 place-items-center" onClick={() => setQty(l.slug, l.size, l.qty + 1)}><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <button aria-label="Remover" onClick={() => remove(l.slug, l.size)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <p className="col-span-2 text-right font-semibold sm:col-span-1 sm:pr-3">{brl(l.qty * l.product.price)}</p>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-[2rem] border border-border bg-card p-7 shadow-soft lg:sticky lg:top-28">
          <div>
            <div className="flex justify-between text-sm">
              <span>{missing > 0 ? `Faltam ${brl(missing)} para o mínimo` : "Pedido mínimo atingido ✓"}</span>
              <span className="text-muted-foreground">{brl(MIN_ORDER)}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-sage transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <p className="mt-8 text-sm font-medium">Forma de pagamento</p>
          <div className="mt-3 space-y-2">
            {([
              ["pix", QrCode, "PIX", "5% de desconto · aprovação na hora"],
              ["cartao", CreditCard, "Cartão de crédito", "Até 6x sem juros"],
              ["whatsapp", MessageCircle, "Finalizar pelo WhatsApp", "Fale com nossa equipe"],
            ] as const).map(([k, I, t, d]) => (
              <button
                key={k}
                onClick={() => setMethod(k)}
                className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${method === k ? "border-primary bg-muted" : "border-border hover:border-foreground/30"}`}
              >
                <I className={`h-5 w-5 shrink-0 ${k === "pix" ? "text-pix" : "text-sage"}`} />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{t}</span>
                  <span className="block text-xs text-muted-foreground">{d}</span>
                </span>
              </button>
            ))}
          </div>

          <dl className="mt-8 space-y-2 border-t border-border pt-6 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{brl(subtotal)}</dd></div>
            {method === "pix" && <div className="flex justify-between text-pix"><dt>Desconto PIX</dt><dd>-{brl(subtotal * PIX_DISCOUNT)}</dd></div>}
            <div className="flex justify-between pt-2 text-lg font-semibold"><dt>Total</dt><dd>{brl(total)}</dd></div>
            {method === "cartao" && <p className="text-right text-xs text-muted-foreground">ou 6x de {brl(total / 6)}</p>}
          </dl>

          <button
            disabled={missing > 0}
            onClick={checkout}
            className="mt-6 w-full rounded-full bg-primary py-4 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {method === "whatsapp" ? "Enviar pedido no WhatsApp" : "Finalizar pedido"}
          </button>
        </aside>
      </div>
    </section>
  );
}
