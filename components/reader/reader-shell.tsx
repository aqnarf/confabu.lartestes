"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { AccessibleScrollReader } from "@/components/reader/accessible-scroll-reader";
import { PageFlipReader } from "@/components/reader/page-flip-reader";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Book } from "@/lib/books";

export function ReaderShell({ book }: { book: Book }) {
  const [accessibleMode, setAccessibleMode] = useState(false);
  const additionalInfo = book.categories[0] ?? "Leitura online";

  return (
    <section className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-[#d4d4d8] bg-background px-4 py-4 lg:px-16">
        <div className="flex items-center justify-between gap-6">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              href={`/books/${book.slug}`}
              aria-label="Voltar para a página da obra"
              className="flex size-10 shrink-0 items-center justify-center rounded-full text-[#3f3f46] transition-colors hover:bg-[#f4f4f5]"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <div className="min-w-0 text-[#3f3f46]">
              <h1 className="truncate text-base font-semibold leading-6">{book.title}</h1>
              <p className="truncate text-xs leading-[18px]">{additionalInfo}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Switch
              id="reader-mode"
              checked={accessibleMode}
              onCheckedChange={setAccessibleMode}
              className="h-5 w-9 bg-[#f4f4f5] data-[state=checked]:bg-[#c8b2f2] [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-4"
            />
            <Label htmlFor="reader-mode" className="cursor-pointer text-xs font-normal leading-[18px] text-[#3f3f46]">
              Rolagem acessível
            </Label>
          </div>
        </div>
      </header>

      {accessibleMode ? (
        <AccessibleScrollReader pages={book.readerPages} />
      ) : (
        <PageFlipReader pages={book.readerPages} />
      )}
    </section>
  );
}
