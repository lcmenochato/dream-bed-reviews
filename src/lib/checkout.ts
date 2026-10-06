export type ShippingMethod = "free" | "express";

export const shippingOptions = {
  free: {
    label: "Frete grátis",
    detail: "Chega entre 4 e 6 dias úteis",
    price: 0,
  },
  express: {
    label: "Entrega rápida",
    detail: "Chega em 2 dias",
    price: 19.9,
  },
} as const;

export type CheckoutPayload = {
  productSlug: string;
  quantity: number;
  upsellSlug: string | null;
  delivery: {
    city: string;
    cep: string;
    street: string;
    number: string;
    shippingMethod: ShippingMethod;
    shippingPrice: number;
  };
  paymentMethod: "pix";
  total: number;
};

export function buildCheckoutPayload(input: Omit<CheckoutPayload, "paymentMethod">): CheckoutPayload {
  return { ...input, paymentMethod: "pix" };
}