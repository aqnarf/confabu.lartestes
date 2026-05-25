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
    <div className="space-y-6">
      <section className="space-y-2 bg-[#f4f4f5] p-6 text-[#52525b]" aria-label="Uso da obra">
        <h2 className="text-base font-semibold leading-6 text-[#3f3f46]">Uso da obra</h2>
        <p className="text-sm leading-5">
          Leitura online livre. Download permitido para uso educacional, pessoal e não comercial, conforme os termos de uso e
          direitos autorais.
        </p>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-[#312e81] underline">
          <Link href="/termos">Termos de Uso</Link>
          <Link href="/aviso-legal">Direitos autorais</Link>
        </div>
        {book.rights.requireTermsAcceptance ? (
          <label className="mt-4 flex gap-3 border-t border-[#d4d4d8] pt-4 text-sm leading-5">
            <input
              type="checkbox"
              className="mt-0.5 size-4 accent-[#c8b2f2]"
              checked={accepted}
              onChange={(event) => handleAcceptanceChange(event.target.checked)}
            />
            <span>
              {legalAcceptanceText} <LegalLinks className="[&_a]:text-[#312e81]" />
            </span>
          </label>
        ) : null}
      </section>

      <section className="space-y-4" aria-label="Disponibilidade">
        <p className="text-sm leading-5 text-[#3f3f46]">Disponibilidade</p>
        <div className="flex flex-wrap gap-2">
          <Button
            asChild
            aria-disabled={!canReadOrDownload}
            className="h-10 rounded-full bg-[#c8b2f2] px-4 text-base font-semibold text-[#171026] hover:bg-[#b89be9]"
          >
            <Link
              href={`/read/${book.slug}`}
              className={!canReadOrDownload ? "pointer-events-none opacity-50" : undefined}
            >
              Ler online
              <BookOpen className="size-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            aria-disabled={!canReadOrDownload || !book.rights.allowDownload}
            className="h-10 rounded-full border-2 border-[#c8b2f2] px-4 text-base font-semibold text-[#171026] hover:bg-[#c8b2f2]"
          >
            <a
              href={book.assets.pdf.url}
              download
              className={!canReadOrDownload || !book.rights.allowDownload ? "pointer-events-none opacity-50" : undefined}
            >
              Baixar livro
              <Download className="size-5" />
            </a>
          </Button>
        </div>
        <p className="text-xs leading-[18px] text-[#52525b]">
          Leitura online livre. Download permitido para uso educacional, pessoal e não comercial, conforme os termos de uso e
          direitos autorais.
        </p>
      </section>
    </div>
  );
}

export function getAcceptanceKey(slug: string) {
  return `confabulab:legal-acceptance:${slug}`;
}
