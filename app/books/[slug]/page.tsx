import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Download, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { books, getBook } from "@/lib/books";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBook(slug);

  if (!book) {
    notFound();
  }

  return (
    <main className="container grid gap-8 py-10 lg:grid-cols-[360px_1fr]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border bg-muted shadow-sm">
        <Image src={book.coverUrl} alt={`Capa de ${book.title}`} fill className="object-cover" priority sizes="360px" />
      </div>

      <section className="space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary">{book.category}</Badge>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-normal">{book.title}</h1>
            <p className="text-lg text-muted-foreground">
              {book.author} · ilustracoes de {book.illustrator}
            </p>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground">{book.description}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={`/read/${book.slug}`}>
              <BookOpen className="size-4" />
              Abrir leitor
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={book.pdfUrl}>
              <Download className="size-4" />
              Baixar PDF
            </a>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="size-5 text-primary" />
              Informacoes editoriais
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm sm:grid-cols-3">
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
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
