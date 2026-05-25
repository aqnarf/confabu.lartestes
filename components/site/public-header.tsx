"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const pathname = usePathname();
  const isBookDetailPage = pathname.startsWith("/books/");
  const isReaderPage = pathname.startsWith("/read/");
  const hasStaticHeader = isBookDetailPage || isReaderPage;
  const [isFloating, setIsFloating] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const previousScrollY = useRef(0);
  const downwardDistance = useRef(0);

  useEffect(() => {
    if (hasStaticHeader) {
      setIsFloating(false);
      setIsVisible(true);
      return;
    }

    previousScrollY.current = window.scrollY;

    function handleScroll() {
      const scrollY = window.scrollY;
      const delta = scrollY - previousScrollY.current;

      if (scrollY <= 8) {
        setIsFloating(false);
        setIsVisible(true);
        downwardDistance.current = 0;
      } else {
        setIsFloating(true);

        if (delta > 0) {
          downwardDistance.current += delta;
        } else if (delta < -4) {
          downwardDistance.current = 0;
        }

        if (downwardDistance.current > 72 && scrollY > 128) {
          setIsVisible(false);
        } else if (delta < -4) {
          setIsVisible(true);
        }
      }

      previousScrollY.current = scrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasStaticHeader]);

  if (isReaderPage) {
    return null;
  }

  return (
    <div className={cn(!hasStaticHeader && "h-16")}>
      <header
        aria-hidden={!hasStaticHeader && isFloating && !isVisible}
        inert={!hasStaticHeader && isFloating && !isVisible}
        className={cn(
          hasStaticHeader
            ? "relative z-40 flex h-16 w-full items-center border-b bg-background/90 px-4 backdrop-blur"
            : "header-motion fixed left-1/2 z-40 flex -translate-x-1/2 items-center border-b bg-background/90 px-4 backdrop-blur transition-[width,top,height,border-radius,box-shadow,opacity,transform] duration-500",
          !hasStaticHeader &&
            (isFloating
              ? "top-4 h-14 rounded-full border bg-background/95 px-3 shadow-[0_12px_32px_rgba(23,16,38,0.12)]"
              : "top-0 h-16 rounded-none"),
          !hasStaticHeader && isFloating && !isVisible && "-translate-y-[calc(100%+24px)] opacity-0",
        )}
        style={
          hasStaticHeader
            ? undefined
            : { width: isFloating ? "min(560px, calc(100vw - 32px))" : "100vw" }
        }
      >
        <div className="flex w-full items-center justify-between gap-4">
          <Link href="/" aria-label="Confabu.lar - ir para o acervo">
            <span
              aria-hidden="true"
              className="block h-10 w-[116px] bg-[#35130f]"
              style={{
                WebkitMask:
                  "url('/assets/figma/confabulab-logo.svg') center / contain no-repeat",
                mask: "url('/assets/figma/confabulab-logo.svg') center / contain no-repeat",
              }}
            />
          </Link>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className={cn(!hasStaticHeader && isFloating && "rounded-full")}>
              <Link href="/">Acervo</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className={cn(!hasStaticHeader && isFloating && "rounded-full")}>
              <Link href="/admin">
                <UploadCloud className="size-4" />
                Admin
              </Link>
            </Button>
          </nav>
        </div>
      </header>
    </div>
  );
}
