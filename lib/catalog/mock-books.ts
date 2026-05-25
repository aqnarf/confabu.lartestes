import type { BookRecord, ReaderPage } from "@/lib/catalog/types";
import previewBooksData from "@/lib/catalog/preview-books.json";

const previewBooks = previewBooksData as BookRecord[];

const demoPages: ReaderPage[] = [
  {
    id: "page-1",
    order: 1,
    image: {
      id: "asset-page-1",
      kind: "reader-page",
      url: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80",
      altText: "Livro aberto sobre uma mesa com luz suave.",
      mimeType: "image/jpeg",
    },
    transcript: "Era uma vez uma pergunta que acordou antes de todo mundo.",
  },
  {
    id: "page-2",
    order: 2,
    image: {
      id: "asset-page-2",
      kind: "reader-page",
      url: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=900&q=80",
      altText: "Caminho entre árvores com luz de manhã.",
      mimeType: "image/jpeg",
    },
    transcript: "Ela atravessou caminhos, ouviu o vento e colecionou pequenas ideias.",
  },
  {
    id: "page-3",
    order: 3,
    image: {
      id: "asset-page-3",
      kind: "reader-page",
      url: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=900&q=80",
      altText: "Crianca lendo em um canto tranquilo.",
      mimeType: "image/jpeg",
    },
    transcript: "Quando encontrou uma leitora, virou história e ganhou voz.",
  },
];

const jardimPageImages = [
  {
    url: "/assets/figma/home-hero-image.png",
    altText: "Galho ilustrado sob um céu azul com uma joaninha.",
    mimeType: "image/png",
  },
  {
    url: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1400&q=80",
    altText: "Caminho entre árvores com luz de manhã.",
    mimeType: "image/jpeg",
  },
  {
    url: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1400&q=80",
    altText: "Livro aberto sobre uma mesa com luz suave.",
    mimeType: "image/jpeg",
  },
  {
    url: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=1400&q=80",
    altText: "Criança lendo em um canto tranquilo.",
    mimeType: "image/jpeg",
  },
] as const;

const jardimPages: ReaderPage[] = [
  "Era uma vez uma pergunta que acordou antes de todo mundo.",
  "Ela morava num quintal pequeno, bem debaixo da janela.",
  "Naquela manhã, o vento trouxe uma semente redonda e luminosa.",
  "A menina plantou a semente sem saber qual resposta nasceria.",
  "No dia seguinte, havia uma folha em forma de ponto de interrogação.",
  "A primeira flor perguntou por que as joaninhas usam pintinhas.",
  "A segunda quis saber onde a chuva descansa quando o céu fica azul.",
  "Logo o quintal estava cheio de perguntas coloridas.",
  "Algumas eram grandes e alcançavam os galhos mais altos.",
  "Outras falavam baixinho e cabiam no bolso do vestido.",
  "A menina aprendeu que nem toda pergunta precisa florescer depressa.",
  "Ela regava as dúvidas com histórias, risadas e silêncio.",
  "Um passarinho levou uma pergunta para além do muro.",
  "Do outro lado, outra criança encontrou a flor e sorriu.",
  "Assim, o jardim cresceu sem cerca e sem fim.",
  "E toda manhã havia lugar para uma nova pergunta.",
].map((transcript, index) => {
  const image = jardimPageImages[index % jardimPageImages.length];
  const pageNumber = index + 1;

  return {
    id: `jardim-page-${pageNumber}`,
    order: pageNumber,
    image: {
      id: `asset-jardim-page-${pageNumber}`,
      kind: "reader-page",
      url: image.url,
      altText: image.altText,
      mimeType: image.mimeType,
    },
    transcript,
  };
});

const publishedAt = "2026-05-23T00:00:00.000Z";

export const mockBooks: BookRecord[] = [
  ...previewBooks,
  {
    id: "book-jardim-das-perguntas",
    slug: "jardim-das-perguntas",
    status: "published",
    title: "O Jardim das Perguntas",
    description:
      "Uma narrativa ilustrada sobre curiosidade, escuta e as pequenas descobertas que nascem quando a infância pergunta sem pressa.",
    language: "pt-BR",
    ageRange: "6 a 9 anos",
    categories: ["Conto ilustrado"],
    tags: ["curiosidade", "natureza", "leitura compartilhada"],
    contributors: [
      { id: "contributor-marina-vale", name: "Marina Vale", role: "author" },
      { id: "contributor-lia-costa", name: "Lia Costa", role: "illustrator" },
    ],
    assets: {
      cover: {
        id: "asset-cover-jardim",
        kind: "cover",
        url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=720&q=80",
        altText: "Capa de O Jardim das Perguntas.",
        mimeType: "image/jpeg",
      },
      pdf: {
        id: "asset-pdf-jardim",
        kind: "pdf",
        url: "/samples/jardim-das-perguntas.pdf",
        mimeType: "application/pdf",
      },
    },
    readerPages: jardimPages,
    rights: {
      licenseLabel: "Uso educacional mediante aceite dos termos",
      allowDownload: true,
      requireTermsAcceptance: true,
    },
    createdAt: publishedAt,
    updatedAt: publishedAt,
    publishedAt,
  },
  {
    id: "book-mapa-do-quintal",
    slug: "mapa-do-quintal",
    status: "published",
    title: "Mapa do Quintal",
    description:
      "Um passeio visual por cantos conhecidos que se transformam em ilhas, rios e constelacoes no olhar de quem brinca.",
    language: "pt-BR",
    ageRange: "4 a 8 anos",
    categories: ["Poesia visual"],
    tags: ["brincadeira", "território", "imaginação"],
    contributors: [
      { id: "contributor-rafa-mota", name: "Rafa Mota", role: "author" },
      { id: "contributor-nina-alves", name: "Nina Alves", role: "illustrator" },
    ],
    assets: {
      cover: {
        id: "asset-cover-mapa",
        kind: "cover",
        url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=720&q=80",
        altText: "Capa de Mapa do Quintal.",
        mimeType: "image/jpeg",
      },
      pdf: {
        id: "asset-pdf-mapa",
        kind: "pdf",
        url: "/samples/mapa-do-quintal.pdf",
        mimeType: "application/pdf",
      },
    },
    readerPages: demoPages,
    rights: {
      licenseLabel: "Uso educacional mediante aceite dos termos",
      allowDownload: true,
      requireTermsAcceptance: true,
    },
    createdAt: publishedAt,
    updatedAt: publishedAt,
    publishedAt,
  },
  {
    id: "book-receita-de-nuvem",
    slug: "receita-de-nuvem",
    status: "published",
    title: "Receita de Nuvem",
    description:
      "Um livro breve e lúdico para imaginar matérias impossíveis, com páginas pensadas para leitura compartilhada.",
    language: "pt-BR",
    ageRange: "3 a 6 anos",
    categories: ["Livro-imagem"],
    tags: ["primeira infância", "imaginação", "livro-imagem"],
    contributors: [
      { id: "contributor-bia-santiago", name: "Bia Santiago", role: "author" },
      { id: "contributor-tom-correa", name: "Tom Correa", role: "illustrator" },
    ],
    assets: {
      cover: {
        id: "asset-cover-receita",
        kind: "cover",
        url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=720&q=80",
        altText: "Capa de Receita de Nuvem.",
        mimeType: "image/jpeg",
      },
      pdf: {
        id: "asset-pdf-receita",
        kind: "pdf",
        url: "/samples/receita-de-nuvem.pdf",
        mimeType: "application/pdf",
      },
    },
    readerPages: demoPages,
    rights: {
      licenseLabel: "Uso educacional mediante aceite dos termos",
      allowDownload: true,
      requireTermsAcceptance: true,
    },
    createdAt: publishedAt,
    updatedAt: publishedAt,
    publishedAt,
  },
];
