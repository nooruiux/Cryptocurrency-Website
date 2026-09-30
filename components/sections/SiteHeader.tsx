"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/lib/site";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Figma "Navbar" (142:452) + accessible mobile drawer. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawer?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !drawer) return;
      const items = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const mq = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = (e: MediaQueryListEvent) => e.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onBreakpoint);
    };
  }, [open, close]);

  return (
    <header className="relative z-30 pt-6">
      <a
        href="#main"
        className="sr-only-focusable absolute top-2 left-4 z-50 rounded bg-white px-4 py-2 text-sm font-medium text-page"
      >
        Skip to content
      </a>
      <div className="container-lumino flex h-12 items-center justify-between">
        <div className="flex items-center gap-12">
          <Logo />
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-start gap-8">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base leading-[normal] font-medium tracking-[0.08px] text-white transition-colors hover:text-mint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href="#login"
            className="text-base leading-[normal] font-medium tracking-[0.08px] text-white transition-colors hover:text-mint"
          >
            Login
          </Link>
          <ButtonLink href="#mining-plan">Start Mining</ButtonLink>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-md text-white lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls={drawerId}
          onClick={() => setOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-page/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden motion-reduce:transition-none ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
        onClick={close}
      />
      <div
        ref={drawerRef}
        id={drawerId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(88vw,360px)] flex-col border-l border-white/8 bg-[#0c1742] px-6 pt-6 pb-8 shadow-2xl transition-transform duration-300 ease-out lg:hidden motion-reduce:transition-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-12 items-center justify-between">
          <Logo />
          <button
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-md text-white"
            aria-label="Close menu"
            onClick={close}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="mt-10">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/8 py-4 text-lg font-medium text-white transition-colors hover:text-mint"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <Link
            href="#login"
            onClick={() => setOpen(false)}
            className="flex h-12 items-center justify-center rounded-[4px] border border-white/24 text-base font-medium text-white"
          >
            Login
          </Link>
          <ButtonLink href="#mining-plan" onClick={() => setOpen(false)} className="w-full">
            Start Mining
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
