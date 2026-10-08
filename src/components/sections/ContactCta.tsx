import { getTranslations } from "next-intl/server";
import { Mail } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { CopyEmailButton } from "@/components/sections/CopyEmailButton";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { profile } from "@/content/profile";
import { pick } from "@/content/schema";
import type { Locale } from "@/lib/i18n/routing";

type ContactCtaProps = { locale: Locale };

/**
 * Contact section: the honest version of a call to action. It gives a direct
 * address, a copy button for the people who prefer to write from their own
 * client, and a stated reply time — no form fields pretending to be a
 * conversation until the brief form lands in a later part of the build.
 */
export async function ContactCta({ locale }: ContactCtaProps) {
  const t = await getTranslations("contact");
  const tAvailability = await getTranslations("availability");

  return (
    <Section id="contact" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} width="wide" blueprint>
      <Reveal>
        <div className="panel grid gap-stack-lg p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div>
            <Badge variant="success" dot>
              {tAvailability(profile.availability.status)}
            </Badge>
            {profile.availability.note && (
              <p className="mt-stack-sm text-body text-fg-muted">{pick(profile.availability.note, locale)}</p>
            )}

            <div className="mt-stack-md flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-13 items-center gap-2 rounded-control bg-accent px-6 text-lead font-medium text-on-accent transition-colors dur-2 hover:bg-accent-hover"
              >
                <Mail size={19} />
                {t("emailCta")}
                <span className="ltr-island font-mono text-caption opacity-80">{profile.email}</span>
              </a>
              <CopyEmailButton email={profile.email} />
            </div>

            <p className="mt-stack-sm text-caption text-fg-subtle">{t("responseTime")}</p>
          </div>

          <div>
            <p className="eyebrow mb-stack-sm">{t("elsewhere")}</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {profile.socials
                .filter((social) => social.id !== "email")
                .map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="panel flex min-h-14 flex-col justify-center px-4 transition-colors dur-2 hover:bg-bg-subtle"
                    >
                      <span className="text-body text-fg">{social.label}</span>
                      {social.handle && (
                        <span className="text-caption text-fg-subtle ltr-island">{social.handle}</span>
                      )}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
