import { AssetCard } from "@/components/ui/AssetCard";
import { assets } from "@/lib/data";

/**
 * Figma "crypto slider" (192:1317) — full-bleed infinite marquee.
 * Pauses on hover, focus and touch (tap focuses the region; press-and-hold via :active); with prefers-reduced-motion it becomes a static,
 * horizontally scrollable row.
 */
export function CryptoSlider() {
  return (
    <section aria-label="Live market prices" data-section="slider" className="mt-16 md:mt-[88px] lg:mt-[120px]">
      <div className="group no-scrollbar overflow-hidden rounded-lg motion-reduce:overflow-x-auto" tabIndex={0}>
        <div className="-ml-[112px] flex w-max animate-marquee motion-reduce:ml-0 [--marquee-duration:46s] group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 gap-6 pr-6 motion-reduce:first:pl-[var(--gutter)] motion-reduce:last:hidden"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {assets.map((asset) => (
                <li key={`${copy}-${asset.name}`}>
                  <AssetCard asset={asset} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
