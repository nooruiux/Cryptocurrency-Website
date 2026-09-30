import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Size = "md" | "lg";

const sizes: Record<Size, string> = {
  md: "h-12 px-5",
  lg: "h-14 px-7",
};

const base =
  "inline-flex shrink-0 items-center justify-center rounded-[4px] bg-(image:--gradient-brand) font-sans text-base font-medium tracking-[0.08px] whitespace-nowrap text-white " +
  "shadow-[0_0_0_0_rgb(137_86_233/0)] transition-[filter,box-shadow,transform] duration-200 ease-out " +
  "hover:brightness-110 hover:shadow-[0_8px_24px_-8px_rgb(137_86_233/0.7)] active:translate-y-px motion-reduce:transition-none";

interface ButtonLinkProps extends Omit<ComponentPropsWithoutRef<typeof Link>, "className"> {
  size?: Size;
  className?: string;
  children: ReactNode;
}

/** Primary CTA — Figma component "Button" (60:276). */
export function ButtonLink({ size = "md", className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link className={`${base} ${sizes[size]} ${className}`} {...props}>
      {children}
    </Link>
  );
}
