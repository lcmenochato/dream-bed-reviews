import { useState, type ReactNode } from "react";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCep, useDeliveryLocation } from "@/lib/location";

export function LocationDialog({ children }: { children: (open: () => void) => ReactNode }) {
  const [location, save] = useDeliveryLocation();
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("");
  const [cep, setCep] = useState("");
  const valid = city.trim().length > 1 && cep.replace(/\D/g, "").length === 8;

  const show = () => { setCity(location.city); setCep(location.cep); setOpen(true); };

  return (
    <>
      {children(show)}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 px-4" onClick={() => setOpen(false)}>
          <form role="dialog" aria-modal="true" aria-label="Informe sua localização" onClick={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); if (valid) { save({ city: city.trim(), cep }); setOpen(false); } }} className="w-full max-w-md rounded-lg bg-card p-6 text-foreground shadow-product">
            <div className="flex items-start justify-between gap-4">
              <div><h2 className="text-lg font-semibold">Selecione onde quer receber</h2><p className="mt-1 text-sm text-muted-foreground">Você poderá ver custos e prazos de entrega precisos.</p></div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fechar" className="text-muted-foreground"><X className="size-5" /></button>
            </div>
            <label className="mt-5 block text-sm">Cidade<input autoFocus value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ex.: Campinas" className="mt-1 h-11 w-full rounded-md border border-input bg-card px-3 outline-none focus:ring-2 focus:ring-ring" /></label>
            <label className="mt-4 block text-sm">CEP<input inputMode="numeric" value={cep} onChange={(e) => setCep(formatCep(e.target.value))} placeholder="00000-000" className="mt-1 h-11 w-full rounded-md border border-input bg-card px-3 outline-none focus:ring-2 focus:ring-ring" /></label>
            <Button type="submit" disabled={!valid} className="mt-6 h-11 w-full"><MapPin className="size-4" /> Usar esta localização</Button>
          </form>
        </div>
      )}
    </>
  );
}
