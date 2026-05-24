import Image from "next/image";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";

import { BookLegalActions } from "@/components/legal/book-legal-actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContributorLine, getPrimaryCategory, getPublishedBookBySlug, listBookSlugs } from "@/lib/books";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return listBookSlugs();
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = await getPublishedBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const category = getPrimaryCategory(book);
  const contributorLine = getContributorLine(book);

  return (
    <main className="container grid gap-8 py-10 lg:grid-cols-[360px_1fr]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border bg-muted shadow-sm">
        <Image
          src={book.assets.cover.url}
          alt={book.assets.cover.altText ?? `Capa de ${book.title}`}
          fill
          className="object-cover"
          priority
          sizes="360px"
        />
      </div>

      <section className="space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary">{category}</Badge>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-normal">{book.title}</h1>
            <p className="text-lg text-muted-foreground">{contributorLine}</p>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground">{book.description}</p>
        </div>

        <BookLegalActions book={book} />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="size-5 text-primary" />
              Informacoes editoriais
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm sm:grid-cols-4">
            <div>
              <p className="font-medium">Faixa etaria</p>
              <p className="text-muted-foreground">{book.ageRange}</p>
            </div>
            <div>
              <p className="font-medium">Formato</p>
              <p className="text-muted-foreground">PDF ilustrado</p>
            </div>
            <div>
              <p className="font-medium">Leitura</p>
              <p className="text-muted-foreground">Page flip ou rolagem</p>
            </div>
            <div>
              <p className="font-medium">Direitos</p>
              <p className="text-muted-foreground">{book.rights.licenseLabel}</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
