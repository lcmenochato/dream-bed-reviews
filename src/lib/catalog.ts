import colchaoQueen from "@/assets/colchao-box-queen.jpg";
import guardaRoupa from "@/assets/guarda-roupa-freijo.jpg";
import camaSolteiro from "@/assets/cama-box-solteiro.jpg";
import colchaoCasal from "@/assets/colchao-casal-d33.jpg";
import guardaRoupaBranco from "@/assets/guarda-roupa-branco.jpg";
import camaBoxBau from "@/assets/cama-box-bau-casal.jpg";
import colchaoSolteiro from "@/assets/colchao-solteiro-d20.jpg";
import basePreta from "@/assets/base-box-preta.jpg";
import guardaRoupaInfantil from "@/assets/guarda-roupa-infantil.jpg";
import colchaoD28 from "@/assets/colchao-casal-d28.jpg";
import guardaRoupaEspelho from "@/assets/guarda-roupa-espelho.jpg";
import cabeceira from "@/assets/cabeceira-casal.jpg";
import comoda from "@/assets/comoda-branca.jpg";
import camaMarrom from "@/assets/cama-box-casal-marrom.jpg";
import fotoCamaReal from "@/assets/avaliacao-cama-real.jpg";
import fotoBoxCinza from "@/assets/avaliacao-box-cinza.jpg";
import fotoPlastico from "@/assets/avaliacao-colchao-plastico.jpg";
import fotoQuarto from "@/assets/avaliacao-quarto-pronto.jpg";
import fotoTecido from "@/assets/avaliacao-detalhe-tecido.jpg";
import fotoArmario from "@/assets/avaliacao-guarda-roupa-montado.jpg";
import perfilMariana from "@/assets/perfil-mariana.jpg";
import perfilRafael from "@/assets/perfil-rafael.jpg";
import perfilPatricia from "@/assets/perfil-patricia.jpg";
import perfilCarlos from "@/assets/perfil-carlos.jpg";
import perfilRenata from "@/assets/perfil-renata.jpg";
import perfilBruno from "@/assets/perfil-bruno.jpg";
import perfilJuliana from "@/assets/perfil-juliana.jpg";
import perfilThiago from "@/assets/perfil-thiago.jpg";
import perfilAline from "@/assets/perfil-aline.jpg";
import perfilCamila from "@/assets/perfil-camila.jpg";
import perfilDiego from "@/assets/perfil-diego.jpg";
import perfilFernanda from "@/assets/perfil-fernanda.jpg";
import perfilLucas from "@/assets/perfil-lucas.jpg";
import perfilVanessa from "@/assets/perfil-vanessa.jpg";
import perfilMarcos from "@/assets/perfil-marcos.jpg";
import perfilDebora from "@/assets/perfil-debora.jpg";
import perfilGustavo from "@/assets/perfil-gustavo.jpg";
import perfilSandra from "@/assets/perfil-sandra.jpg";

export type Review = {
  author: string;
  avatar: string;
  city: string;
  date: string;
  rating: number;
  title: string;
  text: string;
  image?: string;
  likes: number;
};

export type Category = "Colchões" | "Camas box" | "Guarda-roupas" | "Cômodas e cabeceiras";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  image: string;
  gallery: string[];
  oldPriceValue: number;
  priceValue: number;
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
  upsellSlugs: string[];
  reviews: Review[];
};

export const formatBRL = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type Kind = "sleep" | "furniture";

const people: Array<[string, string, string]> = [
  ["Mariana Souza", perfilMariana, "São Paulo, SP"], ["Rafael Martins", perfilRafael, "Campinas, SP"], ["Patrícia Lima", perfilPatricia, "Belo Horizonte, MG"],
  ["Carlos Ribeiro", perfilCarlos, "Curitiba, PR"], ["Renata Alves", perfilRenata, "Salvador, BA"], ["Juliana Costa", perfilJuliana, "Recife, PE"],
  ["Thiago Fernandes", perfilThiago, "Porto Alegre, RS"], ["Aline Pereira", perfilAline, "Goiânia, GO"], ["Bruno Oliveira", perfilBruno, "Fortaleza, CE"],
  ["Camila Rocha", perfilCamila, "Rio de Janeiro, RJ"], ["Diego Santos", perfilDiego, "Manaus, AM"], ["Fernanda Gomes", perfilFernanda, "Florianópolis, SC"],
  ["Lucas Almeida", perfilLucas, "Ribeirão Preto, SP"], ["Vanessa Duarte", perfilVanessa, "Natal, RN"], ["Marcos Vinícius", perfilMarcos, "Belém, PA"],
  ["Débora Nunes", perfilDebora, "Uberlândia, MG"], ["Gustavo Henrique", perfilGustavo, "Sorocaba, SP"], ["Sandra Melo", perfilSandra, "Vitória, ES"],
];

const sleepTexts: Array<[number, string, string, boolean]> = [
  [5, "Durmo muito melhor agora", "Comprei porque acordava com dor nas costas. Na primeira semana estranhei um pouco por ser mais firme, mas agora acordo bem disposta. Chegou embalado a vácuo e em umas 6 horas já estava no formato certo.", true],
  [5, "Chegou antes do prazo", "Previsão era quinta e chegou na terça. Entregador subiu até o 3º andar sem reclamar. Veio bem protegido no plástico, sem nenhuma sujeira.", true],
  [4, "Bom, mas tem cheiro no começo", "O produto é bom e confortável. Só tirei uma estrela porque teve cheiro de novo por uns 2 dias, deixei com a janela aberta e passou.", false],
  [5, "Melhor custo-benefício", "Pesquisei em várias lojas e aqui estava com o melhor preço. Pela qualidade achei que ia ser bem mais simples, me surpreendeu.", true],
  [5, "Igual ao anúncio", "Medidas certinhas, o lençol de elástico serviu perfeito. Tecido bonito e as costuras bem feitas.", true],
  [4, "Atendeu bem", "Estou usando há um mês. Não afunda no meio e meu marido se mexe muito à noite e eu quase não sinto. Recomendo.", false],
  [5, "Comprei o segundo", "Gostei tanto que comprei outro para o quarto das crianças. Já é a segunda compra com essa loja e não tive problema nenhum.", true],
  [3, "Mais firme do que eu esperava", "Não é ruim, mas para mim ficou duro demais. Quem gosta de colchão firme vai amar. Para quem prefere macio, coloquem um pillow top.", false],
  [5, "Vale cada centavo", "Pelo valor que paguei na promoção não tem do que reclamar. Montagem da base foi fácil, só encaixar os pés.", true],
  [5, "Meu pai adorou", "Comprei para meu pai de 70 anos e ele falou que nunca dormiu tão bem. A altura ficou ótima para ele sentar e levantar.", false],
  [4, "Transportadora atrasou um dia", "Atrasou um dia mas avisaram pelo app. O produto em si é ótimo, sem defeitos, bem acabado.", true],
  [5, "Recomendo demais", "Já tem 3 meses de uso e continua igual ao primeiro dia. Não formou nenhuma marca nem afundou.", false],
  [5, "Superou as expectativas", "Tinha receio de comprar colchão pela internet sem testar, mas foi uma ótima escolha. Confortável e não esquenta à noite.", true],
];

const furnitureTexts: Array<[number, string, string, boolean]> = [
  [5, "Lindo e cabe muita coisa", "Coube todas as minhas roupas e ainda sobrou espaço. A cor é exatamente igual à foto, o acabamento é bonito.", true],
  [4, "Montagem demorada", "Levei umas 4 horas para montar sozinho. As peças vêm numeradas e o manual é claro, só precisa de paciência.", true],
  [5, "Chegou tudo certinho", "Veio em 3 caixas bem embaladas com isopor. Nenhuma peça faltando nem riscada. Paguei montador e ficou perfeito.", false],
  [5, "Ótimo pelo preço", "Para o valor que paguei está excelente. As gavetas correm bem e as portas fecham alinhadas.", true],
  [3, "Material simples", "É bonito mas o MDP é fino, precisa ter cuidado na montagem para não espanar os parafusos. Pelo preço, atende.", false],
  [5, "Transformou o quarto", "Meu quarto é pequeno e ele encaixou certinho. Ficou muito mais organizado, amei.", true],
  [4, "Bom produto", "Gostei bastante. Só achei que os puxadores poderiam ser de metal, mas não atrapalha em nada.", false],
  [5, "Compraria de novo", "Uso há dois meses, firme, sem barulho nas portas. Entrega rápida pelo Full.", true],
  [5, "Igual da foto", "Tinha medo de chegar diferente mas é igualzinho. Recomendo fixar na parede como orienta o manual.", false],
  [5, "Muito resistente", "Mais pesado e firme do que imaginei. Meu filho de 6 anos vive abrindo as gavetas e está tudo inteiro.", true],
  [4, "Faltou um parafuso", "Veio faltando um parafuso pequeno, mas tinha sobra de outros e resolvi. Fora isso perfeito.", false],
  [5, "Excelente", "Montei com meu marido em uma tarde. Ficou bonito, espaçoso e o preço estava imbatível na oferta.", true],
  [5, "Superou o que eu esperava", "As fotos não fazem jus, pessoalmente é ainda mais bonito. Vendedor respondeu rápido as dúvidas.", false],
];

const dates: string[] = ["há 2 dias", "há 5 dias", "há 1 semana", "há 10 dias", "há 2 semanas", "há 3 semanas", "há 1 mês", "há 1 mês", "há 2 meses", "há 2 meses", "há 3 meses", "há 4 meses", "há 5 meses"];

function buildReviews(seed: number, kind: Kind, photos: string[]): Review[] {
  const texts = kind === "sleep" ? sleepTexts : furnitureTexts;
  const count = 7 + ((seed * 5) % 7);
  let photoIndex = seed;
  const peopleOffset = (seed * 7) % people.length;
  return Array.from({ length: count }, (_, i) => {
    const reviewData = texts[(seed * 3 + i) % texts.length] ?? [5, "Excelente compra", "Produto entregue conforme o anúncio.", false];
    const person = people[(peopleOffset + i) % people.length] ?? ["Cliente", perfilMariana, "São Paulo, SP"];
    const [rating, title, text, withPhoto] = reviewData;
    const [author, avatar, city] = person;
    const date = dates[i] ?? "há 1 mês";
    const review = { author, avatar, city, date, rating, title, text, likes: (seed * 13 + i * 7) % 40 };
    const image = withPhoto ? photos[photoIndex++ % photos.length] : undefined;
    return image ? { ...review, image } : review;
  });
}

const sleepPhotos = [fotoCamaReal, fotoPlastico, fotoQuarto, fotoTecido, fotoBoxCinza];
const furniturePhotos = [fotoArmario, fotoQuarto, fotoTecido];

type Seed = Omit<Product, "oldPrice" | "price" | "installments" | "discount" | "reviews" | "upsellSlugs"> & { kind: Kind } & Partial<Pick<Product, "upsellSlugs">>;

const seeds: Seed[] = [
  { kind: "sleep", slug: "cama-box-queen-confort-premium", name: "Cama Box Queen + Colchão Molas Ensacadas Confort Premium", category: "Colchões", image: colchaoQueen, gallery: [colchaoQueen], oldPriceValue: 749.9, priceValue: 229.9, rating: "4.8", reviewsCount: "1.243", sold: "+5 mil vendidos", stock: 8, description: "Conjunto queen com base bipartida e colchão de molas ensacadas que reduz a transferência de movimento. Tecido macio, tratamento antialérgico e conforto firme para uso diário.", features: [["Tamanho", "Queen 158 x 198 cm"], ["Altura total", "64 cm"], ["Suporte", "Até 120 kg por pessoa"], ["Garantia", "12 meses"]], upsellSlugs: ["cabeceira-casal-linho-bege", "comoda-5-gavetas-branca"] },
  { kind: "furniture", slug: "guarda-roupa-casal-freijo-6-portas", name: "Guarda-Roupa Casal 6 Portas 6 Gavetas Freijó e Branco", category: "Guarda-roupas", image: guardaRoupa, gallery: [guardaRoupa], oldPriceValue: 699.9, priceValue: 219.9, rating: "4.7", reviewsCount: "856", sold: "+1 mil vendidos", stock: 5, description: "Guarda-roupa de casal com amplo espaço interno, cabideiros em alumínio, seis gavetas e nichos para organizar roupas e acessórios.", features: [["Largura", "240 cm"], ["Altura", "230 cm"], ["Profundidade", "47 cm"], ["Material", "MDF e MDP"]], upsellSlugs: ["comoda-5-gavetas-branca"] },
  { kind: "sleep", slug: "cama-box-solteiro-d33-cinza", name: "Cama Box Solteiro com Colchão Espuma D33 Cinza", category: "Camas box", image: camaSolteiro, gallery: [camaSolteiro], oldPriceValue: 549.9, priceValue: 179.9, rating: "4.9", reviewsCount: "538", sold: "+2 mil vendidos", stock: 12, description: "Cama box solteiro com colchão de espuma D33, indicada para quem prefere sustentação firme. Base reforçada e revestimento cinza fácil de combinar.", features: [["Tamanho", "88 x 188 cm"], ["Altura total", "56 cm"], ["Suporte", "Até 110 kg"], ["Densidade", "D33"]], upsellSlugs: ["comoda-5-gavetas-branca"] },
  { kind: "sleep", slug: "colchao-casal-espuma-d33", name: "Colchão Casal Espuma D33 Ortopédico 138 x 188 cm", category: "Colchões", image: colchaoCasal, gallery: [colchaoCasal], oldPriceValue: 589.9, priceValue: 169.9, rating: "4.7", reviewsCount: "2.104", sold: "+10 mil vendidos", stock: 19, description: "Colchão de casal firme com espuma certificada D33 e revestimento respirável. Uma opção econômica para uso diário, com tratamento antiácaro e antialérgico.", features: [["Tamanho", "Casal 138 x 188 cm"], ["Altura", "18 cm"], ["Suporte", "Até 100 kg por pessoa"], ["Conforto", "Firme"]], upsellSlugs: ["cabeceira-casal-linho-bege"] },
  { kind: "furniture", slug: "guarda-roupa-solteiro-branco-4-portas", name: "Guarda-Roupa Solteiro 4 Portas 2 Gavetas Branco", category: "Guarda-roupas", image: guardaRoupaBranco, gallery: [guardaRoupaBranco, fotoArmario], oldPriceValue: 499.9, priceValue: 149.9, rating: "4.6", reviewsCount: "692", sold: "+1 mil vendidos", stock: 7, description: "Modelo compacto para quartos menores, com quatro portas, duas gavetas e divisão interna prática. Acabamento branco fosco e puxadores resistentes.", features: [["Largura", "160 cm"], ["Altura", "200 cm"], ["Profundidade", "46 cm"], ["Material", "MDP"]] },
  { kind: "sleep", slug: "cama-box-bau-casal-cinza", name: "Cama Box Baú Casal Cinza + Colchão de Molas", category: "Camas box", image: camaBoxBau, gallery: [camaBoxBau, fotoBoxCinza, fotoQuarto], oldPriceValue: 769.9, priceValue: 229.9, rating: "4.8", reviewsCount: "967", sold: "+5 mil vendidos", stock: 6, description: "Conjunto casal com baú de grande capacidade e abertura assistida por pistões. Colchão de molas com conforto intermediário e revestimento cinza resistente.", features: [["Tamanho", "Casal 138 x 188 cm"], ["Baú", "Profundidade de 27 cm"], ["Suporte", "Até 110 kg por pessoa"], ["Abertura", "Pistões a gás"]] },
  { kind: "sleep", slug: "colchao-solteiro-d20-conforto", name: "Colchão Solteiro Espuma D20 Conforto 78 x 188 cm", category: "Colchões", image: colchaoSolteiro, gallery: [colchaoSolteiro, fotoPlastico], oldPriceValue: 459.9, priceValue: 149.9, rating: "4.6", reviewsCount: "418", sold: "+1 mil vendidos", stock: 24, description: "Colchão solteiro leve e confortável, feito com espuma D20 certificada e tecido respirável. Ideal para crianças, adolescentes e quartos de hóspedes.", features: [["Tamanho", "Solteiro 78 x 188 cm"], ["Altura", "14 cm"], ["Suporte", "Até 70 kg"], ["Conforto", "Macio"]] },
  { kind: "sleep", slug: "base-box-solteiro-preta", name: "Base Cama Box Solteiro Reforçada Suede Preta", category: "Camas box", image: basePreta, gallery: [basePreta, fotoQuarto], oldPriceValue: 599.9, priceValue: 189.9, rating: "4.8", reviewsCount: "734", sold: "+2 mil vendidos", stock: 16, description: "Base box solteiro com estrutura de madeira reforçada, revestimento em suede e pés de fácil instalação. Compatível com colchões de 88 x 188 cm.", features: [["Tamanho", "88 x 188 cm"], ["Altura com pés", "39 cm"], ["Suporte", "Até 120 kg"], ["Revestimento", "Suede preto"]] },
  { kind: "furniture", slug: "guarda-roupa-infantil-3-portas", name: "Guarda-Roupa Infantil 3 Portas 2 Gavetas Branco e Rosa", category: "Guarda-roupas", image: guardaRoupaInfantil, gallery: [guardaRoupaInfantil, fotoArmario], oldPriceValue: 649.9, priceValue: 209.9, rating: "4.7", reviewsCount: "326", sold: "+500 vendidos", stock: 9, description: "Guarda-roupa infantil compacto com três portas, duas gavetas e cabideiro interno. Acabamento branco fosco com puxadores rosa.", features: [["Largura", "120 cm"], ["Altura", "180 cm"], ["Profundidade", "42 cm"], ["Material", "MDP"]] },
  { kind: "sleep", slug: "colchao-casal-d28-antialergico", name: "Colchão Casal Espuma D28 Antialérgico 138 x 188 cm", category: "Colchões", image: colchaoD28, gallery: [colchaoD28, fotoTecido, fotoQuarto], oldPriceValue: 719.9, priceValue: 229.9, rating: "4.9", reviewsCount: "1.087", sold: "+5 mil vendidos", stock: 11, description: "Colchão casal com espuma D28 certificada, tratamento antialérgico e revestimento macio. Oferece sustentação equilibrada para noites mais confortáveis.", features: [["Tamanho", "Casal 138 x 188 cm"], ["Altura", "17 cm"], ["Suporte", "Até 90 kg por pessoa"], ["Conforto", "Intermediário"]] },
  { kind: "furniture", slug: "guarda-roupa-porta-espelho-2-portas", name: "Guarda-Roupa 2 Portas de Correr com Espelho Branco", category: "Guarda-roupas", image: guardaRoupaEspelho, gallery: [guardaRoupaEspelho, fotoArmario], oldPriceValue: 729.9, priceValue: 219.9, rating: "4.8", reviewsCount: "611", sold: "+1 mil vendidos", stock: 4, description: "Guarda-roupa com portas de correr que economizam espaço e espelho de corpo inteiro. Cabideiro, prateleiras e trilhos de alumínio.", features: [["Largura", "150 cm"], ["Altura", "210 cm"], ["Portas", "2 de correr, 1 com espelho"], ["Material", "MDP"]] },
  { kind: "furniture", slug: "cabeceira-casal-linho-bege", name: "Cabeceira Casal Estofada Linho Bege 140 cm", category: "Cômodas e cabeceiras", image: cabeceira, gallery: [cabeceira, fotoQuarto], oldPriceValue: 529.9, priceValue: 159.9, rating: "4.7", reviewsCount: "289", sold: "+500 vendidos", stock: 14, description: "Cabeceira estofada em linho com gomos verticais. Fixação na cama box ou na parede, acompanha kit de instalação.", features: [["Largura", "140 cm"], ["Altura", "120 cm"], ["Tecido", "Linho bege"], ["Instalação", "Box ou parede"]] },
  { kind: "furniture", slug: "comoda-5-gavetas-branca", name: "Cômoda 5 Gavetas Branca Multiuso", category: "Cômodas e cabeceiras", image: comoda, gallery: [comoda, fotoArmario], oldPriceValue: 489.9, priceValue: 154.9, rating: "4.6", reviewsCount: "502", sold: "+1 mil vendidos", stock: 18, description: "Cômoda com cinco gavetas amplas e corrediças metálicas. Ótima para quarto de casal, infantil ou escritório.", features: [["Largura", "80 cm"], ["Altura", "105 cm"], ["Profundidade", "40 cm"], ["Gavetas", "5 com corrediça metálica"]] },
  { kind: "sleep", slug: "cama-box-casal-courino-marrom", name: "Cama Box Casal Courino Marrom + Colchão Espuma D33", category: "Camas box", image: camaMarrom, gallery: [camaMarrom, fotoQuarto, fotoTecido], oldPriceValue: 689.9, priceValue: 199.9, rating: "4.8", reviewsCount: "774", sold: "+2 mil vendidos", stock: 10, description: "Conjunto casal com base em courino marrom fácil de limpar, cabeceira integrada e colchão de espuma D33 firme.", features: [["Tamanho", "Casal 138 x 188 cm"], ["Altura total", "60 cm"], ["Suporte", "Até 100 kg por pessoa"], ["Revestimento", "Courino"]] },
];

const allProducts: Product[] = seeds.map(({ kind, upsellSlugs, ...seed }, index) => {
  const suggestedSlugs = upsellSlugs ?? (
    seed.slug === "comoda-5-gavetas-branca" ? []
      : seed.slug === "cabeceira-casal-linho-bege" ? ["comoda-5-gavetas-branca"]
        : seed.slug === "base-box-solteiro-preta" ? ["colchao-solteiro-d20-conforto"]
          : kind === "furniture" ? ["comoda-5-gavetas-branca"]
            : seed.slug.includes("solteiro") ? ["base-box-solteiro-preta"]
              : ["cabeceira-casal-linho-bege", "comoda-5-gavetas-branca"]
  );

  return {
    ...seed,
    gallery: [seed.image],
    upsellSlugs: suggestedSlugs,
    oldPrice: formatBRL(seed.oldPriceValue),
    price: formatBRL(seed.priceValue),
    installments: `10x ${formatBRL(seed.priceValue / 10)} sem juros`,
    discount: `${Math.round((1 - seed.priceValue / seed.oldPriceValue) * 100)}% OFF`,
    reviews: buildReviews(index + 1, kind, kind === "sleep" ? sleepPhotos : furniturePhotos),
  };
});

export const products = allProducts.filter((product) => product.slug !== "comoda-5-gavetas-branca");

export const getProduct = (slug: string) => allProducts.find((product) => product.slug === slug);

export const getUpsells = (product: Product) => product.upsellSlugs
  .map((slug) => allProducts.find((item) => item.slug === slug))
  .filter((item): item is Product => Boolean(item));
