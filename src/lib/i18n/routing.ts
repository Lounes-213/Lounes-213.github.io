import { defineRouting } from "next-intl/routing";

/**
 * The three shipped locales. English is the default and the fallback for
 * anything untranslated; Arabic is the only RTL locale, so direction is derived
 * from the locale rather than stored per string.
 */
export const locales = ["en", "fr", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeDirections = {
  en: "ltr",
  fr: "ltr",
  ar: "rtl",
} as const satisfies Record<Locale, "ltr" | "rtl">;

export type Direction = (typeof localeDirections)[Locale];

/** Native names for the switcher — a language is never called by a foreign name. */
export const localeNames = {
  en: { native: "English", english: "English", tag: "EN" },
  fr: { native: "Français", english: "French", tag: "FR" },
  ar: { native: "العربية", english: "Arabic", tag: "ع" },
} as const satisfies Record<Locale, { native: string; english: string; tag: string }>;

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Every URL carries its locale (`/en`, `/fr/projects`, `/ar`), which keeps
  // hreflang, caching and shareable links unambiguous.
  localePrefix: "always",
  // First visit: Accept-Language, then geo, then the default.
  localeDetection: true,
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  },
});

export const directionOf = (locale: Locale): Direction => localeDirections[locale];

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);
