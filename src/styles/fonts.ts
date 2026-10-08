import {
  Fraunces,
  IBM_Plex_Sans_Arabic,
  Instrument_Sans,
  JetBrains_Mono,
} from "next/font/google";

/**
 * Self-hosted, subset, swap-displayed typefaces. Each one injects the CSS
 * variable that src/styles/tokens.css consumes (`--font-fraunces`, …), so the
 * design system keeps working even if a face fails to load: the token falls
 * back to a system stack instead of breaking the layout.
 */

/** Display: editorial serif with real contrast — headlines, numbers, wordmark. */
export const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

/** Text: clean, slightly technical sans for body and UI. */
export const fontSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

/** Mono: code, kbd, metrics, blueprint annotations, the terminal easter egg. */
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: false,
});

/** Arabic: high-quality humanist face, tuned per weight instead of stretched. */
export const fontArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-plex-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: false,
});

export const fontVariables = [
  fontDisplay.variable,
  fontSans.variable,
  fontMono.variable,
  fontArabic.variable,
].join(" ");
