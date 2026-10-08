import { getTranslations } from "next-intl/server";
import { Check, Sparkle } from "@/components/icons";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { profile } from "@/content/profile";
import { pick } from "@/content/schema";
import type { Locale } from "@/lib/i18n/routing";

type AboutProps = { locale: Locale };

/**
 * About: Story, verified academic & professional credentials from CV,
 * numbers, and working languages.
 * Single profile picture rule respected: no duplicate portrait image here.
 */
export async function About({ locale }: AboutProps) {
  const t = await getTranslations("about");
  const story = pick(profile.bio, locale);

  return (
    <Section id="about" eyebrow={t("eyebrow")} title={t("title")} width="content">
      <div className="grid gap-stack-lg lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start">
        {/* Creative CV & Academic Credentials Card (Replaces duplicate portrait) */}
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border-interactive/40 bg-gradient-to-br from-surface via-surface-elevated to-surface-sunken p-5 sm:p-6 shadow-2">
            {/* Artistic Background Shapes & Glow */}
            <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-accent/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 size-48 rounded-full bg-accent-soft/30 blur-2xl" />

            <div className="relative z-10 flex flex-col gap-5">
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-fg shadow-sm">
                    <Sparkle size={16} />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold tracking-tight text-fg">
                      BENSEBA Lounès
                    </h3>
                    <p className="font-mono text-[11px] text-accent font-medium">
                      {locale === "ar"
                        ? "جامعة هواري بومدين · ليسانس إعلام آلي وماستر بيومعلوماتية"
                        : locale === "fr"
                        ? "USTHB · Licence Informatique & Master Bioinformatique"
                        : "USTHB · BSc in Computer Science & MSc in Bioinformatics"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Timeline */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
                  {locale === "ar" ? "الشهادات والمسار الجامعي" : locale === "fr" ? "Diplômes & Parcours" : "Education & Degrees"}
                </span>

                <div className="flex flex-col gap-3">
                  <div className="relative rounded-xl border border-border-subtle bg-surface/80 p-3 backdrop-blur-sm transition-transform hover:scale-[1.01]">
                    <div className="flex items-center justify-between text-caption font-semibold text-fg">
                      <span>
                        {locale === "ar"
                          ? "ماستر في المعلوماتية الحيوية"
                          : locale === "fr"
                          ? "Master en Bioinformatique"
                          : "Master's Degree in Bioinformatics"}
                      </span>
                      <span className="rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] text-accent font-bold">
                        EQF 7 · M2
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-fg-muted">
                      {locale === "ar"
                        ? "جامعة هواري بومدين للعلوم والتكنولوجيا (USTHB)"
                        : locale === "fr"
                        ? "Univ. des Sciences et de la Technologie Houari Boumediene (USTHB)"
                        : "University of Science & Technology Houari Boumediene (USTHB)"}
                    </p>
                    <span className="mt-1 block font-mono text-[10px] text-fg-subtle">
                      {locale === "ar" ? "2024 – 2026 · الجزائر" : locale === "fr" ? "2024 – 2026 · Alger" : "2024 – 2026 · Algiers"}
                    </span>
                  </div>

                  <div className="relative rounded-xl border border-border-subtle bg-surface/80 p-3 backdrop-blur-sm transition-transform hover:scale-[1.01]">
                    <div className="flex items-center justify-between text-caption font-semibold text-fg">
                      <span>
                        {locale === "ar"
                          ? "ليسانس في الإعلام الآلي"
                          : locale === "fr"
                          ? "Licence en Informatique"
                          : "Bachelor's Degree in Computer Science"}
                      </span>
                      <span className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] text-accent font-bold">
                        {locale === "ar" ? "متخرج · EQF 6" : locale === "fr" ? "EQF 6 · Diplômé" : "EQF 6 · Graduated"}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-fg-muted">
                      {locale === "ar"
                        ? "جامعة هواري بومدين (كلية الإعلام الآلي)"
                        : locale === "fr"
                        ? "USTHB (Faculté d'Informatique)"
                        : "USTHB (Faculty of Computer Science)"}
                    </p>
                    <span className="mt-1 block font-mono text-[10px] text-fg-subtle">
                      {locale === "ar" ? "2020 – 2024 · الجزائر" : locale === "fr" ? "2020 – 2024 · Alger" : "2020 – 2024 · Algiers"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Work & Practical Experience */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
                  Experience Highlights
                </span>

                <div className="flex flex-col gap-2.5">
                  <div className="rounded-xl border border-border-subtle bg-surface/60 p-3 text-caption">
                    <div className="flex items-center justify-between font-semibold text-fg">
                      <span>Freelance Mobile & Web Developer</span>
                      <span className="font-mono text-[10px] text-accent">2024 – Present</span>
                    </div>
                    <p className="mt-1 text-xs text-fg-muted leading-relaxed">
                      Cross-platform Flutter apps, clean architecture, QR platforms (Kamir Gym, Linky, Restaurant & Library apps).
                    </p>
                  </div>

                  <div className="rounded-xl border border-border-subtle bg-surface/60 p-3 text-caption">
                    <div className="flex items-center justify-between font-semibold text-fg">
                      <span>Independent Software Engineering</span>
                      <span className="font-mono text-[10px] text-accent">Algeria</span>
                    </div>
                    <p className="mt-1 text-xs text-fg-muted leading-relaxed">
                      Engineering robust full-stack platforms, APIs, and modern data-driven systems.
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Contact Bar */}
              <div className="mt-1 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-surface-sunken p-2.5 font-mono text-[11px] text-fg-subtle border border-border-subtle">
                <span>📍 Tizi Ouzou & Algiers</span>
                <span>✉️ bensebalounes7@gmail.com</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bio Story, Stats & Languages */}
        <div>
          <ol className="flex flex-col gap-stack-sm">
            {story.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.06}>
                <p className="max-w-prose text-body text-fg-muted leading-relaxed">{paragraph}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <div className="mt-stack-lg">
              <h3 className="eyebrow mb-stack-sm">{t("numbersTitle")}</h3>
              <dl className="grid grid-cols-2 gap-stack-md sm:grid-cols-4">
                {profile.stats.map((stat) => (
                  <div key={stat.id} className="border-s-2 border-accent/40 ps-3">
                    <dd className="font-display text-h2 font-bold text-fg">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dt className="mt-1 text-caption font-medium text-fg-muted">{pick(stat.label, locale)}</dt>
                    {stat.detail && (
                      <p className="mt-1 text-[11px] text-fg-subtle">{pick(stat.detail, locale)}</p>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-stack-lg">
              <h3 className="eyebrow mb-stack-sm">{t("languagesTitle")}</h3>
              <ul className="flex flex-wrap gap-2.5">
                {profile.spokenLanguages.map((language) => (
                  <li
                    key={language.tag}
                    className="inline-flex items-center gap-2 rounded-pill border border-border-subtle bg-surface px-3 py-1.5 text-caption font-medium shadow-sm transition-transform hover:scale-105"
                  >
                    <span className="font-mono text-accent font-bold ltr-island">{language.tag}</span>
                    <span className="text-fg">{pick(language.name, locale)}</span>
                    <span className="text-fg-subtle">· {pick(language.level, locale)}</span>
                    <Check size={13} className="text-success-text" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
