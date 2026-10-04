import { Link } from "@tanstack/react-router";
import { ChevronDown, MapPin, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StoreHeader({ query, onQueryChange }: { query?: string; onQueryChange?: (value: string) => void }) {
  return (
    <header className="sticky top-0 z-30 bg-primary shadow-header">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="hidden items-center gap-1 text-xl font-bold text-primary-foreground sm:flex" aria-label="Mercado Móvel — início">
            mercado <span className="rounded-sm bg-primary-foreground px-1 text-primary">móvel</span>
          </Link>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input value={query ?? ""} readOnly={!onQueryChange} onChange={(event) => onQueryChange?.(event.target.value)} className="h-11 w-full rounded-md border-0 bg-card pl-10 pr-4 text-base text-foreground shadow-search outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" placeholder="Buscar colchões, camas e armários" aria-label="Buscar produtos" />
          </div>
          <Button variant="icon" size="icon" aria-label="Abrir carrinho"><ShoppingCart className="size-5" /></Button>
        </div>
        <Button variant="ghost" size="sm" className="mt-2 min-w-0 px-1 text-primary-foreground" aria-label="Alterar endereço de entrega">
          <MapPin className="size-5 shrink-0" />
          <span className="min-w-0 truncate text-left"><span className="block text-xs opacity-70">Enviar para</span>São Paulo 01001-000</span>
          <ChevronDown className="size-4" />
        </Button>
      </div>
    </header>
  );
}