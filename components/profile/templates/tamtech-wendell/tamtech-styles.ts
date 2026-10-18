
export const tamtechColors = {
  blue: "#0874E8",
  blueDark: "#0558B5",
  mint: "#42CDA5",
  mintDark: "#25AF87",
  white: "#FFFFFF",
  ink: "#172B45",
  muted: "#64748B",
  light: "#F6FAFF",
  border: "#E1EAF4",
};

export const tamtechProfileVariables = {
  "--tamtech-blue": tamtechColors.blue,
  "--tamtech-blue-dark": tamtechColors.blueDark,
  "--tamtech-mint": tamtechColors.mint,
  "--tamtech-mint-dark": tamtechColors.mintDark,
  "--tamtech-page": "#F6FAFF",
  "--tamtech-card": "#FFFFFF",
  "--tamtech-surface": "#F0F7FF",
  "--tamtech-text": "#172B45",
  "--tamtech-muted": "#64748B",
  "--tamtech-border": "#E1EAF4",
} as React.CSSProperties;

export const tamtechContainerClass =
  "mx-auto w-full max-w-6xl px-5 sm:px-7 lg:px-8";

export const tamtechSectionClass = "py-12 sm:py-16";

export const tamtechCardClass =
  "rounded-3xl border border-[var(--tamtech-border)] bg-[var(--tamtech-card)] shadow-sm";
