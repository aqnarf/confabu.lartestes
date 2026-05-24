import { notFound } from "next/navigation";

import { ReaderShell } from "@/components/reader/reader-shell";
import { getPublishedBookBySlug, listBookSlugs } from "@/lib/books";

export function generateStaticParams() {
  return listBookSlugs();
}

export default async function ReadPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = await getPublishedBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return <ReaderShell book={book} />;
}
