import colchaoQueen from "@/assets/colchao-box-queen.jpg";
import guardaRoupa from "@/assets/guarda-roupa-freijo.jpg";
import camaSolteiro from "@/assets/cama-box-solteiro.jpg";
import colchaoCasal from "@/assets/colchao-casal-d33.jpg";
import guardaRoupaBranco from "@/assets/guarda-roupa-branco.jpg";
import camaBoxBau from "@/assets/cama-box-bau-casal.jpg";
import fotoAvaliacao from "@/assets/avaliacao-cama-real.jpg";
import fotoAvaliacaoCinza from "@/assets/avaliacao-box-cinza.jpg";

export type Review = {
  author: string;
  date: string;
  rating: number;
  title: string;
  text: string;
  image?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: "Colchões" | "Camas box" | "Guarda-roupas";
  image: string;
  gallery: string[];
  oldPrice: string;
  price: string;
  installments: string;
  discount: string;
  rating: string;
  reviewsCount: string;
  sold: string;
  stock: number;
  description: string;
  features: Array<[string, string]>;
  reviews: Review[];
};

const bedReviews: Review[] = [
  {
    author: "Mariana S.",
    date: "há 12 dias",
    rating: 5,
    title: "Superou minhas expectativas",
    text: "Chegou antes do prazo e bem embalado. É firme sem ser duro e a base ficou linda no quarto. Depois de duas semanas, continuo dormindo muito bem.",
    image: fotoAvaliacao,
  },
  {
    author: "Rafael M.",
    date: "há 1 mês",
    rating: 5,
    title: "Excelente pelo preço",
    text: "A montagem foi simples e não fez barulho. O tecido veio limpo, sem marcas, e o conforto é melhor do que eu esperava.",
    image: fotoAvaliacaoCinza,
  },
  {
    author: "Patrícia L.",
    date: "há 2 meses",
    rating: 4,
    title: "Boa compra",
    text: "Produto confortável e igual ao anúncio. A transportadora atrasou um dia, mas avisou e entregou tudo certinho.",
  },
];

const wardrobeReviews: Review[] = [
  {
    author: "Carlos R.",
    date: "há 18 dias",
    rating: 5,
    title: "Bonito e espaçoso",
    text: "É igual às fotos e coube bastante roupa. A montagem leva tempo, mas as peças vieram numeradas e sem avarias.",
    image: guardaRoupaBranco,
  },
  {
    author: "Renata A.",
    date: "há 2 meses",
    rating: 4,
    title: "Vale o preço",
    text: "As gavetas correm bem e as portas ficaram alinhadas. Recomendo contratar um montador para o acabamento ficar perfeito.",
  },
];

export const products: Product[] = [
  {
    slug: "cama-box-queen-confort-premium",
    name: "Cama Box Queen + Colchão Molas Ensacadas Confort Premium",
    category: "Colchões",
    image: colchaoQueen,
    gallery: [colchaoQueen, fotoAvaliacao, fotoAvaliacaoCinza],
    oldPrice: "R$ 2.499",
    price: "R$ 1.299",
    installments: "10x R$ 129,90 sem juros",
    discount: "48% OFF",
    rating: "4.8",
    reviewsCount: "1.243",
    sold: "+5 mil vendidos",
    stock: 8,
    description: "Conjunto queen com base bipartida e colchão de molas ensacadas que reduz a transferência de movimento. Tecido macio, tratamento antialérgico e conforto firme para uso diário.",
    features: [["Tamanho", "Queen 158 x 198 cm"], ["Altura total", "64 cm"], ["Suporte", "Até 120 kg por pessoa"], ["Garantia", "12 meses"]],
    reviews: bedReviews,
  },
  {
    slug: "guarda-roupa-casal-freijo-6-portas",
    name: "Guarda-Roupa Casal 6 Portas 6 Gavetas Freijó e Branco",
    category: "Guarda-roupas",
    image: guardaRoupa,
    gallery: [guardaRoupa, guardaRoupaBranco],
    oldPrice: "R$ 2.099",
    price: "R$ 1.189",
    installments: "10x R$ 118,90 sem juros",
    discount: "43% OFF",
    rating: "4.7",
    reviewsCount: "856",
    sold: "+1 mil vendidos",
    stock: 5,
    description: "Guarda-roupa de casal com amplo espaço interno, cabideiros em alumínio, seis gavetas e nichos para organizar roupas e acessórios.",
    features: [["Largura", "240 cm"], ["Altura", "230 cm"], ["Profundidade", "47 cm"], ["Material", "MDF e MDP"]],
    reviews: wardrobeReviews,
  },
  {
    slug: "cama-box-solteiro-d33-cinza",
    name: "Cama Box Solteiro com Colchão Espuma D33 Cinza",
    category: "Camas box",
    image: camaSolteiro,
    gallery: [camaSolteiro, fotoAvaliacaoCinza],
    oldPrice: "R$ 1.199",
    price: "R$ 649",
    installments: "10x R$ 64,90 sem juros",
    discount: "45% OFF",
    rating: "4.9",
    reviewsCount: "538",
    sold: "+2 mil vendidos",
    stock: 12,
    description: "Cama box solteiro com colchão de espuma D33, indicada para quem prefere sustentação firme. Base reforçada e revestimento cinza fácil de combinar.",
    features: [["Tamanho", "88 x 188 cm"], ["Altura total", "56 cm"], ["Suporte", "Até 110 kg"], ["Densidade", "D33"]],
    reviews: bedReviews,
  },
  {
    slug: "colchao-casal-espuma-d33",
    name: "Colchão Casal Espuma D33 Ortopédico 138 x 188 cm",
    category: "Colchões",
    image: colchaoCasal,
    gallery: [colchaoCasal, fotoAvaliacao],
    oldPrice: "R$ 899",
    price: "R$ 499",
    installments: "10x R$ 49,90 sem juros",
    discount: "44% OFF",
    rating: "4.7",
    reviewsCount: "2.104",
    sold: "+10 mil vendidos",
    stock: 19,
    description: "Colchão de casal firme com espuma certificada D33 e revestimento respirável. Uma opção econômica para uso diário, com tratamento antiácaro e antialérgico.",
    features: [["Tamanho", "Casal 138 x 188 cm"], ["Altura", "18 cm"], ["Suporte", "Até 100 kg por pessoa"], ["Conforto", "Firme"]],
    reviews: bedReviews,
  },
  {
    slug: "guarda-roupa-solteiro-branco-4-portas",
    name: "Guarda-Roupa Solteiro 4 Portas 2 Gavetas Branco",
    category: "Guarda-roupas",
    image: guardaRoupaBranco,
    gallery: [guardaRoupaBranco, guardaRoupa],
    oldPrice: "R$ 999",
    price: "R$ 579",
    installments: "10x R$ 57,90 sem juros",
    discount: "42% OFF",
    rating: "4.6",
    reviewsCount: "692",
    sold: "+1 mil vendidos",
    stock: 7,
    description: "Modelo compacto para quartos menores, com quatro portas, duas gavetas e divisão interna prática. Acabamento branco fosco e puxadores resistentes.",
    features: [["Largura", "160 cm"], ["Altura", "200 cm"], ["Profundidade", "46 cm"], ["Material", "MDP"]],
    reviews: wardrobeReviews,
  },
  {
    slug: "cama-box-bau-casal-cinza",
    name: "Cama Box Baú Casal Cinza + Colchão de Molas",
    category: "Camas box",
    image: camaBoxBau,
    gallery: [camaBoxBau, fotoAvaliacaoCinza, colchaoCasal],
    oldPrice: "R$ 1.899",
    price: "R$ 999",
    installments: "10x R$ 99,90 sem juros",
    discount: "47% OFF",
    rating: "4.8",
    reviewsCount: "967",
    sold: "+5 mil vendidos",
    stock: 6,
    description: "Conjunto casal com baú de grande capacidade e abertura assistida por pistões. Colchão de molas com conforto intermediário e revestimento cinza resistente.",
    features: [["Tamanho", "Casal 138 x 188 cm"], ["Baú", "Profundidade de 27 cm"], ["Suporte", "Até 110 kg por pessoa"], ["Abertura", "Pistões a gás"]],
    reviews: bedReviews,
  },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);