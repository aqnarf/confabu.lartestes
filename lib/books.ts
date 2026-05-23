export type ReaderPage = {
  id: string;
  imageUrl: string;
  alt: string;
  text: string;
};

export type Book = {
  slug: string;
  title: string;
  author: string;
  illustrator: string;
  description: string;
  category: string;
  ageRange: string;
  coverUrl: string;
  pdfUrl: string;
  pages: ReaderPage[];
};

const demoPages = [
  {
    id: "page-1",
    imageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80",
    alt: "Livro aberto sobre uma mesa com luz suave.",
    text: "Era uma vez uma pergunta que acordou antes de todo mundo.",
  },
  {
    id: "page-2",
    imageUrl: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=900&q=80",
    alt: "Caminho entre arvores com luz de manha.",
    text: "Ela atravessou caminhos, ouviu o vento e colecionou pequenas ideias.",
  },
  {
    id: "page-3",
    imageUrl: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=900&q=80",
    alt: "Crianca lendo em um canto tranquilo.",
    text: "Quando encontrou uma leitora, virou historia e ganhou voz.",
  },
];

export const books: Book[] = [
  {
    slug: "jardim-das-perguntas",
    title: "O Jardim das Perguntas",
    author: "Marina Vale",
    illustrator: "Lia Costa",
    description:
      "Uma narrativa ilustrada sobre curiosidade, escuta e as pequenas descobertas que nascem quando a infancia pergunta sem pressa.",
    category: "Conto ilustrado",
    ageRange: "6 a 9 anos",
    coverUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=720&q=80",
    pdfUrl: "/samples/jardim-das-perguntas.pdf",
    pages: demoPages,
  },
  {
    slug: "mapa-do-quintal",
    title: "Mapa do Quintal",
    author: "Rafa Mota",
    illustrator: "Nina Alves",
    description:
      "Um passeio visual por cantos conhecidos que se transformam em ilhas, rios e constelacoes no olhar de quem brinca.",
    category: "Poesia visual",
    ageRange: "4 a 8 anos",
    coverUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=720&q=80",
    pdfUrl: "/samples/mapa-do-quintal.pdf",
    pages: demoPages,
  },
  {
    slug: "receita-de-nuvem",
    title: "Receita de Nuvem",
    author: "Bia Santiago",
    illustrator: "Tom Correa",
    description:
      "Um livro breve e ludico para imaginar materias impossiveis, com paginas pensadas para leitura compartilhada.",
    category: "Livro-imagem",
    ageRange: "3 a 6 anos",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=720&q=80",
    pdfUrl: "/samples/receita-de-nuvem.pdf",
    pages: demoPages,
  },
];

export function getBook(slug: string) {
  return books.find((book) => book.slug === slug);
}
