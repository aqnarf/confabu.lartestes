"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { ReaderPage } from "@/lib/books";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

type FlipBookHandle = {
  pageFlip(): {
    flipPrev(): void;
    flipNext(): void;
  };
};

export function PageFlipReader({ pages }: { pages: ReaderPage[] }) {
  const flipBookRef = useRef<FlipBookHandle | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 lg:px-16">
      <div className="relative flex h-[min(646px,calc(100svh-190px))] min-h-[420px] w-full items-center justify-center overflow-hidden bg-[#f4f4f5] px-6 py-5">
        <HTMLFlipBook
          ref={flipBookRef}
          width={540}
          height={540}
          size="stretch"
          minWidth={260}
          maxWidth={540}
          minHeight={260}
          maxHeight={540}
          showCover
          className="drop-shadow-[0_14px_22px_rgba(23,16,38,0.18)]"
          style={{ margin: "0 auto" }}
          startPage={0}
          drawShadow
          flippingTime={900}
          usePortrait
          startZIndex={0}
          autoSize
          maxShadowOpacity={0.48}
          mobileScrollSupport
          clickEventForward
          useMouseEvents
          swipeDistance={18}
          showPageCorners
          disableFlipByClick={false}
          renderOnlyPageLengthChange
          onFlip={(event: { data: number }) => setCurrentPage(event.data)}
        >
          {pages.map((page, index) => (
            <article key={page.id} className="relative h-full overflow-hidden bg-white">
              <Image
                src={page.image.url}
                alt={page.image.altText ?? `Página ${page.order}`}
                fill
                priority={index < 3}
                className="object-contain"
                sizes="(min-width: 1024px) 520px, 90vw"
              />
            </article>
          ))}
        </HTMLFlipBook>
      </div>

      <nav className="flex items-center gap-2" aria-label="Navegação de páginas">
        <button
          type="button"
          aria-label="Página anterior"
          onClick={() => flipBookRef.current?.pageFlip().flipPrev()}
          disabled={currentPage === 0}
          className="flex h-10 min-w-12 items-center justify-center rounded-full border-2 border-[#c8b2f2] text-[#171026] transition-colors hover:bg-[#c8b2f2] disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="size-5" />
        </button>
        <p className="rounded-full border-2 border-[#c8b2f2] px-4 py-2 text-sm leading-5 text-[#3f3f46]">
          Página <span className="mx-1">{currentPage + 1}</span> de <span className="ml-1">{pages.length}</span>
        </p>
        <button
          type="button"
          aria-label="Próxima página"
          onClick={() => flipBookRef.current?.pageFlip().flipNext()}
          disabled={currentPage >= pages.length - 1}
          className="flex h-10 min-w-12 items-center justify-center rounded-full border-2 border-[#c8b2f2] text-[#171026] transition-colors hover:bg-[#c8b2f2] disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronRight className="size-5" />
        </button>
      </nav>
    </div>
  );
}
