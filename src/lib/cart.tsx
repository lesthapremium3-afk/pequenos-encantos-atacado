import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./products";

export type CartLine = { slug: string; size: string; qty: number };
type CartLineFull = CartLine & { product: Product };

type CartCtx = {
  lines: CartLineFull[];
  count: number;
  subtotal: number;
  add: (slug: string, size: string, qty: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "baby-atacarejo-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) setRaw(JSON.parse(s));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(raw));
  }, [raw]);

  const value = useMemo<CartCtx>(() => {
    const lines = raw
      .map((l) => ({ ...l, product: getProduct(l.slug)! }))
      .filter((l) => l.product);
    return {
      lines,
      count: lines.reduce((a, l) => a + l.qty, 0),
      subtotal: lines.reduce((a, l) => a + l.qty * l.product.price, 0),
      add: (slug, size, qty) =>
        setRaw((r) => {
          const i = r.findIndex((l) => l.slug === slug && l.size === size);
          const cur = r[i];
          if (cur) {
            const c = [...r];
            c[i] = { ...cur, qty: cur.qty + qty };
            return c;
          }
          return [...r, { slug, size, qty }];
        }),
      setQty: (slug, size, qty) =>
        setRaw((r) =>
          r.map((l) => (l.slug === slug && l.size === size ? { ...l, qty: Math.max(1, qty) } : l)),
        ),
      remove: (slug, size) => setRaw((r) => r.filter((l) => !(l.slug === slug && l.size === size))),
      clear: () => setRaw([]),
    };
  }, [raw]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart fora do CartProvider");
  return c;
}
