import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  href?: string;
}

/** Brand lockup — Figma "logo" (142:454): 30.3×35.1 mark + Montserrat SemiBold 28. */
export function Logo({ className = "", href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Lumino — home"
      className={`inline-flex min-h-11 items-center gap-3 lg:min-h-0 font-display text-[28px] leading-none font-semibold tracking-[0.14px] text-white ${className}`}
    >
      <Image src="/assets/brand/logo-icon.svg" alt="" width={31} height={36} className="h-[35.13px] w-[30.3px]" />
      <span>Lumino</span>
    </Link>
  );
}
