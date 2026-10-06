import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BadgeCheck, ChevronRight, Heart, MapPin, ShieldCheck, Star, ThumbsUp, Truck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationDialog } from "@/components/location-dialog";
import { StoreHeader } from "@/components/store-header";
import { formatBRL, getProduct, getUpsells } from "@/lib/catalog";
import { locationLabel, useDeliveryLocation } from "@/lib/location";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} | Mercado Livre` : "Produto não encontrado | Mercado Livre" },
      { name: "description", content: loaderData?.description ?? "Produto não encontrado." },
      { property: "og:title", content: loaderData?.name ?? "Produto não encontrado" },
      { property: "og:description", content: loaderData?.description ?? "Confira as ofertas do Mercado Livre." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductDetail,
  notFoundComponent: () => <main className="grid min-h-screen place-items-center bg-background px-4 text-center"><div><h1 className="text-2xl font-semibold">Produto não encontrado</h1><Button asChild className="mt-5"><Link to="/">Voltar às ofertas</Link></Button></div></main>,
});

function ProductDetail() {
  const product = Route.useLoaderData();
  const [activeImage, setActiveImage] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedUpsell, setSelectedUpsell] = useState("");
  const [location] = useDeliveryLocation();
  const upsells = getUpsells(product);

  return (
    <main className="min-h-screen bg-background pb-16">
      <StoreHeader />
      <div className="mx-auto max-w-6xl px-4">
        <nav className="flex items-center gap-2 py-4 text-sm text-muted-foreground"><Link to="/" className="flex items-center gap-1 hover:text-action"><ArrowLeft className="size-4" /> Voltar</Link><ChevronRight className="size-3" /><span>{product.category}</span></nav>

        <section className="grid gap-6 bg-card p-4 sm:p-6 lg:grid-cols-[1.4fr_0.85fr] lg:gap-10">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-md bg-product sm:aspect-[4/3]">
              <img src={product.gallery[activeImage]} alt={product.name} width={1200} height={900} className="h-full w-full object-cover" />
              <Button variant="icon" size="icon" onClick={() => setFavorite(!favorite)} className="absolute right-3 top-3 bg-card shadow-control hover:bg-card" aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}><Heart className={favorite ? "fill-action text-action" : "text-action"} /></Button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {product.gallery.map((image, index) => <button key={image} onClick={() => setActiveImage(index)} className={`size-16 shrink-0 overflow-hidden rounded-md border-2 ${activeImage === index ? "border-action" : "border-border"}`} aria-label={`Ver foto ${index + 1}`}><img src={image} alt="" className="h-full w-full object-cover" /></button>)}
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Novo | {product.sold}</p>
            <h1 className="mt-2 text-xl font-semibold leading-7 sm:text-2xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm"><span className="text-action">{product.rating}</span><span className="flex text-rating" aria-label={`${product.rating} estrelas`}>★★★★★</span><a href="#avaliacoes" className="text-action">{product.reviewsCount} avaliações</a></div>
            <p className="mt-7 text-sm text-muted-foreground line-through">{product.oldPrice}</p>
            <p className="text-3xl font-normal">{product.price} <span className="align-middle text-sm font-semibold text-success">{product.discount}</span></p>
            <p className="mt-1 text-sm">{product.installments}</p>
            <p className="mt-2 text-sm font-medium text-success">10% OFF no Pix</p>
             <div className="mt-7 flex items-start gap-3"><Truck className="mt-0.5 size-5 text-success" /><div><p className="flex items-center gap-1 font-semibold uppercase text-success">Frete grátis <span className="inline-flex items-center font-extrabold"><Zap className="size-4 fill-success" /> Full</span></p><p className="text-sm text-muted-foreground">Chegará entre terça e quinta-feira</p></div></div>
            <LocationDialog>{(open) => <button onClick={open} className="mt-5 flex items-start gap-3 text-left"><MapPin className="mt-0.5 size-5 text-action" /><p className="text-sm">Enviar para <span className="font-semibold text-action">{locationLabel(location)}</span></p></button>}</LocationDialog>
            <p className="mt-6 font-semibold">Estoque disponível</p><p className="mt-1 text-sm text-muted-foreground">{product.stock} unidades disponíveis</p>
            <label className="mt-4 block text-sm">Quantidade: <select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="ml-2 rounded-md border border-input bg-card px-3 py-2">{Array.from({ length: Math.min(product.stock, 6) }, (_, index) => <option key={index + 1}>{index + 1}</option>)}</select></label>
            {upsells.length > 0 && <div className="mt-6 border-y border-border py-5"><p className="font-semibold">Aproveite e leve junto</p><p className="mt-1 text-xs text-muted-foreground">Oferta opcional adicionada ao seu pedido</p><div className="mt-4 space-y-3">{upsells.map((upsell) => <label key={upsell.slug} className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 ${selectedUpsell === upsell.slug ? "border-action bg-secondary" : "border-border"}`}><input type="checkbox" checked={selectedUpsell === upsell.slug} onChange={() => setSelectedUpsell((current) => current === upsell.slug ? "" : upsell.slug)} className="size-4 accent-action" /><img src={upsell.image} alt="" loading="lazy" width={120} height={120} className="size-16 rounded-md object-cover" /><span className="min-w-0 flex-1"><span className="line-clamp-2 text-sm font-medium">{upsell.name}</span><span className="mt-1 block text-sm font-semibold text-success">+ {formatBRL(upsell.priceValue)}</span></span></label>)}</div></div>}
            <div className="mt-6 grid gap-3"><Button asChild className="h-12 w-full"><Link to="/checkout" search={{ produto: product.slug, quantidade: quantity, adicional: selectedUpsell }}>Comprar agora</Link></Button><Button variant="secondary" className="h-12 w-full text-action">Adicionar ao carrinho</Button></div>
            <div className="mt-5 flex items-start gap-2 text-sm text-muted-foreground"><ShieldCheck className="size-5 shrink-0 text-action" /><p><span className="text-action">Compra Garantida.</span> Receba o produto que está esperando ou devolvemos o dinheiro.</p></div>
          </div>
        </section>

        <section className="mt-4 bg-card p-5 sm:p-8">
          <h2 className="text-xl font-semibold sm:text-2xl">Descrição do produto</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{product.description}</p>
          <h2 className="mt-8 text-xl font-semibold">Características principais</h2>
          <dl className="mt-4 max-w-2xl overflow-hidden rounded-md border border-border">{product.features.map(([label, value], index) => <div key={label} className={`grid grid-cols-[0.8fr_1.2fr] gap-4 p-3 text-sm ${index % 2 === 0 ? "bg-muted" : "bg-card"}`}><dt className="font-medium">{label}</dt><dd>{value}</dd></div>)}</dl>
        </section>

        <section id="avaliacoes" className="mt-4 bg-card p-5 sm:p-8">
          <h2 className="text-xl font-semibold sm:text-2xl">Opiniões sobre o produto</h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
            <div><div className="flex items-end gap-3"><span className="text-5xl font-light">{product.rating}</span><div><div className="text-xl text-rating">★★★★★</div><p className="text-xs text-muted-foreground">{product.reviewsCount} avaliações</p></div></div><div className="mt-6 space-y-2">{[5,4,3,2,1].map((score) => <div key={score} className="flex items-center gap-2 text-xs text-muted-foreground"><span>{score}</span><Star className="size-3 fill-rating text-rating" /><div className="h-1 flex-1 rounded-full bg-muted"><div className="h-full rounded-full bg-rating" style={{ width: score === 5 ? "82%" : score === 4 ? "13%" : "3%" }} /></div></div>)}</div></div>
            <div className="divide-y divide-border">
              {product.reviews.map((review) => <article key={`${review.author}-${review.date}`} className="py-6 first:pt-0"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><img src={review.avatar} alt="" loading="lazy" width={816} height={816} className="size-10 rounded-full object-cover" /><div><p className="flex items-center gap-1 text-sm font-semibold">{review.author}<BadgeCheck className="size-4 fill-action text-action-foreground" aria-label="Perfil verificado" /></p><p className="text-xs text-muted-foreground">{review.city}</p></div></div><span className="text-xs text-muted-foreground">{review.date}</span></div><div className="mt-3 flex text-rating" aria-label={`${review.rating} estrelas`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} className={`size-4 ${index < review.rating ? "fill-rating" : "text-border"}`} />)}</div><h3 className="mt-3 font-semibold">{review.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{review.text}</p>{review.image && <img src={review.image} alt={`Foto enviada por ${review.author}`} loading="lazy" width={1024} height={1024} className="mt-4 size-32 rounded-md object-cover sm:size-40" />}<div className="mt-4 flex items-center justify-between"><p className="flex items-center gap-1 text-xs text-success"><ShieldCheck className="size-4" /> Compra verificada</p><span className="flex items-center gap-1 text-xs text-muted-foreground"><ThumbsUp className="size-3.5" /> Útil ({review.likes})</span></div></article>)}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}