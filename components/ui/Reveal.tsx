"use client";

import { LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Subtle scroll-reveal (fade + 16px rise). `reducedMotion="user"` makes Framer
 * drop the transform for prefers-reduced-motion users (fade only), while server
 * and client markup stay identical (no hydration mismatch). LazyMotion keeps the
 * shipped feature set to the DOM-animation subset.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          className={className}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
        >
          {children}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
