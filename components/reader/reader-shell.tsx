"use client";

import { useState } from "react";
import { BookOpen, Rows3 } from "lucide-react";

import { AccessibleScrollReader } from "@/components/reader/accessible-scroll-reader";
import { PageFlipReader } from "@/components/reader/page-flip-reader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Book } from "@/lib/books";

export function ReaderShell({ book }: { book: Book }) {
  const [accessibleMode, setAccessibleMode] = useState(false);

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="border-b bg-card">
        <div className="container flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Leitor online</p>
            <h1 className="text-2xl font-semibold tracking-normal">{book.title}</h1>
          </div>
          <div className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2">
            <BookOpen className="size-4 text-muted-foreground" aria-hidden="true" />
            <Switch id="reader-mode" checked={accessibleMode} onCheckedChange={setAccessibleMode} />
            <Label htmlFor="reader-mode" className="flex items-center gap-2">
              <Rows3 className="size-4" />
              Rolagem acessível
            </Label>
          </div>
        </div>
      </div>

      <div className="container">
        {accessibleMode ? <AccessibleScrollReader pages={book.readerPages} /> : <PageFlipReader pages={book.readerPages} />}
        <div className="mx-auto flex max-w-3xl justify-center pb-10">
          <Button asChild variant="outline">
            <a href={book.assets.pdf.url}>Abrir PDF original</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
