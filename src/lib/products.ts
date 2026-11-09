import menino3 from "@/assets/kit-menino-3.jpg";
import menino5 from "@/assets/kit-menino-5.jpg";
import menino10 from "@/assets/kit-menino-10.jpg";
import menina5 from "@/assets/kit-menina-5.jpg";
import menina6 from "@/assets/kit-menina-6.jpg";
import bebe4 from "@/assets/kit-bebe-4.jpg";

export type Category = "menino" | "menina" | "bebe";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  pieces: number; // conjuntos por kit
  price: number; // preço do kit
  oldPrice: number;
  image: string;
  sizes: string[];
  material: string;
  description: string;
  tag?: string;
};

export const MIN_ORDER = 100;
export const PIX_DISCOUNT = 0.05;
export const WHATSAPP_NUMBER = "5500000000000"; // substituir pelo número real

export const categoryLabel: Record<Category, string> = {
  menino: "Menino",
  menina: "Menina",
  bebe: "Bebê",
};

export const products: Product[] = [
  {
    slug: "kit-3-conjuntos-essencial-menino",
    name: "Kit Essencial 3 Conjuntos",
    category: "menino",
    pieces: 3,
    price: 66.9,
    oldPrice: 129.9,
    image: menino3,
    sizes: ["2", "4", "6", "8", "10", "12"],
    material: "Algodão e poliéster",
    description: "Camisetas com estampas discretas e bermudas de moletinho com cordão. Pronto para revenda.",
    tag: "Mais vendido",
  },
  {
    slug: "kit-10-conjuntos-estampados-menino",
    name: "Kit 10 Conjuntos Estampados",
    category: "menino",
    pieces: 10,
    price: 79.9,
    oldPrice: 179.9,
    image: menino10,
    sizes: ["1", "2", "4", "6", "8", "10", "12"],
    material: "100% algodão",
    description: "Estampas de dinossauro, skate e aventura. Mix de cores sortidas, ideal para giro rápido na loja.",
    tag: "Melhor custo",
  },
  {
    slug: "kit-5-conjuntos-urbano-menino",
    name: "Kit Urbano 5 Conjuntos",
    category: "menino",
    pieces: 5,
    price: 94.9,
    oldPrice: 199.9,
    image: menino5,
    sizes: ["2", "4", "6", "8", "10"],
    material: "Algodão e sarja leve",
    description: "Camisetas minimalistas com bermudas de sarja dobradas na barra. Visual de marca premium.",
  },
  {
    slug: "kit-5-conjuntos-delicado-menina",
    name: "Kit Delicado 5 Conjuntos",
    category: "menina",
    pieces: 5,
    price: 69.9,
    oldPrice: 149.9,
    image: menina5,
    sizes: ["1", "2", "4", "6", "8"],
    material: "Algodão com elastano",
    description: "Blusinhas com manga bufante e shorts com cordão. Tons suaves que vendem o ano inteiro.",
    tag: "Novidade",
  },
  {
    slug: "kit-6-conjuntos-cropped-menina",
    name: "Kit Cropped 6 Conjuntos",
    category: "menina",
    pieces: 6,
    price: 89.9,
    oldPrice: 189.9,
    image: menina6,
    sizes: ["4", "6", "8", "10", "12"],
    material: "Algodão penteado",
    description: "Cropped e shortinho combinando, estampas pequenas e modernas. Queridinho das meninas.",
  },
  {
    slug: "kit-4-conjuntos-bebe-ursinho",
    name: "Kit Bebê Ursinho 4 Conjuntos",
    category: "bebe",
    pieces: 4,
    price: 74.9,
    oldPrice: 139.9,
    image: bebe4,
    sizes: ["P", "M", "G", "1", "2"],
    material: "100% algodão",
    description: "Body com estampa de ursinho e shorts macio. Toque suave para a pele do bebê.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
