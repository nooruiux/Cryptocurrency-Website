import Image from "next/image";
import type { Pool } from "@/lib/data";

interface PoolRowProps {
  pool: Pool;
  active?: boolean;
}

/** Farming pool row (142:705 active / 148:1299 default). 561×64. */
export function PoolRow({ pool, active = false }: PoolRowProps) {
  const surface = active ? "bg-navy" : "border-[1.4px] border-brand-blue/24";
  return (
    <tr
      role="row"
      className={`grid h-16 grid-cols-[192px_98px_101px_111px_28px] items-center rounded-[4px] pr-[15px] pl-4 transition-colors hover:bg-navy/60 ${surface}`}
    >
      <th role="rowheader" scope="row" className="flex items-center gap-3 text-left text-base leading-[normal] font-semibold text-white">
        <span className="flex h-8 w-[54px] items-center">
          <Image src={pool.icon} alt="" width={pool.iconWidth} height={pool.iconHeight} style={{ width: pool.iconWidth, height: pool.iconHeight }} />
        </span>
        {pool.pair}
      </th>
      <Metric label="APY" value={pool.apy} />
      <Metric label="APR" value={pool.apr} />
      <Metric label="Liquidity" value={pool.liquidity} />
      <td role="cell">
        <a
          href="#mining-plan"
          aria-label={`Open ${pool.pair} farming pool`}
          className="flex size-7 items-center justify-center rounded-[2px] bg-(image:--gradient-brand-vertical) transition-[filter] hover:brightness-125"
        >
          <Image src="/assets/control/row-arrow.svg" alt="" width={16} height={16} />
        </a>
      </td>
    </tr>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <td role="cell" className="flex flex-col gap-1 leading-[normal] whitespace-nowrap">
      <span aria-hidden className="text-xs text-white/56">
        {label}
      </span>
      <span className="text-base font-semibold text-white">{value}</span>
    </td>
  );
}
