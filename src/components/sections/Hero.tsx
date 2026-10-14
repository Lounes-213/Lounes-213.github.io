import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowDown, ArrowRight, Download, Terminal } from "@/components/icons";
import { Card3D } from "@/components/motion/Card3D";
import { CvLanguagesCard } from "@/components/motion/CvLanguagesCard";
import { CreativeFloatingBlobs } from "@/components/motion/CreativeFloatingBlobs";
import { PointerGlow } from "@/components/motion/PointerGlow";
import { Reveal } from "@/components/motion/Reveal";
import { ThreeDTechOrb } from "@/components/motion/ThreeDTechOrb";
import { ButtonLink } from "@/components/ui/Button";
import { profile } from "@/content/profile";
import { pick } from "@/content/schema";
import type { Locale } from "@/lib/i18n/routing";

type HeroProps = { locale: Locale };

/**
 * The hero carries the proposition: centered profile picture, pro typography,
 * CV download action, pro rectangular languages card, interactive 3D WebGL core,
 * and ways forward.
 */
export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations("hero");
  const isRtl = locale === "ar";

  return (
    <section id="top" className="relative isolate overflow-hidden pb-section-sm pt-[calc(var(--header-h)+1rem)]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 blueprint-focus" />
      <CreativeFloatingBlobs />
      <PointerGlow />

      <div className="container-page flex flex-col items-center">
        {/* Centered Profile Picture & Pro Name Typography (Directly under the app bar) */}
        <Reveal direction="down" delay={0.05} animateOnView>
          <div className="flex flex-col items-center text-center mb-stack-md sm:mb-stack-lg">
            {/* Ambient Halo & Double-Ringed Avatar */}
            <div className="relative group">
              <div className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-accent/35 via-sky-400/25 to-indigo-500/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
              
              <div className="relative size-24 sm:size-28 md:size-32 rounded-full ring-4 ring-accent/30 ring-offset-4 ring-offset-bg overflow-hidden shadow-2 transition-transform duration-300 group-hover:scale-105">
                {profile.portrait.image ? (
                  <Image
                    src={profile.portrait.image}
                    alt={profile.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 112px, 128px"
                    className="object-cover"
                  />
                ) : (
                  <div className="size-full bg-accent flex items-center justify-center font-display text-2xl font-bold text-accent-fg">
                    {profile.initials}
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <span
                className="absolute bottom-1 end-1 size-5 sm:size-6 rounded-full bg-surface border-2 border-bg flex items-center justify-center shadow-sm"
                title="Active Full-Stack & Mobile Engineer"
              >
                <span className="size-2.5 sm:size-3 rounded-full bg-success" />
              </span>
            </div>

            {/* Pro Profile Name Typography */}
            <div className="mt-4 flex flex-col items-center">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-fg">
                <span className="bg-gradient-to-r from-fg via-fg to-accent/90 bg-clip-text">
                  {profile.name}
                </span>
              </h1>

              <p className="mt-1 font-mono text-xs sm:text-sm font-semibold text-accent tracking-wide uppercase">
                {pick(profile.role, locale)}
              </p>

              <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] sm:text-xs text-fg-subtle">
                <span>{pick(profile.location, locale)}</span>
                <span>•</span>
                <span>
                  {locale === "ar"
                    ? "ليسانس في الإعلام الآلي وماستر في المعلوماتية الحيوية (USTHB)"
                    : locale === "fr"
                    ? "Licence en Informatique & Master en Bioinformatique (USTHB)"
                    : "Bachelor's in Computer Science & Master's in Bioinformatics (USTHB)"}
                </span>
              </div>

              {/* Hero Actions: Download CV + Navigation */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                {/* Download CV Button */}
                <a
                  href="/cv-lounes-benseba.pdf"
                  download="CV_Lounes_Benseba.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-control bg-accent px-5 py-2.5 text-xs sm:text-sm font-semibold !text-white shadow-1 hover:bg-accent/90 transition-all hover:scale-102 hover:shadow-md"
                >
                  <Download size={15} className="!text-white shrink-0" />
                  <span className="!text-white font-semibold">
                    {isRtl
                      ? "تحميل السيرة الذاتية (CV)"
                      : locale === "fr"
                      ? "Télécharger mon CV"
                      : "Download Resume / CV"}
                  </span>
                  <span className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] !text-white font-bold">
                    PDF
                  </span>
                </a>

                <ButtonLink href="#work" size="md" variant="secondary" iconEnd={<ArrowRight />}>
                  {t("ctaPrimary")}
                </ButtonLink>

                <ButtonLink href="/contact" size="md" variant="secondary">
                  {t("ctaSecondary")}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Value Proposition Headline */}
        <Reveal direction="up" delay={0.15} animateOnView className="max-w-3xl text-center mb-stack-lg">
          <p className="text-display sm:text-h1 font-bold text-fg tracking-tight text-balance">
            {pick(profile.tagline, locale)}
          </p>
          <p className="mt-3 text-lead text-fg-muted max-w-2xl mx-auto leading-relaxed">
            {pick(profile.valueProp, locale)}
          </p>
        </Reveal>

        {/* Main Grid: Pro Rectangular Languages Card & Whoami Terminal with 3D Core */}
        <div className="w-full grid gap-stack-lg lg:grid-cols-[1.3fr_0.7fr] items-start">
          {/* Pro Rectangular Card for all CV Languages with 3D tilt */}
          <Reveal direction="left" delay={0.2} animateOnView className="h-full">
            <Card3D maxTilt={6} scale={1.01} glare={true} glareMaxOpacity={0.12} className="h-full">
              <CvLanguagesCard />
            </Card3D>
          </Reveal>

          {/* Whoami Terminal Card with 3D Interactive WebGL Orb */}
          <Reveal direction="right" delay={0.25} animateOnView className="h-full">
            <Card3D maxTilt={7} scale={1.015} glare={true} glareMaxOpacity={0.15} className="h-full">
              <div className="well relative overflow-hidden p-5 sm:p-6 shadow-2 border border-border rounded-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 text-fg-subtle border-b border-border-subtle pb-3">
                    <div className="flex items-center gap-2">
                      <Terminal size={16} />
                      <span className="font-mono text-caption ltr-island">{t("terminalCommand")}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-accent font-semibold tracking-wider">
                      <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                      3D SPATIAL CORE
                    </span>
                  </div>

                  {/* Interactive Three.js 3D WebGL Tech Orb */}
                  <div className="my-3 flex flex-col items-center justify-center relative overflow-hidden rounded-xl bg-surface-sunken/50 border border-border-subtle/80 py-2 group">
                    <ThreeDTechOrb size={170} className="w-[170px] h-[170px] cursor-grab active:cursor-grabbing" />
                    <span className="font-mono text-[10px] text-fg-subtle tracking-wider uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                      Interactive 3D Engine · Move cursor
                    </span>
                  </div>

                  <dl className="mt-3 flex flex-col gap-2.5 font-mono text-caption">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <dt className="w-20 shrink-0 text-fg-subtle">{t("terminalStatus")}</dt>
                      <dd className="ltr-island text-success-text font-semibold">Active · Full-Stack &amp; Mobile</dd>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <dt className="w-20 shrink-0 text-fg-subtle">{t("terminalBased")}</dt>
                      <dd className="text-fg">{pick(profile.location, locale)}</dd>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <dt className="w-20 shrink-0 text-fg-subtle">degrees</dt>
                      <dd className="text-fg font-medium">
                        {locale === "ar"
                          ? "ليسانس إعلام آلي · ماستر بيومعلوماتية (USTHB)"
                          : locale === "fr"
                          ? "Licence Informatique · Master Bioinformatique (USTHB)"
                          : "BSc Computer Science · MSc Bioinformatics (USTHB)"}
                      </dd>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <dt className="w-20 shrink-0 text-fg-subtle">{t("terminalStack")}</dt>
                      <dd className="text-fg-muted ltr-island">
                        Flutter, Dart, Python, Java, Next.js, FastAPI, R
                      </dd>
                    </div>
                  </dl>
                </div>

                <p className="mt-4 border-t border-border-subtle pt-3 text-caption text-fg-subtle">
                  {t("terminalHint")}
                </p>
              </div>
            </Card3D>
          </Reveal>
        </div>
      </div>

      <div className="container-page mt-stack-lg flex items-center justify-center gap-2 text-caption text-fg-subtle">
        <ArrowDown size={15} />
        <span>{t("scroll")}</span>
      </div>
    </section>
  );
}
