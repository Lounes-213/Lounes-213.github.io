import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { profile } from "@/content/profile";
import { pick } from "@/content/schema";
import { site } from "@/content/site";
import { defaultLocale, directionOf, isLocale, locales, type Locale } from "@/lib/i18n/routing";
import { ThemeProvider } from "@/lib/theme/provider";
import { themeInitScript } from "@/lib/theme/script";
import { fontVariables } from "@/styles/fonts";
import "@/app/globals.css";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

/** Every locale is a static page — no request-time rendering for the shell. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : defaultLocale;
  const t = await getTranslations({ locale: resolved, namespace: "meta.home" });

  return {
    metadataBase: new URL(site.url),
    title: t("title", { name: profile.name, role: pick(profile.role, resolved) }),
    description: t("description", { tagline: pick(profile.tagline, resolved) }),
    applicationName: profile.name,
    authors: [{ name: profile.name }],
    icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
    // hreflang for all three languages plus a sensible default for unknown
    // languages; the language switcher keeps the current page when it swaps.
    alternates: {
      canonical: `/${resolved}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": `/${defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: profile.name,
      locale: resolved === "ar" ? "ar_AR" : resolved === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f12" },
  ],
};

/**
 * The root layout. `<html>` carries `lang`/`dir` from the locale itself — RTL
 * is never a runtime decision — and `suppressHydrationWarning` because the
 * pre-paint script (below) sets the theme attributes React never renders, so
 * adopting them is intentional rather than a mismatch.
 */
export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Middleware normally guarantees this; redirect instead of notFound() so a
  // bypassed request can never render a 404 without a root layout.
  if (!hasLocale(locales, locale)) redirect(`/${defaultLocale}`);

  setRequestLocale(locale);
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} dir={directionOf(locale)} className={fontVariables} suppressHydrationWarning>
      <body>
        {/* First byte of the body: the theme is decided before anything paints. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <MotionProvider>
            <NextIntlClientProvider
              locale={locale}
              messages={messages}
              timeZone={site.timeZone}
            >
              {children}
            </NextIntlClientProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
