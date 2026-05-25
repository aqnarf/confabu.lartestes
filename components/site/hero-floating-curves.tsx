"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function HeroFloatingCurves() {
  const leftCurveRef = useRef<HTMLDivElement>(null);
  const topCurveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    function updateCurves() {
      const offset = Math.min(window.scrollY, 560);

      if (leftCurveRef.current) {
        leftCurveRef.current.style.transform = `translate3d(0, ${offset * -0.12}px, 0)`;
      }

      if (topCurveRef.current) {
        topCurveRef.current.style.transform = `translate3d(0, ${offset * 0.09}px, 0)`;
      }

      frame = 0;
    }

    function handleScroll() {
      if (!frame) {
        frame = window.requestAnimationFrame(updateCurves);
      }
    }

    updateCurves();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={leftCurveRef}
        className="pointer-events-none absolute left-[-194px] top-[144px] flex h-[378px] w-[353px] items-center justify-center transition-transform duration-150 ease-out will-change-transform"
      >
        <Image
          src="/assets/figma/hero-decoration-left.svg"
          alt=""
          width={224}
          height={310}
          className="-rotate-[30deg] skew-x-[0.92deg]"
        />
      </div>
      <div
        ref={topCurveRef}
        className="pointer-events-none absolute right-[calc(25%+63px)] top-[-150px] flex h-[350px] w-[250px] items-center justify-center transition-transform duration-150 ease-out will-change-transform"
      >
        <Image
          src="/assets/figma/hero-decoration-top.svg"
          alt=""
          width={228}
          height={351}
          className="-scale-y-100 skew-x-[-3.67deg]"
        />
      </div>
    </>
  );
}
