import Image from "next/image";
import { trendArrow, type Asset } from "@/lib/data";

/** Figma "Card Assets" instance (192:1318). 346×178 (280 on mobile, 320 on tablet). */
export function AssetCard({ asset }: { asset: Asset }) {
  const trendColor = asset.trend === "up" ? "text-green-primary" : "text-red-primary";
  return (
    <article className="flex h-[178px] w-[280px] shrink-0 flex-col md:w-[320px] lg:w-[346px] rounded-lg border border-white/4 bg-[rgb(22_49_90/0.24)] px-5 pt-6 md:px-6 pb-[23px] backdrop-blur-[2px]">
      <div className="flex items-start justify-between">
        {asset.logo ? (
          <Image src={asset.logo} alt="" width={44} height={44} className="size-11" />
        ) : (
          <span aria-hidden className="size-11" />
        )}
        <Image src={asset.graph} alt="" width={138} height={38} className="h-[38px] w-[137px]" />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-base leading-6 text-grey-40">{asset.name}</span>
        <span className={`flex items-center gap-1 text-lg leading-[normal] font-medium ${trendColor}`}>
          <Image src={trendArrow[asset.trend]} alt="" width={20} height={20} />
          <span>
            <span className="sr-only">{asset.trend === "up" ? "Up " : "Down "}</span>
            {asset.change}
          </span>
        </span>
      </div>
      <div className="mt-auto flex items-end justify-between">
        <span className="font-display text-2xl leading-[normal] font-bold text-white">{asset.price}</span>
        <span className="text-base leading-6 text-grey-60">{asset.ticker}</span>
      </div>
    </article>
  );
}
