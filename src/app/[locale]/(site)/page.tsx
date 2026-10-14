import { setRequestLocale } from "next-intl/server";
import { About } from "@/components/sections/About";
import { ContactCta } from "@/components/sections/ContactCta";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { isLocale, type Locale } from "@/lib/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

/**
 * The single-page scroll, composed in reading order:
 * proposition (hero) → work (3d reels) → proof (about) → capability (skills) → contact.
 */
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const resolved: Locale = isLocale(locale) ? locale : "en";

  return (
    <>
      <Hero locale={resolved} />
      <Work locale={resolved} />
      <About locale={resolved} />
      <Skills locale={resolved} />
      <ContactCta locale={resolved} />
    </>
  );
}
