import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { PoolRow } from "@/components/ui/PoolRow";
import { Reveal } from "@/components/ui/Reveal";
import { pools } from "@/lib/data";

/** Figma "Control Crypto" (153:1799). */
export function ControlCrypto() {
  return (
    <section id="control" aria-labelledby="control-title" data-section="control" className="container-lumino relative mt-24 lg:mt-[124px]">
      {/* Decorative glows + illustration (desktop geometry from Figma) */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--gutter)] -z-10 hidden w-[1202px] xl:block">
        <Image src="/assets/control/glow-center.webp" alt="" width={845} height={845} className="absolute top-[-120px] left-[59px] size-[845px] max-w-none" />
        <Image src="/assets/control/glow-left.webp" alt="" width={795} height={795} className="absolute top-[-214px] left-[-444px] size-[795px] max-w-none" />
        <Image src="/assets/control/glow-right.webp" alt="" width={775} height={775} className="absolute top-[291px] left-[843px] size-[775px] max-w-none" />
      </div>

      <div className="relative flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-8">
        <Reveal className="relative flex max-w-[506px] flex-col gap-4 lg:pt-[106px]">
          <h2
            id="control-title"
            className="font-display text-[34px] leading-[42px] font-bold tracking-[0.24px] text-white sm:text-[40px] sm:leading-[50px] xl:text-[48px] xl:leading-[58px]"
          >
            Control Your Crypto Be Risk Free
          </h2>
          <div className="flex flex-col items-start gap-8">
            <p className="max-w-[410px] text-base leading-7 tracking-[0.08px] text-white/64">
              Digital currencies introduced new financial tools and their value has grown tremendously over the last few
              years. There&apos;s never been a better time to join this.
            </p>
            <ButtonLink href="#mining-plan">Start Mining</ButtonLink>
          </div>
          <Image
            src="/assets/control/illustration.svg"
            alt=""
            aria-hidden
            width={427}
            height={333}
            className="pointer-events-none absolute top-[349px] left-[-25px] hidden h-[332px] w-[427px] max-w-none xl:block"
          />
        </Reveal>

        <Reveal className="relative w-full lg:w-[561px] lg:shrink-0" delay={0.1}>
          <h3 id="pools-title" className="font-display text-xl leading-[normal] font-semibold text-white sm:text-2xl">
            Earn NMX + Frees in Farming Pools
          </h3>
          <div
            className="no-scrollbar -mx-[var(--gutter)] mt-5 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:overflow-visible lg:px-0"
            role="region"
            aria-labelledby="pools-title"
            tabIndex={0}
          >
            <table role="table" className="block w-[561px]">
              <thead className="sr-only">
                <tr>
                  <th scope="col">Pool</th>
                  <th scope="col">APY</th>
                  <th scope="col">APR</th>
                  <th scope="col">Liquidity</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody role="rowgroup" className="flex flex-col gap-3">
                {pools.map((pool, index) => (
                  <PoolRow key={pool.pair} pool={pool} active={index === 0} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Floating account card (153:1792) */}
          <aside
            aria-label="Account overview"
            className="mt-6 w-[286px] overflow-hidden rounded-lg bg-navy shadow-[0_24px_48px_-16px_rgb(0_0_0/0.45)] xl:absolute xl:top-[274px] xl:left-[-104px] xl:mt-0"
          >
            <div className="flex flex-col gap-2 px-6 pt-6">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1 leading-[normal] whitespace-nowrap">
                  <p className="font-display text-xl font-semibold tracking-[0.1px] text-white/88">Hi, Noor</p>
                  <p className="text-sm tracking-[0.07px] text-white/80">Virtual Account Value</p>
                </div>
                <p className="font-display text-[32px] leading-10 font-semibold tracking-[0.16px] text-white">$108,326.78</p>
              </div>
              <p className="flex items-center gap-2 leading-[normal] whitespace-nowrap">
                <span className="text-base tracking-[0.08px] text-mint">22,87.33 (2.35%)</span>
                <span className="font-display text-lg font-medium tracking-[0.09px] text-white/88">Today</span>
              </p>
            </div>
            <Image src="/assets/control/account-chart.svg" alt="" width={287} height={161} className="-mt-[20.4px] h-[161px] w-[287px] max-w-none" />
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
