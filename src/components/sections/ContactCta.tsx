import { getTranslations } from "next-intl/server";
import { External, GitHub, Instagram, LinkedIn, Mail } from "@/components/icons";
import { IconFacebook, IconTikTok } from "@/components/icons/TechIcons";
import { Card3D } from "@/components/motion/Card3D";
import { Reveal } from "@/components/motion/Reveal";
import { CopyEmailButton } from "@/components/sections/CopyEmailButton";
import { Section } from "@/components/ui/Section";
import { profile } from "@/content/profile";
import { pick } from "@/content/schema";
import type { Locale } from "@/lib/i18n/routing";

type ContactCtaProps = { locale: Locale };

const SOCIAL_CONFIG: Record<
  string,
  {
    icon: typeof GitHub;
    brandHover: string;
    borderHover: string;
    iconColor: string;
  }
> = {
  github: {
    icon: GitHub,
    brandHover: "hover:bg-fg/5",
    borderHover: "hover:border-fg/40",
    iconColor: "text-fg",
  },
  linkedin: {
    icon: LinkedIn,
    brandHover: "hover:bg-[#0A66C2]/10",
    borderHover: "hover:border-[#0A66C2]/50",
    iconColor: "text-[#0A66C2]",
  },
  instagram: {
    icon: Instagram,
    brandHover: "hover:bg-[#E1306C]/10",
    borderHover: "hover:border-[#E1306C]/50",
    iconColor: "text-[#E1306C]",
  },
  tiktok: {
    icon: IconTikTok,
    brandHover: "hover:bg-fg/5",
    borderHover: "hover:border-accent/40",
    iconColor: "text-fg",
  },
  facebook: {
    icon: IconFacebook,
    brandHover: "hover:bg-[#1877F2]/10",
    borderHover: "hover:border-[#1877F2]/50",
    iconColor: "text-[#1877F2]",
  },
};

/**
 * High-conversion 3D Contact CTA & Brand Social Hub:
 * Tactile 3D card container, pro availability status, direct email actions,
 * and branded social network cards with authentic logos.
 */
export async function ContactCta({ locale }: ContactCtaProps) {
  const t = await getTranslations("contact");
  const tAvailability = await getTranslations("availability");

  const socialLinks = profile.socials.filter((s) => s.id !== "email");

  return (
    <Section id="contact" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} width="wide" blueprint>
      <Reveal animateOnView>
        <Card3D maxTilt={4} scale={1.01} glare={true} glareMaxOpacity={0.12}>
          <div className="panel relative overflow-hidden rounded-2xl border border-border bg-surface/95 p-6 sm:p-8 lg:p-10 shadow-3 backdrop-blur-md">
            {/* Ambient Background Gradient Sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-accent/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -bottom-24 size-96 rounded-full bg-sky-500/10 blur-3xl"
            />

            <div className="relative grid gap-stack-lg lg:grid-cols-[1.1fr_0.9fr] items-start">
              {/* Left Column: Pro Availability & Direct Action */}
              <div className="flex flex-col">
                {/* Pro Status Pill - Clean, solid, no tacky pulsing */}
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-success/30 bg-success-soft px-3 py-1 font-mono text-[11px] font-semibold text-success-text">
                  <span className="size-2 rounded-full bg-success" />
                  <span>STATUS: {tAvailability(profile.availability.status).toUpperCase()}</span>
                </div>

                <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight text-fg text-balance">
                  {locale === "ar"
                    ? "جاهز لتنفيذ وتطوير مشاريع الموبايل والويب المتكاملة"
                    : locale === "fr"
                    ? "Disponible pour concevoir vos applications mobiles & plateformes web"
                    : "Available for High-Impact Mobile & Full-Stack Engineering"}
                </h3>

                {profile.availability.note && (
                  <p className="mt-3 text-body text-fg-muted leading-relaxed max-w-xl">
                    {pick(profile.availability.note, locale)}
                  </p>
                )}

                {/* Direct Email Action Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex min-h-12 items-center gap-2.5 rounded-control bg-accent px-6 text-sm font-semibold !text-white shadow-1 hover:bg-accent/90 transition-all hover:scale-102 hover:shadow-md"
                  >
                    <Mail size={18} className="!text-white" />
                    <span className="!text-white">{t("emailCta")}</span>
                  </a>
                  <CopyEmailButton email={profile.email} />
                </div>

                <div className="mt-4 flex items-center gap-2 font-mono text-caption text-fg-subtle">
                  <span>⚡</span>
                  <span>{t("responseTime")}</span>
                </div>
              </div>

              {/* Right Column: Branded Social Media Hub with Authentic Logos */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-4">
                  <p className="eyebrow !mb-0">{t("elsewhere")}</p>
                  <span className="font-mono text-[11px] text-fg-subtle">Verified Channels</span>
                </div>

                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {socialLinks.map((social) => {
                    const cfg = SOCIAL_CONFIG[social.id] ?? {
                      icon: External,
                      brandHover: "hover:bg-fg/5",
                      borderHover: "hover:border-accent/40",
                      iconColor: "text-fg",
                    };
                    const IconComp = cfg.icon;

                    return (
                      <li key={social.id}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className={`group/social relative flex items-center justify-between rounded-xl border border-border-subtle bg-surface-sunken/70 p-3 transition-all duration-200 hover:scale-102 hover:bg-surface-elevated hover:shadow-1 ${cfg.borderHover} ${cfg.brandHover}`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface border border-border-subtle shadow-xs transition-transform duration-200 group-hover/social:scale-110">
                              <IconComp size={18} className={cfg.iconColor} />
                            </div>

                            <div className="flex flex-col min-w-0">
                              <span className="text-xs sm:text-sm font-bold text-fg group-hover/social:text-accent transition-colors truncate">
                                {social.label}
                              </span>
                              {social.handle && (
                                <span className="font-mono text-[11px] text-fg-subtle ltr-island truncate">
                                  {social.handle}
                                </span>
                              )}
                            </div>
                          </div>

                          <External
                            size={14}
                            className="opacity-40 transition-all duration-200 group-hover/social:opacity-100 group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5 shrink-0 ms-2"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Card3D>
      </Reveal>
    </Section>
  );
}
