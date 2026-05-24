"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

import { getAcceptanceKey } from "@/components/legal/book-legal-actions";
import { LegalLinks } from "@/components/legal/legal-links";
import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/books";
import { legalAcceptanceText } from "@/lib/legal/content";

export function ReaderLegalGate({ book, children }: { book: Book; children: React.ReactNode }) {
  const [accepted, setAccepted] = useState(!book.rights.requireTermsAcceptance);

  useEffect(() => {
    if (!book.rights.requireTermsAcceptance) {
      setAccepted(true);
      return;
    }

    setAccepted(window.localStorage.getItem(getAcceptanceKey(book.slug)) === "accepted");
  }, [book.rights.requireTermsAcceptance, book.slug]);

  function acceptTerms() {
    window.localStorage.setItem(getAcceptanceKey(book.slug), "accepted");
    setAccepted(true);
  }

  if (accepted) {
    return <>{children}</>;
  }

  return (
    <main className="container grid min-h-[calc(100vh-4rem)] place-items-center py-10">
      <section className="w-full max-w-xl rounded-lg border bg-card p-6 shadow-sm">
        <span className="flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <ShieldCheck className="size-5" />
        </span>
        <div className="mt-5 space-y-3">
          <h1 className="text-2xl font-semibold tracking-normal">Antes de abrir o leitor</h1>
          <p className="leading-7 text-muted-foreground">
            Para ler <strong className="font-semibold text-foreground">{book.title}</strong>, confirme que voce leu e concorda com os documentos legais da biblioteca.
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            {legalAcceptanceText} <LegalLinks />
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={acceptTerms}>Aceitar e abrir leitor</Button>
          <Button asChild variant="outline">
            <Link href={`/books/${book.slug}`}>Voltar para a obra</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
