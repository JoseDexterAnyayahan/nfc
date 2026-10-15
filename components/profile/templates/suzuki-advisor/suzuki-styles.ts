
import type { CSSProperties } from "react";

export const suzukiColors = {
  blue: "#174A96",
  blueHover: "#123B79",
  blueLight: "#E8F0FC",
  red: "#D92735",
  redLight: "#FCEBED",

  light: {
    page: "#F4F6FA",
    card: "#FFFFFF",
    surface: "#F8FAFC",
    text: "#172033",
    muted: "#64748B",
    border: "#E2E8F0",
  },

  dark: {
    page: "#0B1220",
    card: "#111C2E",
    surface: "#162338",
    text: "#F1F5F9",
    muted: "#A5B1C2",
    border: "#29384D",
  },
} as const;

export const suzukiProfileVariables = {
  "--suzuki-blue": suzukiColors.blue,
  "--suzuki-blue-hover": suzukiColors.blueHover,
  "--suzuki-red": suzukiColors.red,
  "--suzuki-page": suzukiColors.light.page,
  "--suzuki-card": suzukiColors.light.card,
  "--suzuki-surface": suzukiColors.light.surface,
  "--suzuki-text": suzukiColors.light.text,
  "--suzuki-muted": suzukiColors.light.muted,
  "--suzuki-border": suzukiColors.light.border,
} as CSSProperties;

export const suzukiProfileClassName = [
  "dark:[--suzuki-page:#0B1220]",
  "dark:[--suzuki-card:#111C2E]",
  "dark:[--suzuki-surface:#162338]",
  "dark:[--suzuki-text:#F1F5F9]",
  "dark:[--suzuki-muted:#A5B1C2]",
  "dark:[--suzuki-border:#29384D]",
].join(" ");

export const suzukiContainerClass =
  "mx-auto w-full max-w-5xl px-5 sm:px-7 lg:px-8";

export const suzukiCardClass =
  "rounded-2xl border shadow-sm transition-colors duration-300";

export const suzukiSectionClass = "py-7 sm:py-9";

export const suzukiPrimaryButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl " +
  "bg-[var(--suzuki-blue)] px-5 py-3 text-sm font-semibold text-white " +
  "transition-colors hover:bg-[var(--suzuki-blue-hover)] " +
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-[var(--suzuki-blue)] focus-visible:ring-offset-2";

export const suzukiSecondaryButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl " +
  "border border-[var(--suzuki-border)] bg-[var(--suzuki-card)] px-4 py-3 " +
  "text-sm font-semibold text-[var(--suzuki-text)] transition-colors " +
  "hover:border-[var(--suzuki-blue)] hover:text-[var(--suzuki-blue)]";
