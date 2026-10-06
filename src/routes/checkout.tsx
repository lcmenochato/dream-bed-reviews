import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, ChevronRight, CreditCard, MapPin, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoreHeader } from "@/components/store-header";
import { formatBRL, getProduct } from "@/lib/catalog";
import { formatCep, locationLabel, useDeliveryLocation } from "@/lib/location";

type CheckoutSearch = { produto?: string; quantidade?: number };

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): CheckoutSearch => ({
    produto: typeof search.produto === "string" ? search.produto : undefined,
    quantidade: typeof search.quantidade === "number" ? Math.max(1, Math.min(6, search.quantidade)) : 1,
  }),
  head: () => ({ meta: [
    { title: "Finalizar compra | Mercado Livre" },
    { name: "description", content: "Revise a entrega, escolha o pagamento e confirme sua compra." },
    { property: "og:title", content: "Finalizar compra | Mercado Livre" },
    { property: "og:description", content: "Checkout seguro para concluir sua compra." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Checkout,
});

function Checkout() {
  const search = Route.useSearch();
  const product = search.produto ? getProduct(search.produto) : undefined;
  const quantity = search.quantidade ?? 1;
  const navigate = useNavigate();
  const [location, saveLocation] = useDeliveryLocation();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(location.city && location.cep ? 2 : 1);
  const [city, setCity] = useState(location.city);
  const [cep, setCep] = useState(location.cep);
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [payment, setPayment] = useState("pix");
  const total = product ? product.priceValue * quantity : 0;

  if (!product) return <main className="grid min-h-screen place-items-center bg-background px-4 text-center"><div><h1 className="text-xl font-semibold">Sua sacola está vazia</h1><Button asChild className="mt-5"><Link to="/">Ver ofertas</Link></Button></div></main>;

  const submitAddress = () => {
    if (!city.trim() || cep.replace(/\D/g, "").length !== 8 || !street.trim() || !number.trim()) return;
    saveLocation({ city: city.trim(), cep });
    setStep(2);
  };

  return (
    <main className="min-h-screen bg-background pb-16">
      <StoreHeader />
      <div className="mx-auto max-w-5xl px-4 py-5">
        <button onClick={() => navigate({ to: "/produto/$slug", params: { slug: product.slug } })} className="mb-5 flex items-center gap-1 text-sm text-action"><ArrowLeft className="size-4" /> Voltar ao produto</button>
        <div className="mb-8 flex items-center justify-center gap-2 text-xs sm:gap-4 sm:text-sm">
          {["Entrega", "Pagamento", "Revisão"].map((label, index) => <div key={label} className="flex items-center gap-2"><span className={`grid size-7 place-items-center rounded-full font-semibold ${step > index + 1 ? "bg-success text-success-foreground" : step === index + 1 ? "bg-action text-action-foreground" : "bg-muted text-muted-foreground"}`}>{step > index + 1 ? <Check className="size-4" /> : index + 1}</span><span className="hidden sm:inline">{label}</span>{index < 2 && <ChevronRight className="size-4 text-muted-foreground" />}</div>)}
        </div>

        {step === 4 ? <section className="mx-auto max-w-xl bg-card p-7 text-center sm:p-10"><span className="mx-auto grid size-16 place-items-center rounded-full bg-success text-success-foreground"><PackageCheck className="size-8" /></span><h1 className="mt-5 text-2xl font-semibold">Pedido confirmado!</h1><p className="mt-2 text-muted-foreground">Esta é uma demonstração. Nenhuma cobrança foi realizada.</p><p className="mt-5 text-sm">Entrega para <strong>{locationLabel(location)}</strong></p><Button asChild className="mt-7"><Link to="/">Continuar comprando</Link></Button></section> : (
          <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
            <section className="bg-card p-5 sm:p-7">
              {step === 1 && <><div className="flex items-center gap-3"><MapPin className="text-action" /><h1 className="text-xl font-semibold">Onde você quer receber?</h1></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-sm">Cidade<input value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-input px-3" placeholder="Sua cidade" /></label><label className="text-sm">CEP<input value={cep} onChange={(e) => setCep(formatCep(e.target.value))} inputMode="numeric" className="mt-1 h-11 w-full rounded-md border border-input px-3" placeholder="00000-000" /></label><label className="text-sm sm:col-span-2">Endereço<input value={street} onChange={(e) => setStreet(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-input px-3" placeholder="Rua ou avenida" /></label><label className="text-sm">Número<input value={number} onChange={(e) => setNumber(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-input px-3" placeholder="Número" /></label></div><Button onClick={submitAddress} className="mt-6 h-12 w-full sm:w-auto">Continuar</Button></>}
              {step === 2 && <><div className="flex items-center gap-3"><CreditCard className="text-action" /><h1 className="text-xl font-semibold">Como você prefere pagar?</h1></div><div className="mt-6 divide-y divide-border rounded-md border border-border">{[["pix", "Pix", "Aprovação imediata · 10% de desconto"], ["card", "Cartão de crédito", "Até 10x sem juros"], ["boleto", "Boleto bancário", "Vencimento em 1 dia útil"]].map(([value, label, detail]) => <label key={value} className="flex cursor-pointer items-center gap-3 p-4"><input type="radio" name="payment" value={value} checked={payment === value} onChange={() => setPayment(value)} className="size-4 accent-action" /><span><span className="block font-medium">{label}</span><span className="text-xs text-muted-foreground">{detail}</span></span></label>)}</div><div className="mt-6 flex gap-3"><Button variant="secondary" onClick={() => setStep(1)}>Voltar</Button><Button onClick={() => setStep(3)}>Continuar</Button></div></>}
              {step === 3 && <><h1 className="text-xl font-semibold">Revise e confirme sua compra</h1><div className="mt-6 space-y-5"><div className="flex gap-3"><MapPin className="size-5 shrink-0 text-action" /><div><p className="font-medium">Entrega no endereço</p><p className="text-sm text-muted-foreground">{street}, {number} · {locationLabel(location)}</p></div></div><div className="flex gap-3"><CreditCard className="size-5 shrink-0 text-action" /><div><p className="font-medium">Pagamento</p><p className="text-sm text-muted-foreground">{payment === "pix" ? "Pix" : payment === "card" ? "Cartão de crédito" : "Boleto bancário"}</p></div></div><div className="flex gap-3"><Truck className="size-5 shrink-0 text-success" /><div><p className="font-medium text-success">Frete grátis Full</p><p className="text-sm text-muted-foreground">Chegará entre terça e quinta-feira</p></div></div></div><div className="mt-7 flex gap-3"><Button variant="secondary" onClick={() => setStep(2)}>Voltar</Button><Button onClick={() => setStep(4)}>Confirmar compra</Button></div><div className="mt-5 flex items-start gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4 shrink-0 text-action" /> Ambiente demonstrativo: nenhum pagamento real será processado.</div></>}
            </section>
            <aside className="h-fit bg-card p-5"><h2 className="font-semibold">Resumo da compra</h2><div className="mt-4 flex gap-3"><img src={product.image} alt="" className="size-20 rounded-md object-cover" /><div><p className="line-clamp-2 text-sm">{product.name}</p><p className="mt-1 text-xs text-muted-foreground">Quantidade: {quantity}</p></div></div><div className="mt-5 space-y-2 border-t border-border pt-4 text-sm"><div className="flex justify-between"><span>Produtos</span><span>{formatBRL(total)}</span></div><div className="flex justify-between text-success"><span>Frete</span><span>Grátis</span></div><div className="flex justify-between border-t border-border pt-3 text-lg font-semibold"><span>Total</span><span>{formatBRL(payment === "pix" ? total * 0.9 : total)}</span></div>{payment === "pix" && <p className="text-right text-xs text-success">10% de desconto no Pix</p>}</div></aside>
          </div>
        )}
      </div>
    </main>
  );
}