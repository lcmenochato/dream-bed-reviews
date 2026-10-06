import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, ChevronRight, Clock3, Copy, MapPin, PackageCheck, QrCode, ShieldCheck, Truck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoreHeader } from "@/components/store-header";
import { buildCheckoutPayload, shippingOptions, type ShippingMethod } from "@/lib/checkout";
import { formatBRL, getProduct } from "@/lib/catalog";
import { formatCep, locationLabel, useDeliveryLocation } from "@/lib/location";

type CheckoutSearch = { produto: string; quantidade: number; adicional: string };

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): CheckoutSearch => ({
    produto: typeof search["produto"] === "string" ? search["produto"] : "",
    quantidade: typeof search["quantidade"] === "number" ? Math.max(1, Math.min(6, search["quantidade"])) : 1,
    adicional: typeof search["adicional"] === "string" ? search["adicional"] : "",
  }),
  head: () => ({ meta: [
    { title: "Finalizar compra com Pix | Mercado Livre" },
    { name: "description", content: "Revise a entrega, pague com Pix e confirme sua compra." },
    { property: "og:title", content: "Finalizar compra com Pix | Mercado Livre" },
    { property: "og:description", content: "Checkout seguro com opções de entrega e pagamento por Pix." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Checkout,
});

function Checkout() {
  const search = Route.useSearch();
  const product = search.produto ? getProduct(search.produto) : undefined;
  const upsell = search.adicional ? getProduct(search.adicional) : undefined;
  const quantity = search.quantidade ?? 1;
  const navigate = useNavigate();
  const [location, saveLocation] = useDeliveryLocation();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [city, setCity] = useState(location.city);
  const [cep, setCep] = useState(location.cep);
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [shipping, setShipping] = useState<ShippingMethod>("free");
  const itemsTotal = product ? product.priceValue * quantity + (upsell?.priceValue ?? 0) : 0;
  const pixDiscount = itemsTotal * 0.1;
  const shippingPrice = shippingOptions[shipping].price;
  const total = itemsTotal - pixDiscount + shippingPrice;

  if (!product) return <main className="grid min-h-screen place-items-center bg-background px-4 text-center"><div><h1 className="text-xl font-semibold">Sua sacola está vazia</h1><Button asChild className="mt-5"><Link to="/">Ver ofertas</Link></Button></div></main>;

  const submitAddress = () => {
    if (!city.trim() || cep.replace(/\D/g, "").length !== 8 || !street.trim() || !number.trim()) return;
    saveLocation({ city: city.trim(), cep });
    setStep(2);
  };

  const confirmOrder = () => {
    const payload = buildCheckoutPayload({
      productSlug: product.slug,
      quantity,
      upsellSlug: upsell?.slug ?? null,
      delivery: { city, cep, street, number, shippingMethod: shipping, shippingPrice },
      total,
    });
    void payload;
    setStep(5);
  };

  const progressStep = Math.min(step, 4);
  return <main className="min-h-screen bg-background pb-16">
    <StoreHeader />
    <div className="mx-auto max-w-5xl px-4 py-5">
      <button onClick={() => navigate({ to: "/produto/$slug", params: { slug: product.slug } })} className="mb-5 flex items-center gap-1 text-sm text-action"><ArrowLeft className="size-4" /> Voltar ao produto</button>
      <div className="mb-8 flex items-center justify-center gap-1 text-xs sm:gap-3 sm:text-sm">{["Entrega", "Frete", "Pix", "Revisão"].map((label, index) => <div key={label} className="flex items-center gap-1 sm:gap-2"><span className={`grid size-7 place-items-center rounded-full font-semibold ${progressStep > index + 1 ? "bg-success text-success-foreground" : progressStep === index + 1 ? "bg-action text-action-foreground" : "bg-muted text-muted-foreground"}`}>{progressStep > index + 1 ? <Check className="size-4" /> : index + 1}</span><span className="hidden sm:inline">{label}</span>{index < 3 && <ChevronRight className="size-4 text-muted-foreground" />}</div>)}</div>

      {step === 5 ? <section className="mx-auto max-w-xl bg-card p-7 text-center sm:p-10"><span className="mx-auto grid size-16 place-items-center rounded-full bg-success text-success-foreground"><PackageCheck className="size-8" /></span><h1 className="mt-5 text-2xl font-semibold">Pedido reservado!</h1><p className="mt-2 text-muted-foreground">Esta é uma demonstração. Nenhum Pix foi gerado e nenhuma cobrança foi realizada.</p><p className="mt-5 text-sm">Entrega para <strong>{locationLabel(location)}</strong></p><Button asChild className="mt-7"><Link to="/">Continuar comprando</Link></Button></section> : <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <section className="bg-card p-5 sm:p-7">
          {step === 1 && <><div className="flex items-center gap-3"><MapPin className="text-action" /><h1 className="text-xl font-semibold">Onde você quer receber?</h1></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-sm">Cidade<input value={city} onChange={(event) => setCity(event.target.value)} className="mt-1 h-11 w-full rounded-md border border-input px-3" placeholder="Sua cidade" /></label><label className="text-sm">CEP<input value={cep} onChange={(event) => setCep(formatCep(event.target.value))} inputMode="numeric" className="mt-1 h-11 w-full rounded-md border border-input px-3" placeholder="00000-000" /></label><label className="text-sm sm:col-span-2">Endereço<input value={street} onChange={(event) => setStreet(event.target.value)} className="mt-1 h-11 w-full rounded-md border border-input px-3" placeholder="Rua ou avenida" /></label><label className="text-sm">Número<input value={number} onChange={(event) => setNumber(event.target.value)} className="mt-1 h-11 w-full rounded-md border border-input px-3" placeholder="Número" /></label></div><Button onClick={submitAddress} className="mt-6 h-12 w-full sm:w-auto">Continuar</Button></>}
          {step === 2 && <><div className="flex items-center gap-3"><Truck className="text-action" /><div><h1 className="text-xl font-semibold">Escolha quando receber</h1><p className="mt-1 text-sm text-muted-foreground">Envio para {locationLabel(location)}</p></div></div><div className="mt-6 space-y-3">{(Object.entries(shippingOptions) as Array<[ShippingMethod, typeof shippingOptions[ShippingMethod]]>).map(([value, option]) => <label key={value} className={`flex cursor-pointer items-center gap-4 rounded-md border p-4 ${shipping === value ? "border-action bg-secondary" : "border-border"}`}><input type="radio" name="shipping" checked={shipping === value} onChange={() => setShipping(value)} className="size-4 accent-action" /><span className={`grid size-10 place-items-center rounded-full ${value === "free" ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground"}`}>{value === "free" ? <Zap className="size-5 fill-current" /> : <Clock3 className="size-5" />}</span><span className="flex-1"><span className="block font-semibold">{option.label}</span><span className="text-sm text-muted-foreground">{option.detail}</span></span><strong className={option.price === 0 ? "text-success" : "text-foreground"}>{option.price === 0 ? "Grátis" : formatBRL(option.price)}</strong></label>)}</div><div className="mt-6 flex gap-3"><Button variant="secondary" onClick={() => setStep(1)}>Voltar</Button><Button onClick={() => setStep(3)}>Continuar</Button></div></>}
          {step === 3 && <><div className="flex items-center gap-3"><QrCode className="text-action" /><div><h1 className="text-xl font-semibold">Pague com Pix</h1><p className="mt-1 text-sm text-muted-foreground">Aprovação imediata e 10% de desconto</p></div></div><div className="mt-6 rounded-md border border-action bg-secondary p-5"><div className="flex items-center justify-between"><div><p className="font-semibold">Pix</p><p className="mt-1 text-sm text-muted-foreground">Você receberá o QR Code ao confirmar</p></div><span className="grid size-12 place-items-center rounded-md bg-card"><QrCode className="size-7 text-action" /></span></div><div className="mt-5 flex items-start gap-2 border-t border-border pt-4 text-xs text-muted-foreground"><ShieldCheck className="size-4 shrink-0 text-action" /> O código Pix será gerado com segurança quando sua API de pagamento for integrada.</div></div><div className="mt-6 flex gap-3"><Button variant="secondary" onClick={() => setStep(2)}>Voltar</Button><Button onClick={() => setStep(4)}>Revisar compra</Button></div></>}
          {step === 4 && <><h1 className="text-xl font-semibold">Revise e confirme sua compra</h1><div className="mt-6 space-y-5"><div className="flex gap-3"><MapPin className="size-5 shrink-0 text-action" /><div><p className="font-medium">Entrega no endereço</p><p className="text-sm text-muted-foreground">{street}, {number} · {locationLabel(location)}</p></div></div><div className="flex gap-3"><Truck className="size-5 shrink-0 text-success" /><div><p className="font-medium">{shippingOptions[shipping].label}</p><p className="text-sm text-muted-foreground">{shippingOptions[shipping].detail}{shippingPrice ? ` · ${formatBRL(shippingPrice)}` : " · sem custo adicional"}</p></div></div><div className="flex gap-3"><QrCode className="size-5 shrink-0 text-action" /><div><p className="font-medium">Pix</p><p className="text-sm text-success">10% de desconto aplicado</p></div></div></div><div className="mt-7 flex gap-3"><Button variant="secondary" onClick={() => setStep(3)}>Voltar</Button><Button onClick={confirmOrder}>Confirmar e gerar Pix</Button></div><div className="mt-5 flex items-start gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4 shrink-0 text-action" /> Ambiente demonstrativo: nenhum pagamento real será processado.</div></>}
        </section>
        <aside className="h-fit bg-card p-5"><h2 className="font-semibold">Resumo da compra</h2><div className="mt-4 flex gap-3"><img src={product.image} alt="" className="size-20 rounded-md object-cover" /><div><p className="line-clamp-2 text-sm">{product.name}</p><p className="mt-1 text-xs text-muted-foreground">Quantidade: {quantity}</p></div></div>{upsell && <div className="mt-4 flex gap-3 border-t border-border pt-4"><img src={upsell.image} alt="" className="size-16 rounded-md object-cover" /><div><p className="text-xs font-semibold text-success">Oferta adicionada</p><p className="line-clamp-2 text-sm">{upsell.name}</p></div></div>}<div className="mt-5 space-y-2 border-t border-border pt-4 text-sm"><div className="flex justify-between"><span>Produtos</span><span>{formatBRL(itemsTotal)}</span></div><div className="flex justify-between text-success"><span>Desconto no Pix</span><span>- {formatBRL(pixDiscount)}</span></div><div className="flex justify-between"><span>Frete</span><span className={shippingPrice === 0 ? "text-success" : ""}>{shippingPrice === 0 ? "Grátis" : formatBRL(shippingPrice)}</span></div><div className="flex justify-between border-t border-border pt-3 text-lg font-semibold"><span>Total</span><span>{formatBRL(total)}</span></div><p className="flex items-center justify-end gap-1 text-xs text-muted-foreground"><Copy className="size-3" /> Pix à vista</p></div></aside>
      </div>}
    </div>
  </main>;
}