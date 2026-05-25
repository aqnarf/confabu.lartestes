"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function BookCoverFloatingCurve() {
  const curveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    function updateCurve() {
      const offset = Math.min(window.scrollY, 720);

      if (curveRef.current) {
        curveRef.current.style.transform = `translate3d(0, ${offset * 0.1}px, 0) rotate(16deg)`;
      }

      frame = 0;
    }

    function handleScroll() {
      if (!frame) {
        frame = window.requestAnimationFrame(updateCurve);
      }
    }

    updateCurve();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div
      ref={curveRef}
      className="pointer-events-none absolute -left-12 -top-24 origin-center opacity-90 transition-transform duration-150 ease-out will-change-transform"
    >
      <Image src="/assets/figma/hero-decoration-left.svg" alt="" width={230} height={300} />
    </div>
  );
}
