"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { BookCard } from "@/components/book-card";
import type { BookRecord as Book } from "@/lib/catalog/types";

export function BookCarousel({ books }: { books: Book[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canMoveBack, setCanMoveBack] = useState(false);
  const [canMoveForward, setCanMoveForward] = useState(false);

  const updateNavigation = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    setCanMoveBack(track.scrollLeft > 4);
    setCanMoveForward(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    updateNavigation();
    const resizeObserver = new ResizeObserver(updateNavigation);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, [books, updateNavigation]);

  function move(direction: -1 | 1) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.scrollBy({ left: direction * track.clientWidth * 0.82, behavior: "smooth" });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold leading-8 text-[#18181b]">Continue explorando!</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Livros anteriores"
            aria-label="Mostrar livros anteriores"
            disabled={!canMoveBack}
            onClick={() => move(-1)}
            className="flex size-10 items-center justify-center rounded-full border-2 border-[#c8b2f2] text-[#171026] transition-colors hover:bg-[#c8b2f2] disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            title="Próximos livros"
            aria-label="Mostrar próximos livros"
            disabled={!canMoveForward}
            onClick={() => move(1)}
            className="flex size-10 items-center justify-center rounded-full border-2 border-[#c8b2f2] text-[#171026] transition-colors hover:bg-[#c8b2f2] disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent"
          >
            <ChevronRight className="size-5" />
          </button>
          <Link
            href="/#acervo"
            className="ml-2 rounded-full border-2 border-[#c8b2f2] px-4 py-2 text-base font-semibold leading-6 text-[#171026] transition-colors hover:bg-[#c8b2f2]"
          >
            Ver todas
          </Link>
        </div>
      </div>
      <div
        ref={trackRef}
        onScroll={updateNavigation}
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {books.map((book) => (
          <div
            key={book.slug}
            className="min-w-[min(84vw,320px)] snap-start sm:min-w-[calc((100%_-_8px)/2)] lg:min-w-[calc((100%_-_16px)/2.85)]"
          >
            <BookCard book={book} compact />
          </div>
        ))}
      </div>
    </div>
  );
}
