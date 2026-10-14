import {
  IBM_Plex_Sans_Arabic,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";

/**
 * Modern High-Tech Developer Typography Stack:
 * - Display: Space Grotesk — geometric, technical grotesque for sharp software engineer headlines.
 * - Body: Plus Jakarta Sans — hyper-clean, legible modern sans.
 * - Code: JetBrains Mono — the quintessential developer monospace font.
 * - Arabic: IBM Plex Sans Arabic — modern, structured tech Arabic face.
 */

export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-tech-display",
  display: "swap",
  weight: ["500", "600", "700"],
  preload: true,
});

export const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-tech-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: false,
});

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
