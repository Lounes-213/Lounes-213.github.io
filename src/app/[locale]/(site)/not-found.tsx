import { getTranslations } from "next-intl/server";
import { ArrowRight } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Localized 404, rendered inside the site shell (so header, footer and language
 * switch still work). Copy is from the catalogue like everything else — the
 * page exists precisely so no visitor meets an untranslated string.
 */
export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-section text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-stack-sm text-h1 text-balance">{t("title")}</h1>
      <p className="mt-stack-md max-w-prose text-lead text-fg-muted">{t("body")}</p>
      <ButtonLink href="/" size="lg" className="mt-stack-lg" iconEnd={<ArrowRight />}>
        {t("cta")}
      </ButtonLink>
    </section>
  );
}
