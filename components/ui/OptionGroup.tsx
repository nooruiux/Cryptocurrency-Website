"use client";

import { useRef, type KeyboardEvent } from "react";

interface OptionGroupProps<T extends string> {
  label: string;
  /** id of a visible element labelling the group (preferred over `label`). */
  labelledBy?: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  optionClassName?: string;
}

/**
 * Outlined toggle buttons (Figma 153:1817 / 157:117). Implemented as an ARIA
 * radiogroup with roving tabindex and arrow-key navigation.
 */
export function OptionGroup<T extends string>({
  label,
  labelledBy,
  options,
  value,
  onChange,
  className = "",
  optionClassName = "",
}: OptionGroupProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = options.length - 1;
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !backward) return;
    event.preventDefault();
    const next = forward ? (index === last ? 0 : index + 1) : index === 0 ? last : index - 1;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
      className={`flex items-center ${className}`}
    >
      {options.map((option, index) => {
        const checked = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`flex min-w-0 flex-1 items-center justify-center rounded-[4px] border py-[9px] sm:flex-none text-sm leading-[normal] font-medium tracking-[0.07px] whitespace-nowrap transition-colors duration-200 ${
              checked ? "border-mint text-white" : "border-white/24 text-white/80 hover:border-white/48 hover:text-white"
            } ${optionClassName}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
