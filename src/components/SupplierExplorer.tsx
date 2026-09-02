"use client";

import { useId, useLayoutEffect, useRef, useState, type SyntheticEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  blockReveal,
  DURATION,
  EASE_OUT_EXPO,
  EXIT_RATIO,
  staggerContainer,
} from "@/lib/motion";
import type { Partner, PartnerCategory } from "@/content/partners";

type SupplierGroup = PartnerCategory & {
  partners: Partner[];
};

type SupplierExplorerProps = {
  groups: SupplierGroup[];
};

/**
 * Category index (secondary) + equal-size logo tiles (payoff) on void.
 * Tiles use a slightly lighter surface than section void; logos centered.
 * Tabs stay on Epilogue; selection is color/weight only (no display-font jump).
 */
export function SupplierExplorer({ groups }: SupplierExplorerProps) {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [active, setActive] = useState(0);
  const current = groups[active] ?? groups[0];

  if (!current) return null;

  const panelId = `${baseId}-panel`;
  const tabId = (index: number) => `${baseId}-tab-${index}`;

  const activate = (index: number) => {
    setActive(index);
    document.getElementById(tabId(index))?.focus();
  };

  return (
    <div className="mt-14 md:mt-20">
      <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
        {/* Secondary index: category rail. Caption sits under the active tab. */}
        <div className="md:col-span-4 lg:col-span-3">
          <div
            role="tablist"
            aria-label="Suppliers by category"
            aria-orientation="vertical"
            className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0"
          >
            {groups.map((group, index) => {
              const selected = index === active;
              return (
                <div key={group.id} className="shrink-0 md:w-full">
                  <button
                    type="button"
                    role="tab"
                    id={tabId(index)}
                    aria-selected={selected}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(index)}
                    onKeyDown={(event) => {
                      if (
                        event.key === "ArrowDown" ||
                        event.key === "ArrowRight"
                      ) {
                        event.preventDefault();
                        activate((index + 1) % groups.length);
                      }
                      if (
                        event.key === "ArrowUp" ||
                        event.key === "ArrowLeft"
                      ) {
                        event.preventDefault();
                        activate((index - 1 + groups.length) % groups.length);
                      }
                      if (event.key === "Home") {
                        event.preventDefault();
                        activate(0);
                      }
                      if (event.key === "End") {
                        event.preventDefault();
                        activate(groups.length - 1);
                      }
                    }}
                    className={`whitespace-nowrap py-2.5 pr-5 text-left text-[15px] tracking-tight transition-colors duration-mid ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:w-full md:whitespace-normal md:py-2.5 md:pr-0 md:text-base ${
                      selected
                        ? "font-medium text-on-void"
                        : "font-normal text-on-void/40 hover:text-on-void/70"
                    }`}
                  >
                    {group.label}
                  </button>
                  {selected ? (
                    <p className="hidden max-w-[16rem] pb-3 pt-0.5 text-[13px] leading-snug text-on-void/45 md:block">
                      {group.line}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
          {/* Mobile: quiet caption under the rail */}
          <p className="mt-4 max-w-measure text-[13px] leading-snug text-on-void/45 md:hidden">
            {current.line}
          </p>
        </div>

        <div
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId(active)}
          className="md:col-span-8 md:sticky md:top-28 md:self-start lg:col-span-9"
        >
          <SupplierPanel group={current} reduce={Boolean(reduce)} />
        </div>
      </div>
    </div>
  );
}

function SupplierPanel({
  group,
  reduce,
}: {
  group: SupplierGroup;
  reduce: boolean;
}) {
  if (reduce) {
    return <PartnerLogoGrid partners={group.partners} />;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={group.id}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={staggerContainer}
      >
        <motion.div
          variants={{
            initial: blockReveal.initial,
            enter: {
              ...blockReveal.animate,
              transition: {
                duration: DURATION.mid,
                ease: EASE_OUT_EXPO,
              },
            },
            exit: {
              opacity: 0,
              x: -12,
              transition: {
                duration: DURATION.mid * EXIT_RATIO,
                ease: EASE_OUT_EXPO,
              },
            },
          }}
        >
          <PartnerLogoGrid partners={group.partners} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PartnerLogoGrid({ partners }: { partners: Partner[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3.5 lg:grid-cols-4 lg:gap-4">
      {partners.map((partner) => (
        <li key={partner.slug} className="min-w-0">
          <PartnerMark partner={partner} />
        </li>
      ))}
    </ul>
  );
}

/** Slightly lifted plane on void — warm charcoal, not pure black. */
const LOGO_TILE_SURFACE = "bg-[oklch(0.24_0.014_55)]";

function PartnerMark({ partner }: { partner: Partner }) {
  // Walk logo → image → text. Bad SVGs must not flash a broken-img icon.
  const candidates = [partner.logo, partner.image].filter(
    (value): value is string => Boolean(value?.trim()),
  );
  const [stage, setStage] = useState(0);
  // Invisible until pixels exist — avoids broken-img flash between candidates.
  const [markReady, setMarkReady] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const src = candidates[stage];

  useLayoutEffect(() => {
    setMarkReady(false);
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setMarkReady(true);
  }, [src]);

  const onMarkError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    setMarkReady(false);
    setStage((s) => s + 1);
  };

  const mark =
    src ? (
      <img
        key={src}
        ref={imgRef}
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        onLoad={() => setMarkReady(true)}
        onError={onMarkError}
        className={`max-h-7 w-auto max-w-[85%] object-contain object-center sm:max-h-8 ${
          markReady ? "opacity-100" : "opacity-0"
        }`}
      />
    ) : (
      <span className="px-1 text-center font-sans text-[12px] font-medium leading-tight tracking-tight text-on-void sm:text-[13px]">
        {partner.name}
      </span>
    );

  const shell = `group flex aspect-[5/3] w-full items-center justify-center ${LOGO_TILE_SURFACE} px-5 py-4 text-on-void transition-opacity duration-mid ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-6 sm:py-5`;

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${partner.name} (opens in a new tab)`}
        className={`${shell} opacity-85 hover:opacity-100`}
      >
        {mark}
      </a>
    );
  }

  return (
    <div className={`${shell} cursor-default opacity-55`}>
      <span className="sr-only">{partner.name}</span>
      {mark}
    </div>
  );
}
