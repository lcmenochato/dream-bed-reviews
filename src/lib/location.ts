import { useEffect, useState } from "react";

export type DeliveryLocation = { city: string; cep: string };
const KEY = "ml-delivery-location";
const EVENT = "ml-location-change";
const fallback: DeliveryLocation = { city: "", cep: "" };

export function formatCep(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

export function locationLabel(location: DeliveryLocation) {
  return location.city || location.cep ? `${location.city} ${location.cep}`.trim() : "Informe seu CEP";
}

export function useDeliveryLocation() {
  const [location, setLocation] = useState<DeliveryLocation>(fallback);
  useEffect(() => {
    const read = () => {
      try { setLocation(JSON.parse(localStorage.getItem(KEY) ?? "null") ?? fallback); } catch { setLocation(fallback); }
    };
    read();
    window.addEventListener(EVENT, read);
    return () => window.removeEventListener(EVENT, read);
  }, []);
  const save = (next: DeliveryLocation) => {
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVENT));
  };
  return [location, save] as const;
}
