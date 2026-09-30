"use client";

import { useRef, type KeyboardEvent } from "react";

interface TabsProps<T extends string> {
  label: string;
  items: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  panelId: string;
  idPrefix: string;
  className?: string;
}

/** Underlined tabs (Figma 153:1812 + active line 153:1806). WAI-ARIA tabs pattern with automatic activation. */
export function Tabs<T extends string>({ label, items, value, onChange, panelId, idPrefix, className = "" }: TabsProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    onChange(items[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={`relative flex w-full max-w-[396px] items-start justify-between gap-6 after:absolute after:inset-x-0 after:bottom-0 after:h-[1.4px] after:bg-white/12 sm:justify-start sm:gap-12 ${className}`}
    >
      {items.map((item, index) => {
        const selected = item.value === value;
        return (
          <button
            key={item.value}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-${item.value}`}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`relative z-10 pb-4 font-display text-lg leading-7 font-medium tracking-[0.1px] whitespace-nowrap transition-colors sm:text-xl ${
              selected ? "text-white" : "text-white hover:text-mint"
            } after:absolute after:inset-x-0 after:bottom-[-0.3px] after:h-0.5 after:origin-center after:bg-mint after:transition-transform after:duration-300 motion-reduce:after:transition-none ${
              selected ? "after:scale-x-100" : "after:scale-x-0"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
