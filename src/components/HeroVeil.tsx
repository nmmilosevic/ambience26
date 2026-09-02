/**
 * Quiet dusk scrim over hero photography.
 * Uses --color-void (warm charcoal), never #000, so on-void type meets contrast
 * while the room still reads in the open mid-frame.
 */
export function HeroVeil({ className = "" }: { className?: string }) {
  return (
    <div
      className={`hero-veil pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    />
  );
}
