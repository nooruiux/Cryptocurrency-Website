import Image from "next/image";

/**
 * Figma "Effect Elements" (206:407): blurred glows rasterised to a single
 * lightweight WebP + the crisp 6%-white grid line behind the hero.
 * Purely decorative — sits behind all content.
 */
export function BackgroundEffects() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Glow raster spans 3040px (the 1440px Figma frame + 800px bleed each side) so
          blurs fade out naturally on wide screens; centred on the viewport. */}
      <div className="absolute top-0 left-1/2 h-full w-[211.12vw] -translate-x-1/2 bg-[url('/assets/background/effects.webp')] bg-size-[100%_100%] bg-no-repeat lg:w-[3040px]" />
      <Image
        src="/assets/background/hero-line.svg"
        alt=""
        width={623}
        height={361}
        className="absolute top-[227.75px] left-[calc(50%-720px+320.57px)] hidden h-[361px] w-[623px] max-w-none lg:block"
      />
    </div>
  );
}
