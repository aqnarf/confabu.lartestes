import { notFound } from "next/navigation";

import { ReaderLegalGate } from "@/components/legal/reader-legal-gate";
import { ReaderShell } from "@/components/reader/reader-shell";
import { getPublishedBookBySlug, listBookSlugs } from "@/lib/books";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return listBookSlugs();
}

export default async function ReadPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = await getPublishedBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return (
    <ReaderLegalGate book={book}>
      <ReaderShell book={book} />
    </ReaderLegalGate>
  );
}
