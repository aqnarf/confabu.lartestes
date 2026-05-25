"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const [isFloating, setIsFloating] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const previousScrollY = useRef(0);
  const downwardDistance = useRef(0);

  useEffect(() => {
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
  }, []);

  return (
    <div className="h-16">
      <header
        aria-hidden={isFloating && !isVisible}
        inert={isFloating && !isVisible}
        className={cn(
          "header-motion fixed left-1/2 z-40 flex -translate-x-1/2 items-center border-b bg-background/90 px-4 backdrop-blur transition-[width,top,height,border-radius,box-shadow,opacity,transform] duration-500",
          isFloating
            ? "top-4 h-14 rounded-full border bg-background/95 px-3 shadow-[0_12px_32px_rgba(23,16,38,0.12)]"
            : "top-0 h-16 rounded-none",
          isFloating && !isVisible && "-translate-y-[calc(100%+24px)] opacity-0",
        )}
        style={{
          width: isFloating ? "min(560px, calc(100vw - 32px))" : "100vw",
        }}
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
            <Button asChild variant="ghost" size="sm" className={cn(isFloating && "rounded-full")}>
              <Link href="/">Acervo</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className={cn(isFloating && "rounded-full")}>
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
