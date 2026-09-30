import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/** Figma "Build Portfolio" (192:2067). */
export function BuildPortfolio() {
  return (
    <section aria-labelledby="portfolio-title" data-section="portfolio" className="container-lumino mt-24 lg:mt-[108px]">
      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center xl:h-[668px] xl:items-start">
        {/* Wave line group (213:672) */}
        <Image
          src="/assets/portfolio/wave-lines.svg"
          alt=""
          aria-hidden
          width={1248}
          height={528}
          className="pointer-events-none absolute top-[208px] left-[-199px] -z-10 hidden h-[528px] w-[1248px] max-w-none [mask-image:linear-gradient(to_right,transparent,black_280px)] xl:block"
        />

        <Reveal className="flex max-w-[537px] flex-col xl:pt-20">
          <p className="w-fit bg-(image:--gradient-portfolio-label) bg-clip-text text-xl leading-[26px] font-medium tracking-[0.1px] text-transparent">
            Portfolio
          </p>
          <h2
            id="portfolio-title"
            className="mt-2 max-w-[449px] font-display text-[34px] leading-[42px] font-bold text-white sm:text-[40px] sm:leading-[50px] xl:text-[48px] xl:leading-[58px]"
          >
            Build Your Crypto Portfolio
          </h2>
          <div className="mt-4 flex max-w-[451px] flex-col gap-6 lg:mt-[18px] lg:ml-[3px]">
            <p className="text-base leading-[26px] tracking-[0.08px] text-white/80">
              Lorem ipsum dolor sit amet consectetur. Quam nunc lorem ipsum sit lobortis. In velit vitae enim eu imperdiet
              faucibus sagittis. Facilisi et morbi felis velit aliquam pellentesque ut.
            </p>
            <div className="flex flex-col gap-5">
              <p className="text-lg leading-[26px] font-semibold text-white/90 sm:text-xl">Get the Lumino Wallet Mobile App Now!</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
                >
                  <Image src="/assets/portfolio/badge-app-store.svg" alt="Download on the App Store" width={148} height={55} />
                </a>
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
                >
                  <Image src="/assets/portfolio/badge-google-play.svg" alt="Get it on Google Play" width={148} height={55} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Phone mockup with coin cards (192:1613) — rendered with its glow bleed */}
        <Reveal className="relative mx-auto aspect-[549/668] w-full max-w-[549px] lg:mx-0 lg:ml-auto lg:w-[42%] xl:absolute xl:top-0 xl:left-[653px] xl:h-[668px] xl:w-[549px]" delay={0.1}>
          {/* The render includes the glow bleed: offset it so the 549×668 frame aligns with Figma */}
          <Image
            src="/assets/portfolio/phone-mockup.webp"
            alt="Lumino wallet app on a phone showing the ETH/USD chart, with Bitcoin, Ethereum and Tether price cards"
            width={720}
            height={964}
            sizes="(min-width: 1280px) 720px, (min-width: 1024px) 56vw, 131vw"
            className="absolute top-[-17.057%] left-[-9.333%] h-auto w-[131.01%] max-w-none [mask-image:linear-gradient(to_left,transparent,black_16%)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
