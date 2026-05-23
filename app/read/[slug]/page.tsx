import { notFound } from "next/navigation";

import { ReaderShell } from "@/components/reader/reader-shell";
import { books, getBook } from "@/lib/books";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export default async function ReadPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBook(slug);

  if (!book) {
    notFound();
  }

  return <ReaderShell book={book} />;
}
