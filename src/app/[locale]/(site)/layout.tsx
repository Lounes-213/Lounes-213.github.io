import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { SkipLink } from "@/components/layout/SkipLink";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { isLocale, type Locale } from "@/lib/i18n/routing";

type SiteLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * The page shell: skip link first (it must be the first focusable element),
 * then progress, header, content landmark, footer and the mobile tab bar.
 * Every one of these is a landmark or a known a11y affordance, so the document
 * outline stays predictable no matter which sections a route composes.
 */
export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const resolved: Locale = isLocale(locale) ? locale : "en";

  return (
    <>
      <SplashScreen locale={resolved} />
      <SkipLink />
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer locale={resolved} />
      <MobileTabBar />
    </>
  );
}
