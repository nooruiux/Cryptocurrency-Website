import Image from "next/image";

interface StatCardProps {
  label: string;
  value: string;
}

/** Figma "Statistics" card (142:519). Rendered inside a <dl>. */
export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex h-full flex-col gap-6 rounded-lg bg-(image:--gradient-stat-card) px-6 py-5 ring-[1.4px] ring-brand-blue ring-inset">
      <dt className="flex flex-col gap-6 px-[7.5px] text-lg leading-[normal] tracking-[0.09px] text-white/80">
        <span>{label}</span>
        <span aria-hidden className="-mb-[1.4px] block h-[1.4px] w-full bg-(image:--gradient-stat-rule)" />
      </dt>
      <dd className="flex items-center justify-between gap-4">
        <span className="text-gradient-brand font-display text-[32px] leading-[normal] font-bold tracking-[0.2px] sm:text-[40px]">
          {value}
        </span>
        <Image src="/assets/header/stat-arrow.svg" alt="" width={24} height={24} />
      </dd>
    </div>
  );
}
