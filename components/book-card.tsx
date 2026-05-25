import Image from "next/image";
import Link from "next/link";

import { getContributorNames, type Book } from "@/lib/books";

export function BookCard({ book }: { book: Book }) {
  const authors = getContributorNames(book, "author").join(", ");

  return (
    <Link
      href={`/books/${book.slug}`}
      className="group flex min-h-[456px] min-w-0 flex-col overflow-hidden bg-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="relative flex h-[360px] items-center justify-center overflow-hidden px-6 py-14">
        <div className="relative size-full">
          <Image
            src={book.assets.cover.url}
            alt={book.assets.cover.altText ?? `Capa de ${book.title}`}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-[1.025]"
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 25vw, 90vw"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1 p-6">
        <h2 className="line-clamp-2 text-[18px] font-semibold leading-[26px] text-[#3f3f46]">{book.title}</h2>
        <p className="truncate text-sm leading-5 text-[#52525b]">{authors || "Autoria em revisao"}</p>
      </div>
    </Link>
  );
}
