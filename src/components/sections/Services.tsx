import { getTranslations } from "next-intl/server";
import { ArrowRight, Check, Cloud, Compass, Layers, Pulse, Shield, Smartphone, Sparkle } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { pick } from "@/content/schema";
import { services } from "@/content/services";
import type { Locale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils/cn";

const ICONS = {
  web: Layers,
  mobile: Smartphone,
  cloud: Cloud,
  realtime: Pulse,
  ai: Sparkle,
  audit: Shield,
} as const;

type ServicesProps = { locale: Locale };

/**
 * Services as offers, not as a skill list: each card states what the client ends
 * up with, how long it takes and how the engagement works. The call to action
 * points at the contact section, which is where the brief form takes over.
 */
export async function Services({ locale }: ServicesProps) {
  const t = await getTranslations("services");

  return (
    <Section
      id="services"
      eyebrow={t("eyebrow")}
      title={t("title")}
      intro={t("intro")}
      width="wide"
      blueprint
    >
      <ul className="grid gap-stack-sm md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => {
          const Icon = ICONS[service.icon];
          return (
            <Reveal key={service.slug} delay={index * 0.05} className="h-full">
              <li
                className={cn(
                  "panel flex h-full flex-col gap-4 p-6 transition-shadow dur-3 ease-out-expo hover:shadow-3",
                  service.featured && "border-accent-soft-border",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-control bg-accent-soft text-accent-soft-text"
                  >
                    <Icon size={19} />
                  </span>
                  {service.featured && <Badge variant="accent">{t("featured")}</Badge>}
                </div>

                <div>
                  <h3 className="text-h3 font-semibold text-balance">{pick(service.title, locale)}</h3>
                  <p className="mt-2 text-body text-fg-muted">{pick(service.summary, locale)}</p>
                </div>

                <div>
                  <p className="eyebrow mb-2">{t("deliverables")}</p>
                  <ul className="flex flex-col gap-1.5">
                    {pick(service.deliverables, locale).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-caption text-fg-muted">
                        <Check size={14} className="mt-0.5 shrink-0 text-success-text" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-border-subtle pt-4 text-caption">
                  <div>
                    <dt className="text-fg-subtle">{t("timeline")}</dt>
                    <dd className="mt-0.5 text-fg">{pick(service.timeline, locale)}</dd>
                  </div>
                  <div>
                    <dt className="text-fg-subtle">{t("engagement")}</dt>
                    <dd className="mt-0.5 text-fg">{pick(service.engagement, locale)}</dd>
                  </div>
                </dl>

                <a
                  href="#contact"
                  className="link-quiet inline-flex w-fit items-center gap-2 text-body"
                >
                  {t("request")}
                  <ArrowRight size={15} />
                </a>
              </li>
            </Reveal>
          );
        })}
      </ul>

      <p className="mt-stack-md flex items-center gap-2 text-caption text-fg-subtle">
        <Compass size={15} />
        {t("scopeNote")}
      </p>
    </Section>
  );
}
