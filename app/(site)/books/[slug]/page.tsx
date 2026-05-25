import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BookLegalActions } from "@/components/legal/book-legal-actions";
import { BookCarousel } from "@/components/site/book-carousel";
import { BookCoverFloatingCurve } from "@/components/site/book-cover-floating-curve";
import { BookCoverPreviewModal } from "@/components/site/book-cover-preview-modal";
import {
  getContributorNames,
  getPrimaryCategory,
  getPublishedBookBySlug,
  listBookSlugs,
  listPublishedBooks,
} from "@/lib/books";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return listBookSlugs();
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = await getPublishedBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const books = await listPublishedBooks();
  const recommendations = books.filter((item) => item.slug !== book.slug);
  const authors = getContributorNames(book, "author");
  const illustrators = getContributorNames(book, "illustrator");
  const category = getPrimaryCategory(book);
  const publicationYear = book.publishedAt
    ? new Date(book.publishedAt).getUTCFullYear().toString()
    : "Ano não informado";
  const edition = book.subtitle ?? (publicationYear === "Ano não informado" ? "" : `${publicationYear}.1`);
  const pageCount = book.readerPages.length ? book.readerPages.length.toString() : "Não informado";

  return (
    <main className="bg-background">
      <nav className="sticky top-0 z-30 border-b border-[#d4d4d8] bg-background px-4 py-4 lg:px-16" aria-label="Caminho da página">
        <ol className="flex flex-wrap items-center gap-2 text-xs leading-[18px] text-[#3f3f46]">
          <li>
            <Link href="/" className="hover:underline">
              Página inicial
            </Link>
          </li>
          <li className="text-[#a1a1aa]" aria-hidden="true">
            /
          </li>
          <li>{category}</li>
          <li className="text-[#a1a1aa]" aria-hidden="true">
            /
          </li>
          <li className="font-semibold text-[#52525b]" aria-current="page">
            {book.title}
          </li>
        </ol>
        <div className="absolute right-16 top-[50px] z-10 hidden h-[136px] w-20 overflow-hidden bg-[#35130f] lg:block">
          <div className="absolute bottom-[-40px] right-[-48px] flex h-[137px] w-[175px] items-center justify-center">
            <div className="-scale-y-100 rotate-180">
              <Image
                src="/assets/figma/hero-bookmark-character.svg"
                alt=""
                width={175}
                height={137}
                className="-scale-x-100"
              />
            </div>
          </div>
        </div>
      </nav>

      <section className="border-b border-[#d4d4d8] px-4 lg:px-16">
        <div className="grid gap-8 lg:min-h-[min(calc(100svh_-_14.5rem),934px)] lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:gap-0">
          <div className="flex flex-col gap-6 py-8 lg:pr-8">
            <div className="space-y-4">
              <div className="space-y-2 text-[#18181b]">
                <h1 className="text-[40px] font-bold leading-[48px] tracking-normal">{book.title}</h1>
                {edition ? <p className="text-2xl leading-8">{edition}</p> : null}
              </div>
              <p className="text-lg leading-[26px] text-[#52525b]">{book.description}</p>
            </div>

            <hr className="border-[#d4d4d8]" />

            <section className="space-y-4" aria-labelledby="book-information-title">
              <h2 id="book-information-title" className="text-lg font-semibold leading-[26px] text-[#3f3f46]">
                Informações do livro
              </h2>
              <dl className="space-y-2 text-base leading-6 text-[#3f3f46]">
                <BookDetailRow label="Autor" values={authors} badge />
                <BookDetailRow label="Ilustrações" values={illustrators} badge />
                <BookDetailRow label="Faixa etária" values={[book.ageRange]} badge />
                <BookDetailRow label="Páginas" values={[pageCount]} />
                <BookDetailRow label="Ano de publicação" values={[publicationYear]} />
              </dl>
            </section>

            <BookLegalActions book={book} />
          </div>

          <div className="hidden bg-[#d4d4d8] lg:block" aria-hidden="true" />

          <div className="relative my-8 flex min-h-[680px] flex-col items-end justify-end gap-2 overflow-visible bg-[#f4f4f5] p-8 lg:ml-8 lg:min-h-0">
            <BookCoverFloatingCurve />
            <div className="relative min-h-0 w-full flex-1">
              <Image
                src={book.assets.cover.url}
                alt={book.assets.cover.altText ?? `Capa de ${book.title}`}
                fill
                priority
                className="object-contain"
                sizes="(min-width: 1024px) 500px, 90vw"
              />
            </div>
            <BookCoverPreviewModal
              title={book.title}
              frontCover={book.assets.cover}
              backCover={book.assets.backCover}
            />
          </div>
        </div>
      </section>

      {recommendations.length ? (
        <section className="border-b border-[#d4d4d8] px-4 py-8 lg:px-16">
          <BookCarousel books={recommendations} />
        </section>
      ) : null}
    </main>
  );
}

function BookDetailRow({ label, values, badge = false }: { label: string; values: string[]; badge?: boolean }) {
  const displayValues = values.length ? values : ["Não informado"];

  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0">{label}</dt>
      <dd className="flex flex-wrap justify-end gap-1">
        {displayValues.map((value) =>
          badge ? (
            <span key={value} className="rounded-xl bg-[#c8b2f2] px-3 py-1 text-sm leading-5 text-[#171026]">
              {value}
            </span>
          ) : (
            <span key={value}>{value}</span>
          ),
        )}
      </dd>
    </div>
  );
}
