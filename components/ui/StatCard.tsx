import Image from "next/image";

interface StatCardProps {
  label: string;
  value: string;
}

/**
 * Figma "Statistics" card (142:519 / 142:527 / 142:535): radius 8, linear
 * gradient fill, two stacked gradient strokes (1.4px, inside) — see the
 * --gradient-stat-* tokens. Rendered inside a <dl>.
 */
export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="stroke-gradient flex h-full flex-col gap-6 rounded-lg bg-(image:--gradient-stat-card) bg-size-[100%_100%] px-6 py-5 md:max-lg:gap-4 md:max-lg:px-4 [--stroke-image:var(--gradient-stat-stroke)] [--stroke-width:1.4px]">
      <dt className="flex flex-col gap-6 px-[7.5px] text-lg md:max-lg:gap-4 md:max-lg:px-0 md:max-lg:text-base leading-[normal] tracking-[0.09px] text-white/80">
        <span>{label}</span>
        {/* Line 18: 1.4px, centre-aligned on the frame's bottom edge */}
        <span aria-hidden className="-my-[0.7px] block h-[1.4px] w-full bg-(image:--gradient-stat-rule)" />
      </dt>
      <dd className="flex items-center justify-between gap-4 md:max-lg:gap-2">
        <span className="text-gradient-brand font-display text-[32px] leading-[normal] font-bold tracking-[0.2px] sm:text-[40px] md:text-[28px] lg:text-[40px]">
          {value}
        </span>
        <Image src="/assets/header/stat-arrow.svg" alt="" width={24} height={24} />
      </dd>
    </div>
  );
}
