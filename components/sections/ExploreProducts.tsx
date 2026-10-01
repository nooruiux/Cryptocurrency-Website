import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal } from "@/components/ui/Reveal";
import { features } from "@/lib/data";

const coins = [
  { src: "/assets/explore/coin-eth.png", size: 80, alt: "Ethereum" },
  { src: "/assets/explore/coin-btc.png", size: 96, alt: "Bitcoin" },
  { src: "/assets/explore/coin-ltc.png", size: 72, alt: "Litecoin" },
] as const;

/** Figma "Exploer products" (142:543). */
export function ExploreProducts() {
  return (
    <section id="products" aria-labelledby="explore-title" data-section="explore" className="container-lumino relative mt-16 md:mt-[88px] lg:mt-[120px]">
      <Image
        src="/assets/explore/glow.webp"
        alt=""
        aria-hidden
        width={964}
        height={964}
        className="pointer-events-none absolute top-[-158px] left-[calc(var(--gutter)+688px)] -z-10 hidden size-[964px] max-w-none lg:block"
      />
      <Reveal>
        <h2
          id="explore-title"
          className="text-fluid-display font-display font-bold tracking-[0.28px] text-white xl:text-[56px] xl:leading-[68px]"
        >
          Explore Our Products &amp; Unique Feature across to all <span className="text-mint">Crypto Dexes</span>
        </h2>
      </Reveal>

      <Reveal className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between xl:justify-start xl:gap-[313px]">
        <div className="flex w-full max-w-[347px] flex-col gap-4">
          <div className="relative flex h-[120px] w-[328px] items-center" aria-label="Supported coins: Ethereum, Bitcoin, Litecoin" role="img">
            <span aria-hidden className="absolute top-14 left-0 h-0.5 w-[319px] bg-(image:--gradient-coin-rule)" />
            <div className="relative flex items-center gap-10">
              {coins.map((coin) => (
                <Image key={coin.alt} src={coin.src} alt="" width={coin.size} height={coin.size} style={{ width: coin.size, height: coin.size }} />
              ))}
            </div>
          </div>
          <p className="text-base leading-6 tracking-[0.08px] text-white/80 sm:leading-[26px]">
            Lorem ipsum dolor sit amet consectetur. Cras risus tincidunt scelerisque sed sit arcu non.
          </p>
        </div>

        <div className="flex items-center gap-12">
          <span aria-hidden className="hidden h-[182px] w-px shrink-0 bg-(image:--gradient-vertical-rule) lg:block" />
          <div className="flex max-w-[410px] flex-col items-start gap-8">
            <p className="text-base leading-6 font-medium tracking-[0.08px] text-white/64 sm:leading-[26px]">
              Digital currencies introduced new financial tools and their value has grown tremendously over the last few
              years. There&apos;s never been a better time to join this.
            </p>
            <ButtonLink href="#mining-plan">Learn More</ButtonLink>
          </div>
        </div>
      </Reveal>

      <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-[72px] lg:grid-cols-4 xl:w-[1180px]">
        {features.map((feature, index) => (
          <li key={feature.title} className="h-full">
            <Reveal className="h-full" delay={index * 0.08}>
              <FeatureCard {...feature} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
