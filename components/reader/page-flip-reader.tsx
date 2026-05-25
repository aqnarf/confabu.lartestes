"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import type { ReaderPage } from "@/lib/books";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

export function PageFlipReader({ pages }: { pages: ReaderPage[] }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl justify-center overflow-hidden py-6">
      <HTMLFlipBook
        width={420}
        height={560}
        size="stretch"
        minWidth={300}
        maxWidth={480}
        minHeight={420}
        maxHeight={640}
        showCover
        className="shadow-2xl"
        style={{}}
        startPage={0}
        drawShadow
        flippingTime={800}
        usePortrait
        startZIndex={0}
        autoSize
        maxShadowOpacity={0.35}
        mobileScrollSupport
        clickEventForward
        useMouseEvents
        swipeDistance={30}
        showPageCorners
        disableFlipByClick={false}
      >
        {pages.map((page, index) => (
          <article
            key={page.id}
            className="flex h-full flex-col overflow-hidden bg-card text-card-foreground"
          >
            <div className="relative flex-1 bg-muted">
              <Image
                src={page.image.url}
                alt={page.image.altText ?? `Página ${page.order}`}
                fill
                className="object-cover"
                sizes="480px"
              />
            </div>
            <div className="min-h-28 border-t bg-card p-5">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Página {index + 1}</p>
              <p className="mt-2 text-base leading-7">{page.transcript}</p>
            </div>
          </article>
        ))}
      </HTMLFlipBook>
    </div>
  );
}
