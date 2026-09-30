import Image from "next/image";

/**
 * Figma "Effect Elements" (206:407): blurred glows rasterised to a single
 * lightweight WebP + the crisp 6%-white grid line behind the hero.
 * Purely decorative — sits behind all content.
 */
export function BackgroundEffects() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/background/effects.webp')] bg-size-[100%_100%] bg-top bg-no-repeat lg:left-1/2 lg:w-[1440px] lg:-translate-x-1/2" />
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
