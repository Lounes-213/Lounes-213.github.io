import { getTranslations } from "next-intl/server";
import { ArrowUp, Mail } from "@/components/icons";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeModeControl } from "@/components/layout/ThemeToggle";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { pick } from "@/content/schema";
import { isLocale, type Locale } from "@/lib/i18n/routing";

type FooterProps = { locale: Locale };

/**
 * Footer as a real landmark: sections, elsewhere, and preferences. It is a server
 * component — the only interactive parts (theme and language controls) are client
 * components, so the rest of the footer costs nothing on the client.
 */
export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tAvailability = await getTranslations("availability");
  const year = new Date().getFullYear();
  const resolvedLocale: Locale = isLocale(locale) ? locale : "en";

  return (
    <footer className="relative border-t border-border bg-bg-subtle pb-tabbar lg:pb-0">
      <div className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-prose">
            <p className="font-display text-h3">{profile.name}</p>
            <p className="mt-stack-xs text-body text-fg-muted">{pick(profile.tagline, resolvedLocale)}</p>
            <p className="mt-stack-sm inline-flex items-center gap-2 text-caption text-fg-subtle">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 rounded-pill bg-success"
              />
              {tAvailability(profile.availability.status)} · {pick(profile.location, resolvedLocale)}
            </p>
          </div>

          <nav aria-label={t("sections")}>
            <p className="eyebrow mb-stack-sm">{t("sections")}</p>
            <ul className="flex flex-col gap-2">
              {site.navigation.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="text-body text-fg-muted transition-colors dur-2 hover:text-fg">
                    {tNav(item.id)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-stack-sm">{t("elsewhere")}</p>
            <ul className="flex flex-col gap-2">
              {profile.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    className="inline-flex items-center gap-2 text-body text-fg-muted transition-colors dur-2 hover:text-fg"
                    {...(social.href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  >
                    {social.id === "email" && <Mail size={16} />}
                    <span>{social.label}</span>
                    {social.handle && (
                      <span className="text-caption text-fg-subtle ltr-island">({social.handle})</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="eyebrow mb-stack-sm">{t("settings")}</p>
              <div className="flex flex-wrap items-center gap-2">
                <ThemeModeControl />
                <LanguageSwitcher />
              </div>
            </div>
            <a href="#top" className="inline-flex w-fit items-center gap-2 text-caption text-fg-muted transition-colors dur-2 hover:text-fg">
              <ArrowUp size={14} />
              {t("backToTop")}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border-subtle pt-6 text-caption text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year, name: profile.name })}</p>
        </div>
      </div>
    </footer>
  );
}
