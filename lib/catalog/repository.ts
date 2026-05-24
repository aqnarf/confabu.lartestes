import { mockBooks } from "@/lib/catalog/mock-books";
import type { BookRecord, ContributorRole } from "@/lib/catalog/types";

export async function listPublishedBooks(): Promise<BookRecord[]> {
  return mockBooks
    .filter((book) => book.status === "published")
    .sort((first, second) => first.title.localeCompare(second.title, "pt-BR"));
}

export async function getPublishedBookBySlug(slug: string): Promise<BookRecord | undefined> {
  return mockBooks.find((book) => book.slug === slug && book.status === "published");
}

export function listBookSlugs() {
  return mockBooks
    .filter((book) => book.status === "published")
    .map((book) => ({ slug: book.slug }));
}

export function getPrimaryCategory(book: BookRecord) {
  return book.categories[0] ?? "Sem categoria";
}

export function getContributorNames(book: BookRecord, role: ContributorRole) {
  return book.contributors
    .filter((contributor) => contributor.role === role)
    .map((contributor) => contributor.name);
}

export function getContributorLine(book: BookRecord) {
  const authors = getContributorNames(book, "author").join(", ");
  const illustrators = getContributorNames(book, "illustrator").join(", ");

  if (authors && illustrators) {
    return `${authors} - ilustracoes de ${illustrators}`;
  }

  return authors || illustrators || "Autoria em revisao";
}
