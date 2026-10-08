import type { Locale } from "./routing";

/**
 * Formatting layer.
 *
 * Digit *shape* is a reading preference, not a locale property: Arabic-Indic
 * numerals (٠١٢٣) are opt-in, remembered next to the theme, and applied through
 * Intl's `-u-nu-` extension rather than by transforming strings in CSS or in
 * components. Everything else (separators, date order, plural words) comes from
 * the locale itself.
 */
export type Numerals = "latn" | "arab";

export const numberingSystem = (locale: Locale, numerals: Numerals = "latn"): "latn" | "arab" =>
  locale === "ar" && numerals === "arab" ? "arab" : "latn";

export const intlLocale = (locale: Locale, numerals: Numerals = "latn"): string =>
  `${locale}-u-nu-${numberingSystem(locale, numerals)}`;

export function formatNumber(
  value: number,
  locale: Locale,
  numerals: Numerals = "latn",
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(intlLocale(locale, numerals), options).format(value);
}

export function formatDate(
  value: Date | string | number,
  locale: Locale,
  numerals: Numerals = "latn",
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" },
): string {
  return new Intl.DateTimeFormat(intlLocale(locale, numerals), options).format(new Date(value));
}

export function formatMonthYear(
  value: Date | string | number,
  locale: Locale,
  numerals: Numerals = "latn",
): string {
  return formatDate(value, locale, numerals, { month: "short", year: "numeric" });
}

export function formatList(
  items: readonly string[],
  locale: Locale,
  type: Intl.ListFormatType = "conjunction",
): string {
  return new Intl.ListFormat(locale, { style: "long", type }).format([...items]);
}

export function formatPercent(
  value: number,
  locale: Locale,
  numerals: Numerals = "latn",
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(intlLocale(locale, numerals), {
    style: "percent",
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
}
