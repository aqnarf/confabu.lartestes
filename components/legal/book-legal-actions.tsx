"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookOpen, Download, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/books";

export function BookLegalActions({ book }: { book: Book }) {
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
      </section>

      <section className="space-y-4" aria-label="Disponibilidade">
        <p className="text-sm leading-5 text-[#3f3f46]">Disponibilidade</p>
        <div className="flex flex-wrap gap-2">
          <Button
            asChild
            className="h-10 rounded-full bg-[#c8b2f2] px-4 text-base font-semibold text-[#171026] hover:bg-[#b89be9]"
          >
            <Link href={`/read/${book.slug}`}>
              Ler online
              <BookOpen className="size-5" />
            </Link>
          </Button>
          <DownloadTermsModal book={book} />
        </div>
        <p className="text-xs leading-[18px] text-[#52525b]">
          Leitura online livre. Download permitido para uso educacional, pessoal e não comercial, conforme os termos de uso e
          direitos autorais.
        </p>
      </section>
    </div>
  );
}

function DownloadTermsModal({ book }: { book: Book }) {
  const [isOpen, setIsOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [book.slug, isOpen]);

  function confirmDownload() {
    window.localStorage.setItem(getAcceptanceKey(book.slug), "accepted");
    downloadLinkRef.current?.click();
    setIsOpen(false);
  }

  function openDownloadTerms() {
    setAccepted(false);
    setIsOpen(true);
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        disabled={!book.rights.allowDownload}
        onClick={openDownloadTerms}
        className="h-10 rounded-full border-2 border-[#c8b2f2] px-4 text-base font-semibold text-[#171026] hover:bg-[#c8b2f2]"
      >
        Baixar livro
        <Download className="size-5" />
      </Button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#171026]/55 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-terms-title"
            className="relative w-full max-w-[760px] rounded-lg bg-background p-7 shadow-2xl sm:p-8"
          >
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-5 top-5 rounded-full"
              aria-label="Fechar termos para download"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </Button>
            <p className="text-xs font-bold uppercase text-[#71717a]">Antes do download</p>
            <h2 id="download-terms-title" className="mt-4 pr-10 text-2xl font-bold leading-8 text-[#18181b]">
              Termos de Uso e Direitos Autorais
            </h2>
            <p className="mt-3 text-base leading-7 text-[#71717a]">
              Confira o resumo para baixar esta obra. O texto completo fica disponível para consulta a qualquer momento.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <TermsSummary
                title="Uso permitido"
                items={[
                  "Leitura, estudo e atividades educacionais.",
                  "Mediação de leitura em sala, biblioteca ou projeto cultural.",
                  "Arquivo mantido com créditos e autoria preservados.",
                ]}
              />
              <TermsSummary
                title="Restrições"
                items={[
                  "Não vender, republicar ou redistribuir sem autorização.",
                  "Não remover autoria, créditos, capa ou informações editoriais.",
                  "Não adaptar ou alterar a obra sem permissão.",
                ]}
              />
            </div>

            <Link href="/termos" target="_blank" className="mt-5 inline-block text-sm font-semibold text-[#18181b] underline">
              Ler texto completo
            </Link>

            <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm font-semibold leading-6 text-[#18181b]">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(event) => setAccepted(event.target.checked)}
                className="mt-1 size-4 accent-[#c8b2f2]"
              />
              <span>Li e aceito os Termos de Uso e Direitos Autorais para baixar esta obra.</span>
            </label>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <Button
                ref={cancelButtonRef}
                type="button"
                variant="ghost"
                className="h-11 rounded-full bg-[#f4f4f5] px-6 font-semibold text-[#18181b] hover:bg-[#e4e4e7]"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                disabled={!accepted}
                onClick={confirmDownload}
                className="h-11 rounded-full bg-[#c8b2f2] px-6 font-semibold text-[#171026] hover:bg-[#b89be9]"
              >
                Aceitar e baixar
              </Button>
              <a ref={downloadLinkRef} href={book.assets.pdf.url} download className="hidden" tabIndex={-1} aria-hidden="true" />
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

function TermsSummary({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-[#e4e4e7] p-4">
      <h3 className="text-sm font-semibold text-[#18181b]">{title}</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#71717a]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function getAcceptanceKey(slug: string) {
  return `confabulab:legal-acceptance:${slug}`;
}
