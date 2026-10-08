import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { site } from "@/content/site";
import { routing } from "./routing";

/**
 * Per-request i18n configuration: resolves the locale (falling back to the
 * default rather than throwing on a bad segment), loads the message catalogue
 * and declares the shared Intl formats so dates, numbers and currency formats
 * cannot drift between components.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../../messages/${locale}.json`)).default,
    timeZone: site.timeZone,
    formats: {
      dateTime: {
        short: { day: "numeric", month: "short", year: "numeric" },
        long: { day: "numeric", month: "long", year: "numeric" },
        monthYear: { month: "long", year: "numeric" },
      },
      number: {
        precise: { maximumFractionDigits: 2 },
      },
    },
  };
});
