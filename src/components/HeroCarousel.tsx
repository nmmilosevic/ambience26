"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/content/projects";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const total = heroSlides.length;
  const slide = heroSlides[index];

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => go(1), 6500);
    return () => window.clearInterval(id);
  }, [go, reduced, index]);

  return (
    <section className="relative h-[100svh] min-h-[36rem] overflow-hidden bg-ink text-bg">
      {heroSlides.map((s, i) => (
        <div
          key={s.image + i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/30" />
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col justify-end pb-16 pt-28 sm:pb-20">
        <div className="container-pad max-w-4xl">
          <p className="font-display text-4xl tracking-[-0.02em] text-bg sm:text-5xl md:text-[3.5rem]">
            Ambience
          </p>
          <p className="mt-2 max-w-xl text-base text-bg/85 sm:text-lg">
            Luxury interior architecture from Marbella, crafted as calm, lasting homes.
          </p>

          <div className="mt-10 max-w-2xl border-t border-bg/25 pt-8">
            <Link href={slide.href} className="group block focus-ring">
              <h1 className="font-display text-2xl tracking-[-0.02em] transition-opacity group-hover:opacity-80 sm:text-3xl md:text-4xl">
                {slide.title}
              </h1>
              <span className="mt-4 inline-flex items-center gap-3 text-sm tracking-wide text-bg/90">
                View project
                <span aria-hidden className="h-px w-8 bg-bg/70 transition-all group-hover:w-12" />
              </span>
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="border border-bg/35 px-4 py-2 text-xs tracking-wide hover:bg-bg/10 focus-ring"
              aria-label="Previous slide"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="border border-bg/35 px-4 py-2 text-xs tracking-wide hover:bg-bg/10 focus-ring"
              aria-label="Next slide"
            >
              Next
            </button>
            <div className="ml-2 flex gap-2" role="tablist" aria-label="Carousel slides">
              {heroSlides.map((s, i) => (
                <button
                  key={s.slug || s.image}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show ${s.title}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 w-1.5 rounded-full transition-all focus-ring ${
                    i === index ? "w-6 bg-bg" : "bg-bg/40 hover:bg-bg/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
