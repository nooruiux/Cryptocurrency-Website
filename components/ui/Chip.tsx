interface ChipProps {
  label: string;
  pressed: boolean;
  onClick: () => void;
}

/** Hashpower preset chip (Figma 156:43): 76×32, 12px SemiBold. */
export function Chip({ label, pressed, onClick }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`flex h-8 min-w-0 flex-1 max-lg:h-11 items-center justify-center rounded-[4px] border-[0.975px] p-2 text-xs leading-[normal] font-semibold tracking-[0.06px] whitespace-nowrap transition-colors duration-200 sm:w-[76px] sm:flex-none ${
        pressed
          ? "border-mint bg-mint/12 text-white"
          : "border-white/16 bg-white/8 text-white/80 hover:border-white/32 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
