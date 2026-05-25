import type { BookRecord, ReaderPage } from "@/lib/catalog/types";

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

const publishedAt = "2026-05-23T00:00:00.000Z";

export const mockBooks: BookRecord[] = [
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
