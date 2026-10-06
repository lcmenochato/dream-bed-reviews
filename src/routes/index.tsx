import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Search, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoreHeader } from "@/components/store-header";
import { products } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
       { title: "Mercado Livre | Colchões, camas e armários baratos" },
      { name: "description", content: "Ofertas em colchões, camas box e guarda-roupas com preços baixos, frete grátis e avaliações de compradores." },
       { property: "og:title", content: "Mercado Livre | Móveis com preço baixo" },
      { property: "og:description", content: "Encontre móveis para o quarto com ofertas, parcelamento e frete grátis." },
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
  { label: "Cômodas e cabeceiras", emoji: "🗄️" },
];

function Index() {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const filteredProducts = useMemo(() => products.filter((product) =>
    (category === "Todos" || product.category === category) && product.name.toLowerCase().includes(query.toLowerCase()),
  ), [category, query]);

  return (
    <main className="min-h-screen bg-background pb-12">
      <StoreHeader query={query} onQueryChange={setQuery} />
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Compre por categoria</p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((item) => <Button key={item.label} variant={category === item.label ? "chip-active" : "chip"} onClick={() => setCategory(item.label)}><span aria-hidden="true">{item.emoji}</span>{item.label}</Button>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-5">
          <p className="mb-1 text-sm font-semibold text-success">PREÇOS BAIXOS TODOS OS DIAS</p>
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Ofertas para renovar seu quarto</h1>
          <p className="mt-2 text-sm text-muted-foreground">{filteredProducts.length} produtos encontrados</p>
        </div>
        {filteredProducts.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const favorite = favorites.includes(product.slug);
              return (
                <article key={product.slug} className="group relative overflow-hidden rounded-lg border border-border bg-card transition hover:shadow-product">
                  <Link to="/produto/$slug" params={{ slug: product.slug }} className="block">
                    <div className="aspect-[4/3] overflow-hidden bg-product">
                      <img src={product.image} alt={product.name} loading="lazy" width={1200} height={900} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                    </div>
                    <div className="border-t border-border p-3 sm:p-4">
                      <h2 className="line-clamp-2 min-h-10 text-sm leading-5 text-foreground sm:min-h-12 sm:text-base sm:leading-6">{product.name}</h2>
                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><span className="font-semibold text-rating">{product.rating}</span><Star className="size-3.5 fill-rating text-rating" /><span>({product.reviewsCount})</span></div>
                      <p className="mt-3 text-xs text-muted-foreground line-through sm:text-sm">{product.oldPrice}</p>
                      <p className="text-xl text-foreground sm:text-2xl">{product.price} <span className="text-xs font-semibold text-success sm:text-sm">{product.discount}</span></p>
                      <p className="mt-1 text-xs text-foreground sm:text-sm">{product.installments}</p>
                       <p className="mt-3 flex items-center gap-1 text-xs font-semibold uppercase text-success sm:text-sm">Frete grátis <span className="inline-flex items-center font-extrabold"><Zap className="size-3.5 fill-success" /> Full</span></p>
                    </div>
                  </Link>
                  <Button variant="icon" size="icon" onClick={() => setFavorites((items) => favorite ? items.filter((item) => item !== product.slug) : [...items, product.slug])} className="absolute right-2 top-2 bg-card shadow-control hover:bg-card" aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}><Heart className={favorite ? "fill-action text-action" : "text-action"} /></Button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card px-6 py-14 text-center"><Search className="mx-auto mb-3 size-8 text-muted-foreground" /><h2 className="font-semibold">Não encontramos esse móvel</h2><p className="mt-1 text-sm text-muted-foreground">Tente outro termo ou selecione “Todos”.</p></div>
        )}
      </section>
    </main>
  );
}