import Image from "next/image";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  arrow: string;
}

/** Figma feature card (142:562): 277×284, radius 16, 4px/4px #7B61FF offset shadow. */
export function FeatureCard({ title, description, icon, arrow }: FeatureCardProps) {
  return (
    <article className="group relative flex h-full min-h-[284px] flex-col rounded-2xl bg-(image:--gradient-feature-card) p-6 shadow-[4px_4px_0_0_var(--color-violet)] transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none">
      <Image src={icon} alt="" width={48} height={48} className="size-12" />
      <h3 className="mt-6 font-display text-xl leading-[26px] font-semibold tracking-[0.1px] text-white">{title}</h3>
      <p className="mt-[10px] text-sm leading-6 tracking-[0.07px] text-white/80">{description}</p>
      <Link
        href="#mining-plan"
        className="mt-auto self-end rounded-full pt-6 after:absolute after:inset-0 after:rounded-2xl after:content-['']"
        aria-label={`Learn more about ${title}`}
      >
        <Image
          src={arrow}
          alt=""
          width={32}
          height={32}
          className="size-8 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
        />
      </Link>
    </article>
  );
}
