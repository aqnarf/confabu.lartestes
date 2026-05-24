"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BookOpen, Download } from "lucide-react";

import { LegalLinks } from "@/components/legal/legal-links";
import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/books";
import { legalAcceptanceText } from "@/lib/legal/content";

export function BookLegalActions({ book }: { book: Book }) {
  const [accepted, setAccepted] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(getAcceptanceKey(book.slug)) === "accepted";
  });

  const canReadOrDownload = useMemo(() => !book.rights.requireTermsAcceptance || accepted, [accepted, book.rights.requireTermsAcceptance]);

  function handleAcceptanceChange(isAccepted: boolean) {
    setAccepted(isAccepted);

    if (isAccepted) {
      window.localStorage.setItem(getAcceptanceKey(book.slug), "accepted");
      return;
    }

    window.localStorage.removeItem(getAcceptanceKey(book.slug));
  }

  return (
    <div className="space-y-4">
      {book.rights.requireTermsAcceptance ? (
        <label className="flex gap-3 rounded-lg border bg-card p-4 text-sm leading-6">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-primary"
            checked={accepted}
            onChange={(event) => handleAcceptanceChange(event.target.checked)}
          />
          <span>
            {legalAcceptanceText} <LegalLinks />
          </span>
        </label>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg" aria-disabled={!canReadOrDownload} className={!canReadOrDownload ? "pointer-events-none opacity-50" : undefined}>
          <Link href={`/read/${book.slug}`}>
            <BookOpen className="size-4" />
            Abrir leitor
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          aria-disabled={!canReadOrDownload || !book.rights.allowDownload}
          className={!canReadOrDownload || !book.rights.allowDownload ? "pointer-events-none opacity-50" : undefined}
        >
          <a href={book.assets.pdf.url} download>
            <Download className="size-4" />
            Baixar PDF
          </a>
        </Button>
      </div>
    </div>
  );
}

export function getAcceptanceKey(slug: string) {
  return `confabulab:legal-acceptance:${slug}`;
}
