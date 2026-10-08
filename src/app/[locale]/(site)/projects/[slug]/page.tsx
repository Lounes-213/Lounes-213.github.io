import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  External,
  Layers,
  Smartphone,
  Sparkle,
} from "@/components/icons";
import { CreativeFloatingBlobs } from "@/components/motion/CreativeFloatingBlobs";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { locales, isLocale, type Locale } from "@/lib/i18n/routing";
import {
  STATIC_LINKY_PROJECTS,
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/linky";

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const allSlugs = getAllProjectSlugs();
  return locales.flatMap((locale) =>
    allSlugs.map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} · Lounès Benseba`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.imageUrl ? [{ url: project.imageUrl }] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const resolvedLocale: Locale = isLocale(locale) ? locale : "en";

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const projectIndex = STATIC_LINKY_PROJECTS.findIndex(
    (p) => p.id === project.id || p.slug === project.slug
  );
  const safeIndex = projectIndex >= 0 ? projectIndex : 0;
  const prevProject = STATIC_LINKY_PROJECTS[(safeIndex - 1 + STATIC_LINKY_PROJECTS.length) % STATIC_LINKY_PROJECTS.length];
  const nextProject = STATIC_LINKY_PROJECTS[(safeIndex + 1) % STATIC_LINKY_PROJECTS.length];

  return (
    <div className="relative min-h-screen overflow-hidden pb-24 pt-[calc(var(--header-h)+1.5rem)]">
      <CreativeFloatingBlobs />

      <div className="container-page">
        {/* Navigation / Breadcrumb */}
        <Reveal direction="left" delay={0.05}>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`/${resolvedLocale}#work`}
              className="inline-flex items-center gap-2 rounded-full border border-border-interactive/60 bg-surface/80 px-4 py-1.5 text-xs font-semibold text-fg backdrop-blur-md transition-all hover:bg-surface-elevated hover:scale-102"
            >
              <ArrowLeft size={14} />
              <span>
                {resolvedLocale === "ar"
                  ? "العودة إلى كل المشاريع"
                  : resolvedLocale === "fr"
                  ? "Retour aux projets"
                  : "Back to all projects"}
              </span>
            </Link>

            <span className="font-mono text-xs text-fg-subtle">
              {safeIndex + 1} / {STATIC_LINKY_PROJECTS.length}
            </span>
          </div>
        </Reveal>

        {/* Project Header */}
        <div className="grid gap-stack-lg lg:grid-cols-[1.2fr_0.8fr] items-start">
          <Reveal direction="up" delay={0.1}>
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="rounded-full bg-accent/15 border border-accent/30 px-3 py-1 font-mono text-xs font-bold text-accent">
                  {project.category}
                </span>
                {project.featured && (
                  <Badge variant="accent" dot>
                    Featured Application
                  </Badge>
                )}
                <span className="rounded-full bg-success-soft border border-success-border px-2.5 py-0.5 font-mono text-[11px] font-semibold text-success-text">
                  Production Ready
                </span>
              </div>

              <h1 className="font-display text-h1 sm:text-display font-bold tracking-tight text-fg text-balance">
                {project.title}
              </h1>

              <p className="mt-4 text-lead text-fg-muted leading-relaxed max-w-prose">
                {project.description}
              </p>

              {/* Keywords / Stack Pills */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-border-subtle bg-surface px-3 py-1 font-mono text-xs text-fg font-medium shadow-sm"
                  >
                    #{kw}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-control bg-accent px-5 py-2.5 text-caption font-semibold !text-white shadow-1 hover:bg-accent/90 transition-all hover:scale-102"
                  >
                    <span>
                      {project.projectUrl.includes("linkedin")
                        ? "View on LinkedIn"
                        : "Open Live Project"}
                    </span>
                    <External size={14} />
                  </a>
                )}
                <Link
                  href={`/${resolvedLocale}/contact`}
                  className="inline-flex items-center gap-2 rounded-control border border-border-interactive bg-surface px-5 py-2.5 text-caption font-semibold text-fg hover:bg-surface-elevated transition-colors"
                >
                  <span>
                    {resolvedLocale === "ar"
                      ? "طلب مشروع مماثل"
                      : resolvedLocale === "fr"
                      ? "Demander une app similaire"
                      : "Build a similar app"}
                  </span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Quick Stats Panel */}
          <Reveal direction="right" delay={0.15}>
            <div className="rounded-2xl border border-border bg-surface/90 p-5 sm:p-6 shadow-2 backdrop-blur-md space-y-4">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-fg-subtle flex items-center gap-2">
                <Sparkle size={15} className="text-accent" />
                <span>Architecture & Engineering</span>
              </h3>

              <div className="space-y-3 text-caption">
                <div className="rounded-xl bg-surface-sunken p-3.5 border border-border-subtle">
                  <span className="font-mono text-[10px] text-fg-subtle uppercase block">Target Platform</span>
                  <p className="font-semibold text-fg mt-0.5">iOS & Android (Cross-Platform) & Web</p>
                </div>

                <div className="rounded-xl bg-surface-sunken p-3.5 border border-border-subtle">
                  <span className="font-mono text-[10px] text-fg-subtle uppercase block">Architectural Pattern</span>
                  <p className="font-semibold text-fg mt-0.5">Clean Architecture · Separation of Concerns</p>
                </div>

                <div className="rounded-xl bg-surface-sunken p-3.5 border border-border-subtle">
                  <span className="font-mono text-[10px] text-fg-subtle uppercase block">State & Storage</span>
                  <p className="font-semibold text-fg mt-0.5">Riverpod / BLoC · Offline SQLite / Firebase Sync</p>
                </div>
              </div>

              <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-fg-subtle">
                <span>Production Shipped</span>
                <span className="text-success-text font-bold">100% Operational</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* High-Resolution Screenshot Gallery */}
        <Reveal direction="up" delay={0.25} className="mt-12">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-h3 font-bold text-fg flex items-center gap-2">
                <Smartphone size={20} className="text-accent" />
                <span>Application Gallery &amp; Screenshots</span>
              </h2>
              <span className="font-mono text-xs text-fg-subtle">
                {project.images.length} High-Res View(s)
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.images.map((imgUrl, i) => (
                <div
                  key={i}
                  className="group relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-1 transition-all duration-300 hover:border-accent/50 hover:shadow-2"
                >
                  <Image
                    src={imgUrl}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-104"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="font-mono text-xs text-white">View screenshot {i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Feature Highlights Breakdown */}
        <Reveal direction="up" delay={0.35} className="mt-12">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-1 space-y-6">
            <h3 className="font-display text-h3 font-bold text-fg flex items-center gap-2">
              <Layers size={20} className="text-accent" />
              <span>Key Features & Engineering Deliverables</span>
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-caption">
              <div className="rounded-xl border border-border-subtle bg-surface-sunken/60 p-4">
                <div className="flex items-center gap-2 font-semibold text-fg">
                  <Check size={16} className="text-success-text shrink-0" />
                  <span>Fluid Responsive UI/UX</span>
                </div>
                <p className="mt-1.5 text-xs text-fg-muted leading-relaxed">
                  Tailored design systems supporting both dark and light modes, with native gesture navigation and high frame-rate transitions.
                </p>
              </div>

              <div className="rounded-xl border border-border-subtle bg-surface-sunken/60 p-4">
                <div className="flex items-center gap-2 font-semibold text-fg">
                  <Check size={16} className="text-success-text shrink-0" />
                  <span>Offline-First Resilience</span>
                </div>
                <p className="mt-1.5 text-xs text-fg-muted leading-relaxed">
                  Local database caching ensuring all user interactions remain instantaneous even without an active internet connection.
                </p>
              </div>

              <div className="rounded-xl border border-border-subtle bg-surface-sunken/60 p-4">
                <div className="flex items-center gap-2 font-semibold text-fg">
                  <Check size={16} className="text-success-text shrink-0" />
                  <span>Robust Cloud Backend</span>
                </div>
                <p className="mt-1.5 text-xs text-fg-muted leading-relaxed">
                  Integrated with secure databases and authentication pipelines for reliable real-time member and inventory management.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Next / Previous Project Navigation Bar */}
        <Reveal direction="up" delay={0.4} className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-6">
            {prevProject && (
              <Link
                href={`/${resolvedLocale}/projects/${prevProject.slug}`}
                className="group flex items-center gap-3 text-xs font-semibold text-fg-muted hover:text-fg transition-colors"
              >
                <div className="grid size-9 place-items-center rounded-full border border-border bg-surface group-hover:border-accent">
                  <ArrowLeft size={14} />
                </div>
                <div>
                  <span className="block font-mono text-[10px] text-fg-subtle uppercase">Previous Project</span>
                  <span className="text-fg font-medium line-clamp-1">{prevProject.title}</span>
                </div>
              </Link>
            )}

            {nextProject && (
              <Link
                href={`/${resolvedLocale}/projects/${nextProject.slug}`}
                className="group ms-auto flex items-center gap-3 text-end text-xs font-semibold text-fg-muted hover:text-fg transition-colors"
              >
                <div>
                  <span className="block font-mono text-[10px] text-fg-subtle uppercase">Next Project</span>
                  <span className="text-fg font-medium line-clamp-1">{nextProject.title}</span>
                </div>
                <div className="grid size-9 place-items-center rounded-full border border-border bg-surface group-hover:border-accent">
                  <ArrowRight size={14} />
                </div>
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
