import Image from "next/image";
import Link from "next/link";
import { BookOpen, ScrollText } from "lucide-react";

import type { Book } from "@/lib/books";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function BookCard({ book }: { book: Book }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/5] bg-muted">
        <Image src={book.coverUrl} alt={`Capa de ${book.title}`} fill className="object-cover" sizes="(min-width: 1024px) 280px, 90vw" />
      </div>
      <CardContent className="space-y-4 p-4">
        <div className="space-y-2">
          <Badge variant="secondary">{book.category}</Badge>
          <div>
            <h2 className="text-lg font-semibold leading-tight tracking-normal">{book.title}</h2>
            <p className="text-sm text-muted-foreground">{book.author}</p>
          </div>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{book.description}</p>
        <div className="grid grid-cols-2 gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/books/${book.slug}`}>
              <ScrollText className="size-4" />
              Detalhes
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`/read/${book.slug}`}>
              <BookOpen className="size-4" />
              Ler
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
