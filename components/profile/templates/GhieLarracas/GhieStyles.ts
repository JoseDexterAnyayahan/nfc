
import type { CSSProperties } from "react";

export const ghieColors = {
  blue: "#0874E8",
  blueDark: "#0558B5",

  mint: "#42CDA5",
  mintDark: "#25AF87",

  gold: "#C9A45C",
  goldLight: "#E4C982",

  white: "#FFFFFF",
  ink: "#172B45",
  muted: "#64748B",

  light: "#F6FAFF",
  border: "#E1EAF4",
};

export const ghieProfileVariables = {
  "--ghie-blue": ghieColors.blue,
  "--ghie-blue-dark": ghieColors.blueDark,

  "--ghie-mint": ghieColors.mint,
  "--ghie-mint-dark": ghieColors.mintDark,

  "--ghie-gold": ghieColors.gold,
  "--ghie-gold-light": ghieColors.goldLight,

  "--ghie-page": ghieColors.light,
  "--ghie-card": ghieColors.white,
  "--ghie-surface": "#F0F7FF",

  "--ghie-text": ghieColors.ink,
  "--ghie-muted": ghieColors.muted,
  "--ghie-border": ghieColors.border,
} as CSSProperties;

export const ghieContainerClass =
  "mx-auto w-full max-w-6xl px-5 sm:px-7 lg:px-8";

export const ghieSectionClass =
  "py-12 sm:py-16";

export const ghieCardClass =
  "rounded-3xl border border-[var(--ghie-border)] bg-[var(--ghie-card)] shadow-sm";
