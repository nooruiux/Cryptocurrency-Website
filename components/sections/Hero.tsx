import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StatCard } from "@/components/ui/StatCard";
import { stats } from "@/lib/data";

/** Figma "Herro section" hero (142:476) + "Statistics" (142:518). */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" data-section="hero" className="container-lumino">
      <div className="mt-14 flex flex-col items-center gap-12 lg:mt-28 lg:flex-row lg:items-start lg:gap-[29px]">
        <div className="flex w-full max-w-[658px] flex-col items-start gap-10 max-md:items-center max-md:text-center lg:w-[56%] lg:shrink-0 xl:w-[658px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <p className="flex items-center gap-3 text-base leading-[26px] max-md:justify-center max-md:text-left font-medium tracking-[0.09px] text-white sm:text-lg">
                <Image src="/assets/header/badge-bitcoin.svg" alt="" width={40} height={40} className="size-10 shrink-0" />
                <span>
                  Register for free &amp; get $10 on <span className="text-neon">Bitcoin mining</span>
                </span>
              </p>
              <div className="relative">
                <h1
                  id="hero-title"
                  className="text-fluid-h1 font-display font-bold tracking-[0.32px] text-white lg:max-xl:text-[52px] lg:max-xl:leading-[62px] xl:text-[64px] xl:leading-[76px]"
                >
                  The Faster, Safer Platform To Mining{" "}
                  <span className="whitespace-nowrap">
                    Bitcoin
                    {/* Tablet → laptop: same decoration, sized in em so it scales with the H1 */}
                    <span aria-hidden className="relative hidden h-0 w-[3.11em] md:inline-block xl:hidden">
                      <Image
                        src="/assets/header/hero-decoration.svg"
                        alt=""
                        width={199}
                        height={96}
                        className="absolute bottom-[-0.19em] left-[0.15em] h-[1.5em] w-[3.11em] max-w-none"
                      />
                    </span>
                  </span>
                </h1>
                {/* Rocket + wave decoration (320:301) — aligned to the last line on desktop */}
                <Image
                  src="/assets/header/hero-decoration.svg"
                  alt=""
                  width={199}
                  height={96}
                  className="pointer-events-none absolute top-[129px] left-[262px] hidden h-24 w-[199px] max-w-none xl:block"
                />
              </div>
            </div>
            <p className="max-w-[562px] text-base leading-6 font-medium sm:leading-7 tracking-[0.09px] text-white/64 sm:text-lg">
              Digital currencies introduced new financial tools and their value has grown tremendously over the last few
              years. There&apos;s never been a better time to join this billion dollar industry.
            </p>
          </div>
          <ButtonLink href="#mining-plan" size="lg" className="max-md:w-full">
            Start Mining
          </ButtonLink>
        </div>

        <Image
          src="/assets/header/hero-02.webp"
          alt="Crypto growth illustration: Ethereum, Bitcoin and Litecoin coins in front of a rising bar chart"
          width={560}
          height={510}
          preload
          sizes="(min-width: 640px) 560px, 100vw"
          className="h-auto w-full max-w-[560px] lg:min-w-0 lg:flex-1 xl:w-[560px] xl:max-w-none xl:flex-none"
        />
      </div>

      <Reveal className="mt-14 lg:mt-[88px] lg:pl-[54px]">
        <dl className="grid gap-6 md:grid-cols-3 lg:grid-cols-[359fr_357fr_383fr]" aria-label="Platform statistics">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
