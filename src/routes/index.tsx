import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  Star,
  Truck,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import colchaoQueen from "@/assets/colchao-box-queen.jpg";
import guardaRoupa from "@/assets/guarda-roupa-freijo.jpg";
import camaSolteiro from "@/assets/cama-box-solteiro.jpg";
import fotoAvaliacao from "@/assets/avaliacao-cama-real.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mercado Móvel | Colchões, camas e armários" },
      { name: "description", content: "Encontre colchões, camas box e armários com ofertas, frete grátis e avaliações de compradores." },
      { property: "og:title", content: "Mercado Móvel | Sua casa, do seu jeito" },
      { property: "og:description", content: "Ofertas em móveis para o quarto, entrega rápida e avaliações de compradores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const categories = [
  { label: "Todos", emoji: "✨" },
  { label: "Colchões", emoji: "☁️" },
  { label: "Camas box", emoji: "🛏️" },
  { label: "Guarda-roupas", emoji: "🚪" },
];

const products = [
  {
    name: "Cama Box Queen + Colchão Molas Ensacadas Confort Premium",
    category: "Colchões",
    image: colchaoQueen,
    oldPrice: "R$ 2.499",
    price: "R$ 1.699",
    installments: "10x R$ 169,90 sem juros",
    discount: "32% OFF",
    rating: "4.8",
    reviews: "1.243",
  },
  {
    name: "Guarda-Roupa Casal 6 Portas 6 Gavetas Freijó e Branco",
    category: "Guarda-roupas",
    image: guardaRoupa,
    oldPrice: "R$ 2.099",
    price: "R$ 1.489",
    installments: "10x R$ 148,90 sem juros",
    discount: "29% OFF",
    rating: "4.7",
    reviews: "856",
  },
  {
    name: "Cama Box Solteiro com Colchão Espuma D33 Cinza",
    category: "Camas box",
    image: camaSolteiro,
    oldPrice: "R$ 1.199",
    price: "R$ 849",
    installments: "10x R$ 84,90 sem juros",
    discount: "29% OFF",
    rating: "4.9",
    reviews: "538",
  },
];

function Index() {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "Todos" || product.category === category;
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const toggleFavorite = (name: string) => {
    setFavorites((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );
  };

  return (
    <main className="min-h-screen bg-background pb-12">
      <header className="sticky top-0 z-30 bg-primary shadow-header">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center gap-3">
            <a href="#inicio" className="hidden items-center gap-1 text-xl font-bold text-primary-foreground sm:flex" aria-label="Mercado Móvel — início">
              mercado <span className="rounded-sm bg-primary-foreground px-1 text-primary">móvel</span>
            </a>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-11 w-full rounded-md border-0 bg-card pl-10 pr-4 text-base text-foreground shadow-search outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                placeholder="Buscar colchões, camas e armários"
                aria-label="Buscar produtos"
              />
            </div>
            <Button variant="icon" size="icon" aria-label="Abrir carrinho"><ShoppingCart className="size-5" /></Button>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-sm text-primary-foreground">
            <Button variant="ghost" size="sm" className="min-w-0 px-1" aria-label="Alterar endereço de entrega">
              <MapPin className="size-5 shrink-0" />
              <span className="min-w-0 truncate text-left"><span className="block text-xs opacity-70">Enviar para</span>São Paulo 01001-000</span>
              <ChevronDown className="size-4" />
            </Button>
            <div className="hidden items-center gap-1 md:flex">
              <Button variant="ghost" size="sm"><Menu className="size-4" /> Categorias</Button>
              <Button variant="ghost" size="sm">Ofertas</Button>
              <Button variant="ghost" size="sm"><UserRound className="size-4" /> Minha conta</Button>
            </div>
          </div>
        </div>
      </header>

      <section id="inicio" className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Compre por categoria</p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((item) => (
              <Button
                key={item.label}
                variant={category === item.label ? "chip-active" : "chip"}
                onClick={() => setCategory(item.label)}
              >
                <span aria-hidden="true">{item.emoji}</span>{item.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-semibold text-success">OFERTAS DO DIA</p>
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Renove seu quarto</h1>
          </div>
          <button className="hidden items-center gap-1 text-sm font-medium text-action hover:underline sm:flex">Ver todas <ChevronRight className="size-4" /></button>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const favorite = favorites.includes(product.name);
              return (
                <article key={product.name} className="group overflow-hidden rounded-lg border border-border bg-card transition hover:shadow-product">
                  <div className="relative aspect-[4/3] overflow-hidden bg-product">
                    <img src={product.image} alt={product.name} width={1200} height={900} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                    <Button
                      variant="icon"
                      size="icon"
                      onClick={() => toggleFavorite(product.name)}
                      className="absolute right-3 top-3 bg-card shadow-control hover:bg-card"
                      aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                      <Heart className={favorite ? "fill-action text-action" : "text-action"} />
                    </Button>
                  </div>
                  <div className="border-t border-border p-4">
                    <h2 className="min-h-12 text-base leading-6 text-foreground">{product.name}</h2>
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <span className="font-semibold text-rating">{product.rating}</span>
                      <Star className="size-3.5 fill-rating text-rating" />
                      <span>({product.reviews})</span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground line-through">{product.oldPrice}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-normal text-foreground">{product.price}</p>
                      <span className="text-sm font-semibold text-success">{product.discount}</span>
                    </div>
                    <p className="mt-1 text-sm text-foreground">{product.installments}</p>
                    <p className="mt-3 flex items-center gap-1 text-sm font-semibold text-success"><Truck className="size-4" /> Frete grátis</p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card px-6 py-14 text-center">
            <Search className="mx-auto mb-3 size-8 text-muted-foreground" />
            <h2 className="font-semibold">Não encontramos esse móvel</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tente outro termo ou selecione “Todos”.</p>
          </div>
        )}
      </section>

      <section className="border-y border-border bg-card py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Opiniões de quem comprou</p>
              <h2 className="mt-1 text-2xl font-semibold">Avaliações em destaque</h2>
            </div>
            <div className="flex items-center gap-2" aria-label="Nota 4,8 de 5">
              <span className="text-3xl font-semibold">4.8</span>
              <div><div className="flex text-rating" aria-hidden="true">★★★★★</div><p className="text-xs text-muted-foreground">1.243 avaliações</p></div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-lg border border-border p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex text-rating" aria-label="5 estrelas">★★★★★</div>
                <span className="text-xs text-muted-foreground">há 12 dias</span>
              </div>
              <h3 className="font-semibold">Superou minhas expectativas</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">O colchão chegou antes do prazo e bem embalado. É firme sem ser duro e a base ficou linda no quarto. Depois de duas semanas de uso, continuo dormindo muito bem.</p>
              <div className="mt-4 flex items-end gap-4">
                <img src={fotoAvaliacao} alt="Foto do colchão montado enviada pela compradora" loading="lazy" width={1008} height={1008} className="size-28 rounded-md object-cover sm:size-36" />
                <div className="pb-1"><p className="text-sm font-semibold">Mariana S.</p><p className="mt-1 flex items-center gap-1 text-xs text-success"><span className="grid size-4 place-items-center rounded-full bg-success text-success-foreground">✓</span> Compra verificada</p></div>
              </div>
            </article>
            <div className="grid gap-4">
              <article className="rounded-lg border border-border p-4">
                <div className="flex text-rating" aria-label="5 estrelas">★★★★★</div>
                <h3 className="mt-2 font-semibold">Bonito e espaçoso</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">O guarda-roupa é igual às fotos. A montagem leva tempo, mas as peças vieram bem identificadas.</p>
                <p className="mt-3 text-xs font-medium">Carlos R. · Compra verificada</p>
              </article>
              <article className="rounded-lg border border-border p-4">
                <div className="flex text-rating" aria-label="4 estrelas">★★★★<span className="text-border">★</span></div>
                <h3 className="mt-2 font-semibold">Ótimo custo-benefício</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">A cama é confortável e firme. A transportadora atrasou um dia, mas avisou pelo aplicativo.</p>
                <p className="mt-3 text-xs font-medium">Priscila M. · Compra verificada</p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}