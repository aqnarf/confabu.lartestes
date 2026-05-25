"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FlipHorizontal2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { BookAsset } from "@/lib/catalog/types";

type BookCoverPreviewModalProps = {
  title: string;
  frontCover: BookAsset;
  backCover?: BookAsset;
};

export function BookCoverPreviewModal({ title, frontCover, backCover }: BookCoverPreviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowingBack, setIsShowingBack] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        setIsShowingBack((current) => !current);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function openPreview() {
    setIsShowingBack(false);
    setIsOpen(true);
  }

  function rotateBook() {
    setIsShowingBack((current) => !current);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const startX = dragStartX.current;
    dragStartX.current = null;

    if (startX !== null && Math.abs(event.clientX - startX) >= 48) {
      rotateBook();
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openPreview}
        className="rounded-full border-2 border-[#c8b2f2] px-4 py-2 text-sm font-semibold leading-5 text-[#171026] transition-colors hover:bg-[#c8b2f2]"
        aria-label={`Ver capa e verso de ${title}`}
      >
        Ver detalhes da capa
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#171026]/65 p-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cover-preview-title"
            className="flex max-h-[calc(100vh-48px)] w-full max-w-[920px] flex-col overflow-hidden rounded-lg bg-background shadow-2xl"
          >
            <header className="flex items-center justify-between gap-4 border-b border-[#e4e4e7] px-6 py-4">
              <div className="min-w-0">
                <p className="text-xs text-[#52525b]">Visualização da obra</p>
                <h2 id="cover-preview-title" className="truncate text-lg font-semibold text-[#18181b]">
                  {title}
                </h2>
              </div>
              <Button
                ref={closeButtonRef}
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 rounded-full"
                aria-label="Fechar visualização da capa"
                onClick={() => setIsOpen(false)}
              >
                <X />
              </Button>
            </header>

            <div className="flex min-h-0 flex-1 flex-col items-center gap-5 overflow-auto bg-[#f4f4f5] p-6">
              <span className="rounded-full bg-[#c8b2f2] px-3 py-1 text-sm font-semibold text-[#171026]">
                {isShowingBack ? "Verso" : "Capa"}
              </span>

              <div
                className="relative h-[min(66vh,650px)] w-full max-w-[520px] cursor-grab select-none active:cursor-grabbing"
                style={{ perspective: "1300px", touchAction: "pan-y" }}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerCancel={() => {
                  dragStartX.current = null;
                }}
              >
                <div
                  className="relative size-full transition-transform duration-700 ease-in-out"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isShowingBack ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Image
                      src={frontCover.url}
                      alt={frontCover.altText ?? `Capa de ${title}`}
                      fill
                      className="object-contain drop-shadow-[0_14px_24px_rgba(23,16,38,0.18)]"
                      sizes="520px"
                    />
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    {backCover ? (
                      <Image
                        src={backCover.url}
                        alt={backCover.altText ?? `Verso de ${title}`}
                        fill
                        className="object-contain drop-shadow-[0_14px_24px_rgba(23,16,38,0.18)]"
                        sizes="520px"
                      />
                    ) : (
                      <div className="flex aspect-[3/4] h-full max-h-[560px] max-w-full flex-col items-center justify-center gap-3 bg-[#35130f] px-10 text-center text-white shadow-lg">
                        <span className="text-sm font-semibold">confabu.lar</span>
                        <p className="text-lg font-semibold">Verso a cadastrar</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={rotateBook}
                className="rounded-full px-5 text-[#171026] hover:bg-[#c8b2f2]"
              >
                <FlipHorizontal2 />
                Girar livro
              </Button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
